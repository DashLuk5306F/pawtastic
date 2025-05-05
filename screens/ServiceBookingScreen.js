import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Surface, useTheme, TextInput, Button, SegmentedButtons, List, Avatar } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

export default function ServiceBookingScreen({ navigation, route }) {
  const theme = useTheme();
  const serviceType = route.params?.serviceType || '';
  const [service, setService] = useState(serviceType);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [petName, setPetName] = useState('');
  const [notes, setNotes] = useState('');

  const handleBooking = () => {
    alert('¡Servicio agendado con éxito!');
    navigation.goBack();
  };

  const getServiceDetails = () => {
    switch (service) {
      case 'paseo':
        return {
          title: 'Paseo',
          description: '30 minutos de paseo',
          price: '15.00',
          icon: 'walk'
        };
      case 'cuidado':
        return {
          title: 'Cuidado Diario',
          description: 'Cuidado personalizado',
          price: '25.00',
          icon: 'paw'
        };
      case 'salud':
        return {
          title: 'Salud y Bienestar',
          description: 'Consulta veterinaria',
          price: '35.00',
          icon: 'heart'
        };
      case 'alimentacion':
        return {
          title: 'Plan Nutricional',
          description: 'Asesoría nutricional',
          price: '30.00',
          icon: 'food-variant'
        };
      default:
        return {
          title: 'Servicio',
          description: 'Selecciona un servicio',
          price: '0.00',
          icon: 'clipboard'
        };
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={[styles.header, { backgroundColor: theme.colors.primary }]} elevation={4}>
        <Animatable.View animation="fadeInDown" duration={1000} style={styles.headerContent}>
          <Text variant="headlineMedium" style={styles.headerText}>
            {getServiceDetails().title}
          </Text>
          <Text variant="titleMedium" style={styles.headerSubtext}>
            Reserva el mejor cuidado para tu mascota
          </Text>
        </Animatable.View>
      </Surface>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animatable.View animation="fadeInUp" duration={1000}>
          <Text variant="titleMedium" style={styles.sectionTitle}>Tipo de Servicio</Text>
          <SegmentedButtons
            value={service}
            onValueChange={setService}
            buttons={[
              { value: 'paseo', label: 'Paseo' },
              { value: 'cuidado', label: 'Cuidado' },
              { value: 'salud', label: 'Salud' },
              { value: 'alimentacion', label: 'Nutrición' }
            ]}
            style={styles.segmentedButton}
          />

          <Surface style={[styles.serviceDetailCard, { backgroundColor: theme.colors.surface }]} elevation={1}>
            <Avatar.Icon 
              size={40} 
              icon={getServiceDetails().icon}
              style={{ backgroundColor: theme.colors.primary + '20' }}
              color={theme.colors.primary}
            />
            <View style={styles.serviceDetailContent}>
              <Text variant="titleMedium" style={styles.serviceDetailTitle}>
                {getServiceDetails().description}
              </Text>
              <Text variant="headlineSmall" style={[styles.serviceDetailPrice, { color: theme.colors.primary }]}>
                ${getServiceDetails().price}
              </Text>
            </View>
          </Surface>

          <TextInput
            label="Nombre de la Mascota"
            value={petName}
            onChangeText={setPetName}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Fecha"
            value={date}
            onChangeText={setDate}
            mode="outlined"
            placeholder="DD/MM/YYYY"
            style={styles.input}
          />

          <TextInput
            label="Hora"
            value={time}
            onChangeText={setTime}
            mode="outlined"
            placeholder="HH:MM"
            style={styles.input}
          />

          <TextInput
            label="Notas Adicionales"
            value={notes}
            onChangeText={setNotes}
            mode="outlined"
            multiline
            numberOfLines={4}
            style={styles.input}
          />

          <List.Section>
            <List.Subheader>Precios Estimados</List.Subheader>
            <List.Item
              title="Paseo"
              description="30 minutos - $15"
              left={props => <List.Icon {...props} icon="walk" />}
            />
            <List.Item
              title="Cuidado Diario"
              description="Por día - $25"
              left={props => <List.Icon {...props} icon="paw" />}
            />
            <List.Item
              title="Consulta Veterinaria"
              description="Básica - $35"
              left={props => <List.Icon {...props} icon="medical-bag" />}
            />
          </List.Section>

          <Button
            mode="contained"
            onPress={handleBooking}
            style={styles.button}
            contentStyle={styles.buttonContent}
            disabled={!service || !date || !time || !petName}
          >
            Confirmar Reserva
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
  sectionTitle: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  segmentedButton: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'transparent',
  },
  button: {
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 30,
  },
  buttonContent: {
    height: 48,
  },
  serviceDetailCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
  },
  serviceDetailContent: {
    marginLeft: 15,
  },
  serviceDetailTitle: {
    fontWeight: 'bold',
  },
  serviceDetailPrice: {
    fontWeight: 'bold',
    marginTop: 5,
  },
});