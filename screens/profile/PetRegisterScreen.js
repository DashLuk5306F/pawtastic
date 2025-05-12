import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { Text, Surface, useTheme, TextInput, Button, SegmentedButtons } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { useAuth } from '../../context/AuthContext';
import { doc, getDoc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
export default function PetRegisterScreen({ navigation, route }) {
  const theme = useTheme();
  const { user } = useAuth();
  const isEditing = route.params?.isEditing || false;
  const petData = route.params?.petData || {};

  const [loading, setLoading] = useState(false);
  const [nombre, setNombre] = useState(petData.nombre || '');
  const [edad, setEdad] = useState(petData.edad ? String(petData.edad) : '');
  const [tipo, setTipo] = useState(petData.tipo || '');
  const [raza, setRaza] = useState(petData.raza || '');
  const [peso, setPeso] = useState(petData.peso ? String(petData.peso) : '');
  const [caracteristicas, setCaracteristicas] = useState(petData.caracteristicas || '');

  const handleRegistro = async () => {
    if (!nombre || !edad || !tipo || !raza) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    if (!user?.uid) {
      Alert.alert('Error', 'Debes iniciar sesión para registrar una mascota');
      return;
    }

    setLoading(true);

    try {
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      const newPetData = {
        nombre,
        edad,
        tipo,
        raza,
        peso,
          caracteristicas,
          createdAt: new Date(),
        updatedAt: new Date()
        };

      if (isEditing) {
        // Si estamos editando, necesitamos actualizar la mascota existente
        if (userDoc.exists() && userDoc.data().pets) {
          const pets = userDoc.data().pets;
          // Encontrar y actualizar la mascota con los mismos datos
          const updatedPets = pets.map(pet => {
            if (pet.nombre === petData.nombre &&
                pet.raza === petData.raza &&
                pet.tipo === petData.tipo) {
              return newPetData;
          }
            return pet;
          });

          // Actualizar el array completo de mascotas
          await updateDoc(userDocRef, { pets: updatedPets });
        }
      } else {
        // Si es un nuevo registro
        if (!userDoc.exists()) {
          // Si el usuario no existe en Firestore, crea el documento
          await setDoc(userDocRef, {
            pets: [newPetData],
            createdAt: new Date()
          });
        } else {
          // Si el usuario ya existe, añade la mascota al array
          await updateDoc(userDocRef, {
            pets: arrayUnion(newPetData)
          });
        }
      }

      Alert.alert(
        'Éxito',
        isEditing ? '¡Mascota actualizada con éxito!' : '¡Mascota registrada con éxito!',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      } catch (error) {
      console.error('Error al gestionar la mascota:', error);
      Alert.alert('Error', 'No se pudo completar la operación. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
      }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={[styles.header, { backgroundColor: theme.colors.primary }]} elevation={4}>
        <Animatable.View animation="fadeInDown" duration={1000} style={styles.headerContent}>
          <Text variant="headlineMedium" style={styles.headerText}>
            {isEditing ? 'Editar Mascota' : 'Registro de Mascota'}
          </Text>
          <Text variant="titleMedium" style={styles.headerSubtext}>
            {isEditing ? 'Actualiza los datos de tu mascota' : 'Cuéntanos sobre tu compañero peludo'}
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
            label="Nombre de la Mascota *"
            value={nombre}
            onChangeText={setNombre}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="paw" />}
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
            label="Raza *"
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
            loading={loading}
            disabled={loading || !nombre || !edad || !tipo || !raza}
          >
            {isEditing ? 'Guardar Cambios' : 'Completar Registro'}
          </Button>

          {isEditing && (
            <Button
              mode="outlined"
              onPress={() => navigation.goBack()}
              style={styles.cancelButton}
              contentStyle={styles.buttonContent}
            >
              Cancelar
            </Button>
          )}
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
    marginBottom: 15,
    borderRadius: 30,
  },
  cancelButton: {
    marginBottom: 30,
    borderRadius: 30,
  },
  buttonContent: {
    height: 48,
  },
});