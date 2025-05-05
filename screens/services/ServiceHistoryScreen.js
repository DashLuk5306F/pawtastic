import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Surface, useTheme, Card, Avatar, Chip } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

const ServiceCard = ({ servicio, fecha, mascota, estado, precio }) => {
  const theme = useTheme();
  const getStatusColor = () => {
    switch (estado) {
      case 'Completado':
        return '#4CAF50';
      case 'Pendiente':
        return '#FFC107';
      case 'Cancelado':
        return '#F44336';
      default:
        return theme.colors.primary;
    }
  };

  return (
    <Animatable.View animation="fadeInUp" duration={800}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <View style={styles.serviceInfo}>
              <Text variant="titleMedium" style={styles.serviceTitle}>{servicio}</Text>
              <Text variant="bodyMedium" style={styles.date}>{fecha}</Text>
            </View>
            <Chip
              style={[styles.statusChip, { backgroundColor: getStatusColor() + '20' }]}
              textStyle={{ color: getStatusColor() }}
            >
              {estado}
            </Chip>
          </View>
          <View style={styles.petInfo}>
            <Avatar.Icon size={40} icon="paw" style={{ backgroundColor: theme.colors.primary + '20' }} />
            <Text variant="bodyMedium" style={styles.petName}>{mascota}</Text>
            <Text variant="titleMedium" style={styles.price}>${precio}</Text>
          </View>
        </Card.Content>
      </Card>
    </Animatable.View>
  );
};

export default function ServiceHistoryScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={[styles.header, { backgroundColor: theme.colors.primary }]} elevation={4}>
        <Animatable.View animation="fadeInDown" duration={1000} style={styles.headerContent}>
          <Text variant="headlineMedium" style={styles.headerText}>
            Historial de Servicios
          </Text>
          <Text variant="titleMedium" style={styles.headerSubtext}>
            Tus reservas y servicios
          </Text>
        </Animatable.View>
      </Surface>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <ServiceCard
          servicio="Paseo"
          fecha="03 Mayo 2025"
          mascota="Luna"
          estado="Completado"
          precio="15.00"
        />
        <ServiceCard
          servicio="Veterinario"
          fecha="05 Mayo 2025"
          mascota="Michi"
          estado="Pendiente"
          precio="35.00"
        />
        <ServiceCard
          servicio="Cuidado Diario"
          fecha="01 Mayo 2025"
          mascota="Luna"
          estado="Completado"
          precio="25.00"
        />
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
  card: {
    marginBottom: 15,
    borderRadius: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    opacity: 0.7,
  },
  statusChip: {
    borderRadius: 15,
  },
  petInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  petName: {
    marginLeft: 10,
    flex: 1,
  },
  price: {
    fontWeight: 'bold',
  },
});