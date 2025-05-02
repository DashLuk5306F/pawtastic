import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { Text, Surface, useTheme, Button, Avatar } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

const ServiceCard = ({ icon, title, description }) => {
  const theme = useTheme();
  return (
    <Animatable.View animation="fadeInUp" duration={800}>
      <Surface style={[styles.card, { backgroundColor: theme.colors.surface }]} elevation={2}>
        <Avatar.Icon size={50} icon={icon} style={{ backgroundColor: theme.colors.primary }} />
        <Text variant="titleMedium" style={styles.cardTitle}>{title}</Text>
        <Text variant="bodyMedium" style={styles.cardDescription}>{description}</Text>
      </Surface>
    </Animatable.View>
  );
};

export default function HomeScreen({ navigation }) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={[styles.header, { backgroundColor: theme.colors.primary }]} elevation={4}>
        <Animatable.View animation="fadeInDown" duration={1000} style={styles.headerContent}>
          <Text variant="displaySmall" style={styles.headerText}>
            Pawtastic
          </Text>
          <Text variant="titleMedium" style={styles.headerSubtext}>
            Tu espacio para mascotas felices
          </Text>
        </Animatable.View>
      </Surface>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.servicesContainer}>
          <ServiceCard
            icon="paw"
            title="Cuidado Diario"
            description="Servicios personalizados para el cuidado de tu mascota"
          />
          <ServiceCard
            icon="heart"
            title="Salud y Bienestar"
            description="Consejos y seguimiento de la salud de tu compañero"
          />
          <ServiceCard
            icon="walk"
            title="Paseos"
            description="Ejercicio y diversión garantizada para tu mascota"
          />
          <ServiceCard
            icon="food-variant"
            title="Alimentación"
            description="Planes nutricionales adaptados a cada mascota"
          />
        </View>

        <Animatable.View animation="fadeInUp" duration={1000} delay={400}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('ServiceBooking')}
            style={styles.button}
            contentStyle={styles.buttonContent}
            icon="plus-circle"
          >
            Agendar Servicio
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
  servicesContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  card: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  cardTitle: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  cardDescription: {
    textAlign: 'center',
    opacity: 0.7,
  },
  button: {
    marginHorizontal: 30,
    marginBottom: 30,
    borderRadius: 30,
  },
  buttonContent: {
    height: 48,
  },
});