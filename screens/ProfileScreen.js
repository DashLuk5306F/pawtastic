import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Surface, useTheme, Avatar, List, Button } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

export default function ProfileScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={[styles.header, { backgroundColor: theme.colors.primary }]} elevation={4}>
        <Animatable.View animation="fadeInDown" duration={1000} style={styles.headerContent}>
          <Avatar.Icon 
            size={100} 
            icon="account"
            style={[styles.avatar, { backgroundColor: theme.colors.surface }]}
            color={theme.colors.primary}
          />
          <Text variant="headlineMedium" style={styles.headerText}>
            Usuario
          </Text>
          <Text variant="titleMedium" style={styles.headerSubtext}>
            Amante de las mascotas
          </Text>
        </Animatable.View>
      </Surface>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animatable.View animation="fadeInUp" duration={1000}>
          <List.Section>
            <List.Subheader>Información Personal</List.Subheader>
            <List.Item
              title="Editar Perfil"
              left={props => <List.Icon {...props} icon="account-edit" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
            <List.Item
              title="Mis Mascotas"
              left={props => <List.Icon {...props} icon="paw" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
            <List.Item
              title="Historial de Servicios"
              left={props => <List.Icon {...props} icon="history" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
          </List.Section>

          <List.Section>
            <List.Subheader>Configuración</List.Subheader>
            <List.Item
              title="Notificaciones"
              left={props => <List.Icon {...props} icon="bell" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
            <List.Item
              title="Privacidad"
              left={props => <List.Icon {...props} icon="shield-account" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
            <List.Item
              title="Ayuda y Soporte"
              left={props => <List.Icon {...props} icon="help-circle" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
          </List.Section>

          <Button
            mode="outlined"
            onPress={() => {}}
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