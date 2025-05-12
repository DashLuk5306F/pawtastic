import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { Text, Surface, useTheme, TextInput, Button } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { useAuth } from '../../context/AuthContext';
import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

export default function EditProfileScreen({ navigation, route }) {
  const theme = useTheme();
  const { user } = useAuth();
  const userData = route.params?.userData || {};
  const [nombre, setNombre] = useState(userData?.nombre || '');
  const [email, setEmail] = useState(userData?.email || user?.email || '');
  const [telefono, setTelefono] = useState(userData?.telefono || '');
  const [bio, setBio] = useState(userData?.bio || 'Amante de las mascotas');
  const [loading, setLoading] = useState(false);

  const handleGuardar = async () => {
    if (!user?.uid) {
      Alert.alert('Error', 'No se puede guardar sin sesión iniciada');
      return;
    }

    setLoading(true);
    try {
      // Crear o actualizar el documento del usuario en Firestore
      const userRef = doc(db, 'users', user.uid);

      const userData = {
        nombre,
        email: user.email, // Usamos el email de Firebase Auth
        telefono,
        bio,
        updatedAt: new Date()
      };

      await setDoc(userRef, userData, { merge: true });

      Alert.alert('Éxito', 'Perfil actualizado correctamente');
      navigation.goBack();
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      Alert.alert('Error', 'No se pudo actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={[styles.header, { backgroundColor: theme.colors.primary }]} elevation={4}>
        <Animatable.View animation="fadeInDown" duration={1000} style={styles.headerContent}>
          <Text variant="headlineMedium" style={styles.headerText}>
            Editar Perfil
          </Text>
          <Text variant="titleMedium" style={styles.headerSubtext}>
            Actualiza tu información personal
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
            label="Email"
            value={email}
            disabled={true}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="email" />}
          />

          <TextInput
            label="Teléfono"
            value={telefono}
            onChangeText={setTelefono}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="phone" />}
            keyboardType="phone-pad"
          />

          <TextInput
            label="Biografía"
            value={bio}
            onChangeText={setBio}
            mode="outlined"
            style={styles.input}
            multiline
            numberOfLines={4}
            left={<TextInput.Icon icon="text" />}
          />

          <Button
            mode="contained"
            onPress={handleGuardar}
            style={styles.button}
            icon="content-save"
            loading={loading}
            disabled={loading}
          >
            Guardar Cambios
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
    borderRadius: 30,
  },
});