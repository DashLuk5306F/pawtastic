import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Surface, useTheme, TextInput, Button, SegmentedButtons, List } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

export default function ServiceBookingScreen({ navigation }) {
  const theme = useTheme();
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [petName, setPetName] = useState('');
  const [notes, setNotes] = useState('');

  const handleBooking = () => {
    // Aquí iría la lógica para guardar la reserva
    // Por ahora solo mostraremos un mensaje y volveremos a la pantalla anterior
    alert('¡Servicio agendado con éxito!');
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={[styles.header, { backgroundColor: theme.colors.primary }]} elevation={4}>
        <Animatable.View animation="fadeInDown" duration={1000} style={styles.headerContent}>
          <Text variant="headlineMedium" style={styles.headerText}>
            Agendar Servicio
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
              { value: 'veterinario', label: 'Veterinario' }
            ]}
            style={styles.segmentedButton}
          />

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
});