import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Surface, useTheme, TextInput, Button } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { getAuth } from 'firebase/auth';
import { db } from '../../config/firebase'; // Asegúrate de importar tu configuración de Firebase
import { doc, updateDoc } from 'firebase/firestore';

export default function PersonalInfoScreen({ navigation }) {
  const theme = useTheme();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');

  const handleContinuar = async () => {

    if (nombre && apellido && telefono && direccion && ciudad && codigoPostal) {
      try{
      const auth = getAuth();
      const user = auth.currentUser; // Obtener el usuario actual
      // Aquí puedes guardar los datos en Firestore si es necesario
      const userRef = doc(db, 'users', user.uid); // Asegúrate de que 'user.uid' sea el ID del usuario actual
      await updateDoc(userRef, {
        nombre,
        apellido,
        telefono,
        direccion,
        ciudad,
        codigoPostal,
      });
      navigation.navigate('PetRegister');
    } catch (error) {
      alert('Error al guardar la información personal: ' + error);
    }
    } else {
      alert('Por favor, completa todos los campos antes de continuar.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={[styles.header, { backgroundColor: theme.colors.primary }]} elevation={4}>
        <Animatable.View animation="fadeInDown" duration={1000} style={styles.headerContent}>
          <Text variant="headlineMedium" style={styles.headerText}>
            Información Personal
          </Text>
          <Text variant="titleMedium" style={styles.headerSubtext}>
            Opcional: Podrás completar esto más tarde
          </Text>
        </Animatable.View>
      </Surface>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animatable.View animation="fadeInUp" duration={1000}>
          <TextInput
            label="Nombre"
            value={nombre}
            onChangeText={setNombre}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="account" />}
          />

          <TextInput
            label="Apellido"
            value={apellido}
            onChangeText={setApellido}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="account" />}
          />

          <TextInput
            label="Teléfono"
            value={telefono}
            onChangeText={setTelefono}
            mode="outlined"
            style={styles.input}
            keyboardType="phone-pad"
            left={<TextInput.Icon icon="phone" />}
          />

          <TextInput
            label="Dirección"
            value={direccion}
            onChangeText={setDireccion}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="home" />}
          />

          <TextInput
            label="Ciudad"
            value={ciudad}
            onChangeText={setCiudad}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="city" />}
          />

          <TextInput
            label="Código Postal"
            value={codigoPostal}
            onChangeText={setCodigoPostal}
            mode="outlined"
            style={styles.input}
            keyboardType="number-pad"
            left={<TextInput.Icon icon="map-marker" />}
          />

          <Button
            mode="contained"
            onPress={handleContinuar}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Continuar
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