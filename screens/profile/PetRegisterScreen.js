import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Surface, useTheme, TextInput, Button, SegmentedButtons } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

export default function PetRegisterScreen({ navigation, route }) {
  const theme = useTheme();
  const datosPersonales = route.params?.datosPersonales;

  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [tipo, setTipo] = useState('');
  const [raza, setRaza] = useState('');
  const [peso, setPeso] = useState('');
  const [caracteristicas, setCaracteristicas] = useState('');

  const handleRegistro = () => {
    if (nombre && edad && tipo && raza) {
      // Aquí iría la lógica para guardar los datos
      // Por ahora solo mostraremos un mensaje y navegaremos al Home
      alert('¡Registro completado con éxito!');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={[styles.header, { backgroundColor: theme.colors.primary }]} elevation={4}>
        <Animatable.View animation="fadeInDown" duration={1000} style={styles.headerContent}>
          <Text variant="headlineMedium" style={styles.headerText}>
            Registro de Mascota
          </Text>
          <Text variant="titleMedium" style={styles.headerSubtext}>
            Cuéntanos sobre tu compañero peludo
          </Text>
        </Animatable.View>
      </Surface>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animatable.View animation="fadeInUp" duration={1000}>
          <Text variant="titleMedium" style={styles.sectionTitle}>Tipo de Mascota</Text>
          <SegmentedButtons
            value={tipo}
            onValueChange={setTipo}
            buttons={[
              { value: 'perro', label: 'Perro' },
              { value: 'gato', label: 'Gato' },
              { value: 'otro', label: 'Otro' }
            ]}
            style={styles.segmentedButton}
          />

          <TextInput
            label="Nombre de la Mascota"
            value={nombre}
            onChangeText={setNombre}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="paw" />}
          />

          <TextInput
            label="Edad (años)"
            value={edad}
            onChangeText={setEdad}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
            left={<TextInput.Icon icon="calendar" />}
          />

          <TextInput
            label="Raza"
            value={raza}
            onChangeText={setRaza}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="dog" />}
          />

          <TextInput
            label="Peso (kg)"
            value={peso}
            onChangeText={setPeso}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
            left={<TextInput.Icon icon="weight" />}
          />

          <TextInput
            label="Características especiales"
            value={caracteristicas}
            onChangeText={setCaracteristicas}
            mode="outlined"
            multiline
            numberOfLines={4}
            style={styles.input}
            left={<TextInput.Icon icon="note-text" />}
          />

          <Button
            mode="contained"
            onPress={handleRegistro}
            style={styles.button}
            contentStyle={styles.buttonContent}
            disabled={!nombre || !edad || !tipo || !raza}
          >
            Completar Registro
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