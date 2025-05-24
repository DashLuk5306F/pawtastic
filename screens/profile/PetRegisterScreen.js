import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../config/supabase';

export default function PetRegisterScreen({ navigation }) {
  const theme = useTheme();
  const { user } = useAuth();
  const [nombre, setNombre] = useState('');
  const [especie, setEspecie] = useState('');
  const [raza, setRaza] = useState('');
  const [edad, setEdad] = useState('');
  const [peso, setPeso] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegisterPet = async () => {
    if (!nombre || !especie || !raza || !edad || !peso) {
      Alert.alert('Error', 'Por favor, completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('pets')
        .insert([
          {
            owner_id: user.id,
            nombre,
            especie,
            raza,
            edad: parseInt(edad),
            peso: parseFloat(peso),
            created_at: new Date().toISOString(),
          }
        ]);

      if (error) throw error;

      Alert.alert(
        'Éxito',
        'Mascota registrada correctamente',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('MyPets')
          }
        ]
      );
    } catch (error) {
      console.error('Error al registrar mascota:', error);
      Alert.alert('Error', 'No se pudo registrar la mascota');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Animatable.View animation="fadeInDown" duration={1000} style={styles.header}>
        <Text variant="headlineMedium" style={styles.headerText}>
          Registro de Mascota
        </Text>
        <Text variant="titleMedium" style={styles.headerSubtext}>
          Cuéntanos sobre tu compañero peludo
        </Text>
      </Animatable.View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animatable.View animation="fadeInUp" duration={1000}>
          <Text variant="titleMedium" style={styles.sectionTitle}>Tipo de Mascota</Text>

          <TextInput
            label="Nombre de la Mascota *"
            value={nombre}
            onChangeText={setNombre}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="paw" />}
          />

          <TextInput
            label="Especie *"
            value={especie}
            onChangeText={setEspecie}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="account-paw" />}
          />

          <TextInput
            label="Raza *"
            value={raza}
            onChangeText={setRaza}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="dog" />}
          />

          <TextInput
            label="Edad (años) *"
            value={edad}
            onChangeText={setEdad}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
            left={<TextInput.Icon icon="calendar" />}
          />

          <TextInput
            label="Peso (kg) *"
            value={peso}
            onChangeText={setPeso}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
            left={<TextInput.Icon icon="weight" />}
          />

          <Button
            mode="contained"
            onPress={handleRegisterPet}
            style={styles.button}
            contentStyle={styles.buttonContent}
            loading={loading}
            disabled={loading || !nombre || !especie || !raza || !edad || !peso}
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
    backgroundColor: '#6200ee',
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtext: {
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'transparent',
  },
  button: {
    marginTop: 20,
    marginBottom: 15,
    borderRadius: 30,
  },
  buttonContent: {
    height: 48,
  },
});