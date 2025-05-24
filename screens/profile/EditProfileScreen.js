import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../config/supabase';

export default function EditProfileScreen({ route, navigation }) {
  const theme = useTheme();
  const { user } = useAuth();
  const { userData } = route.params || {};
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nombre: userData?.nombre || '',
    apellido: userData?.apellido || '',
    telefono: userData?.telefono || '',
    direccion: userData?.direccion || '',
    ciudad: userData?.ciudad || '',
    codigo_postal: userData?.codigo_postal || '',
  });

  const handleUpdateProfile = async () => {
    if (!formData.nombre || !formData.apellido) {
      Alert.alert('Error', 'Por favor, completa al menos nombre y apellido');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...formData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      Alert.alert('Éxito', 'Perfil actualizado correctamente', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      Alert.alert('Error', 'No se pudo actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Animatable.View animation="fadeInDown" duration={1000} style={styles.header}>
        <Text variant="headlineMedium" style={styles.headerText}>
          Editar Perfil
        </Text>
        <Text variant="titleMedium" style={styles.headerSubtext}>
          Actualiza tu información personal
        </Text>
      </Animatable.View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animatable.View animation="fadeInUp" duration={1000}>
          <TextInput
            label="Nombre"
            value={formData.nombre}
            onChangeText={value => handleChange('nombre', value)}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="account" />}
          />

          <TextInput
            label="Apellido"
            value={formData.apellido}
            onChangeText={value => handleChange('apellido', value)}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="account" />}
          />

          <TextInput
            label="Teléfono"
            value={formData.telefono}
            onChangeText={value => handleChange('telefono', value)}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="phone" />}
            keyboardType="phone-pad"
          />

          <TextInput
            label="Dirección"
            value={formData.direccion}
            onChangeText={value => handleChange('direccion', value)}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="home" />}
          />

          <TextInput
            label="Ciudad"
            value={formData.ciudad}
            onChangeText={value => handleChange('ciudad', value)}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="city" />}
          />

          <TextInput
            label="Código Postal"
            value={formData.codigo_postal}
            onChangeText={value => handleChange('codigo_postal', value)}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="zip-box" />}
            keyboardType="numeric"
          />

          <Button
            mode="contained"
            onPress={handleUpdateProfile}
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
  input: {
    marginBottom: 15,
    backgroundColor: 'transparent',
  },
  button: {
    marginTop: 20,
    borderRadius: 30,
  },
});