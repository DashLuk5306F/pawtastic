import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Surface, useTheme, List, Switch } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

export default function NotificationsScreen() {
  const theme = useTheme();
  const [notificaciones, setNotificaciones] = useState({
    servicios: true,
    recordatorios: true,
    promociones: false,
    mascotas: true,
    mensajes: true,
  });

  const toggleSwitch = (key) => {
    setNotificaciones(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={[styles.header, { backgroundColor: theme.colors.primary }]} elevation={4}>
        <Animatable.View animation="fadeInDown" duration={1000} style={styles.headerContent}>
          <Text variant="headlineMedium" style={styles.headerText}>
            Notificaciones
          </Text>
          <Text variant="titleMedium" style={styles.headerSubtext}>
            Personaliza tus alertas
          </Text>
        </Animatable.View>
      </Surface>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animatable.View animation="fadeInUp" duration={1000}>
          <List.Section>
            <List.Subheader>Alertas Generales</List.Subheader>
            <List.Item
              title="Servicios Agendados"
              description="Recordatorios de citas y servicios"
              left={props => <List.Icon {...props} icon="calendar-clock" />}
              right={() => (
                <Switch
                  value={notificaciones.servicios}
                  onValueChange={() => toggleSwitch('servicios')}
                  color={theme.colors.primary}
                />
              )}
            />
            <List.Item
              title="Recordatorios"
              description="Vacunas, medicamentos y cuidados"
              left={props => <List.Icon {...props} icon="bell-ring" />}
              right={() => (
                <Switch
                  value={notificaciones.recordatorios}
                  onValueChange={() => toggleSwitch('recordatorios')}
                  color={theme.colors.primary}
                />
              )}
            />
          </List.Section>

          <List.Section>
            <List.Subheader>Comunicaciones</List.Subheader>
            <List.Item
              title="Actualizaciones de Mascotas"
              description="Estado y actividades de tus mascotas"
              left={props => <List.Icon {...props} icon="paw" />}
              right={() => (
                <Switch
                  value={notificaciones.mascotas}
                  onValueChange={() => toggleSwitch('mascotas')}
                  color={theme.colors.primary}
                />
              )}
            />
            <List.Item
              title="Mensajes"
              description="Comunicaciones de cuidadores"
              left={props => <List.Icon {...props} icon="message" />}
              right={() => (
                <Switch
                  value={notificaciones.mensajes}
                  onValueChange={() => toggleSwitch('mensajes')}
                  color={theme.colors.primary}
                />
              )}
            />
            <List.Item
              title="Promociones"
              description="Ofertas y descuentos especiales"
              left={props => <List.Icon {...props} icon="tag" />}
              right={() => (
                <Switch
                  value={notificaciones.promociones}
                  onValueChange={() => toggleSwitch('promociones')}
                  color={theme.colors.primary}
                />
              )}
            />
          </List.Section>
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
});