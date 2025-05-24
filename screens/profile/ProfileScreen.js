import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Surface, useTheme, Avatar, List, Button } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { useAuth } from '../../context/AuthContext';
import { supabaseAuthService } from '../../services/supabaseAuthService';
import { supabase } from '../../config/supabase';

export default function ProfileScreen({ navigation }) {
  const theme = useTheme();
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar los datos del usuario desde Supabase
  useEffect(() => {
    let subscription;

    const loadProfile = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        // Obtener datos del perfil
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        if (data) {
          setProfileData(data);
          console.log('Datos del perfil cargados:', data);
        }

        // Suscribirse a cambios en tiempo real
        subscription = supabase
          .channel('profiles')
          .on('postgres_changes', 
            { event: '*', schema: 'public', table: 'profiles', filter: `id=eq.${user.id}` },
            payload => {
              console.log('Cambio en perfil detectado:', payload);
              setProfileData(payload.new);
            }
          )
          .subscribe();

      } catch (error) {
        console.error('Error al cargar el perfil:', error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();

    // Limpieza al desmontar
    return () => {
      if (subscription) {
        supabase.removeChannel(subscription);
      }
    };
  }, [user]);

  const handleLogout = async () => {
    try {
      await supabaseAuthService.logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Obtener las iniciales para el avatar
  const getInitials = () => {
    if (profileData?.nombre) {
      const firstName = profileData.nombre.charAt(0);
      const lastName = profileData.apellido ? profileData.apellido.charAt(0) : '';
      return (firstName + lastName).toUpperCase();
    }
    return user?.email?.[0].toUpperCase() || 'U';
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={[styles.header, { backgroundColor: theme.colors.primary }]} elevation={4}>
        <Animatable.View animation="fadeInDown" duration={1000} style={styles.headerContent}>
          <Avatar.Text 
            size={100} 
            label={getInitials()}
            style={[styles.avatar, { backgroundColor: theme.colors.surface }]}
            color={theme.colors.primary}
          />
          <Text variant="headlineMedium" style={styles.headerText}>
            {profileData ? `${profileData.nombre} ${profileData.apellido || ''}`.trim() : user?.email || 'Usuario'}
          </Text>
          <Text variant="titleMedium" style={styles.headerSubtext}>
            {user?.email}
          </Text>
        </Animatable.View>
      </Surface>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animatable.View animation="fadeInUp" duration={1000}>
          <List.Section>
            <List.Subheader>Información Personal</List.Subheader>
            <List.Item
              title="Editar Perfil"
              description={user?.email}
              left={props => <List.Icon {...props} icon="account-edit" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => navigation.navigate('EditProfile', { userData: profileData })}
            />
            {profileData?.telefono && (
              <List.Item
                title="Teléfono"
                description={profileData.telefono}
                left={props => <List.Icon {...props} icon="phone" />}
              />
            )}
            {(profileData?.direccion || profileData?.ciudad) && (
              <List.Item
                title="Dirección"
                description={`${profileData.direccion || ''}\n${profileData.ciudad || ''} ${profileData.codigo_postal || ''}`}
                left={props => <List.Icon {...props} icon="map-marker" />}
              />
            )}
            <List.Item
              title="Mis Mascotas"
              left={props => <List.Icon {...props} icon="paw" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => navigation.navigate('MyPets')}
            />
            <List.Item
              title="Historial de Servicios"
              left={props => <List.Icon {...props} icon="history" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => navigation.navigate('ServiceHistory')}
            />
          </List.Section>

          <List.Section>
            <List.Subheader>Configuración</List.Subheader>
            <List.Item
              title="Notificaciones"
              left={props => <List.Icon {...props} icon="bell" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => navigation.navigate('Notifications')}
            />
            <List.Item
              title="Privacidad"
              left={props => <List.Icon {...props} icon="shield-account" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => navigation.navigate('Privacy')}
            />
            <List.Item
              title="Ayuda y Soporte"
              left={props => <List.Icon {...props} icon="help-circle" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => navigation.navigate('HelpSupport')}
            />
          </List.Section>

          <Button
            mode="contained"
            onPress={handleLogout}
            style={styles.logoutButton}
            icon="logout"
          >
            Cerrar Sesión
          </Button>
        </Animatable.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    alignItems: 'center',
  },
  avatar: {
    marginBottom: 15,
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtext: {
    color: '#fff',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  logoutButton: {
    margin: 20,
    borderRadius: 30,
    borderWidth: 2,
  },
  offlineText: {
    textAlign: 'center',
    backgroundColor: '#FFE58F',
    padding: 8,
    marginBottom: 10,
    borderRadius: 4,
  },
});