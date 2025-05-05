import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Surface, useTheme, List, Switch, Button } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

export default function PrivacyScreen() {
  const theme = useTheme();
  const [privacidad, setPrivacidad] = useState({
    perfilPublico: false,
    ubicacion: true,
    actividadEnLinea: true,
    compartirDatos: false,
  });

  const toggleSwitch = (key) => {
    setPrivacidad(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={[styles.header, { backgroundColor: theme.colors.primary }]} elevation={4}>
        <Animatable.View animation="fadeInDown" duration={1000} style={styles.headerContent}>
          <Text variant="headlineMedium" style={styles.headerText}>
            Privacidad
          </Text>
          <Text variant="titleMedium" style={styles.headerSubtext}>
            Controla tu información
          </Text>
        </Animatable.View>
      </Surface>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animatable.View animation="fadeInUp" duration={1000}>
          <List.Section>
            <List.Subheader>Visibilidad</List.Subheader>
            <List.Item
              title="Perfil Público"
              description="Permite que otros usuarios vean tu perfil"
              left={props => <List.Icon {...props} icon="account-eye" />}
              right={() => (
                <Switch
                  value={privacidad.perfilPublico}
                  onValueChange={() => toggleSwitch('perfilPublico')}
                  color={theme.colors.primary}
                />
              )}
            />
            <List.Item
              title="Ubicación"
              description="Compartir ubicación durante servicios activos"
              left={props => <List.Icon {...props} icon="map-marker" />}
              right={() => (
                <Switch
                  value={privacidad.ubicacion}
                  onValueChange={() => toggleSwitch('ubicacion')}
                  color={theme.colors.primary}
                />
              )}
            />
          </List.Section>

          <List.Section>
            <List.Subheader>Datos y Personalización</List.Subheader>
            <List.Item
              title="Actividad en Línea"
              description="Mostrar cuando estás activo"
              left={props => <List.Icon {...props} icon="circle" />}
              right={() => (
                <Switch
                  value={privacidad.actividadEnLinea}
                  onValueChange={() => toggleSwitch('actividadEnLinea')}
                  color={theme.colors.primary}
                />
              )}
            />
            <List.Item
              title="Compartir Datos"
              description="Permitir uso de datos para mejorar servicios"
              left={props => <List.Icon {...props} icon="database" />}
              right={() => (
                <Switch
                  value={privacidad.compartirDatos}
                  onValueChange={() => toggleSwitch('compartirDatos')}
                  color={theme.colors.primary}
                />
              )}
            />
          </List.Section>

          <List.Section>
            <List.Subheader>Acciones Adicionales</List.Subheader>
            <List.Item
              title="Política de Privacidad"
              description="Lee nuestras políticas detalladas"
              left={props => <List.Icon {...props} icon="shield-lock" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
            <List.Item
              title="Datos Almacenados"
              description="Gestiona tu información personal"
              left={props => <List.Icon {...props} icon="folder-lock" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
          </List.Section>

          <Button
            mode="outlined"
            onPress={() => {}}
            style={styles.deleteButton}
            textColor="#F44336"
            icon="delete"
          >
            Eliminar Cuenta
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
  deleteButton: {
    margin: 20,
    borderColor: '#F44336',
    borderRadius: 30,
  },
});