import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Surface, useTheme, Avatar, List, Button } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

export default function ProfileScreen({ navigation }) {
  const theme = useTheme();
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar los datos del usuario desde Firestore
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user?.uid) {
        setLoading(false);
        return;
      }
      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setProfileData(userDoc.data());
        } else {
          console.log('No se encontró el documento del usuario');
        }
      } catch (error) {
        console.error('Error al obtener datos del perfil:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleLogout = async () => {
    try {
      await authService.logout();
      // La navegación se manejará automáticamente por el AuthContext
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Obtener las iniciales para el avatar
  const getInitials = () => {
    if (profileData?.nombre) {
      return profileData.nombre.charAt(0).toUpperCase();
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
            {profileData?.nombre || user?.email || 'Usuario'}
          </Text>
          <Text variant="titleMedium" style={styles.headerSubtext}>
            {profileData?.bio}
          </Text>
        </Animatable.View>
      </Surface>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animatable.View animation="fadeInUp" duration={1000}>
          <List.Section>
            <List.Subheader>Información Personal</List.Subheader>
            <List.Item
              title="Editar Perfil"
              description={profileData?.email || user?.email}
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
});