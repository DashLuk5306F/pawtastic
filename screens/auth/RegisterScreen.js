import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Text, useTheme, HelperText } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { supabaseAuthService } from '../../services/supabaseAuthService';

export default function RegisterScreen({ navigation }) {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureConfirmTextEntry, setSecureConfirmTextEntry] = useState(true);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      setError('');
      setLoading(true);

      // Validaciones básicas
      if (!email || !password || !confirmPassword) {
        setError('Por favor, completa todos los campos');
        return;
      }

      if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden');
        return;
      }

      // Intentar registro
      await supabaseAuthService.register(email, password, {
        email: email,
        created_at: new Date().toISOString(),
      });
      
      Alert.alert(
        'Registro exitoso',
        'Tu cuenta ha sido creada. Por favor, completa tu información personal.',
        [
          {
            text: 'Continuar',
            onPress: () => navigation.navigate('PersonalInfo'),
          },
        ]
      );
    } catch (error) {
      console.error('Error en registro:', error);
      
      // Manejar diferentes tipos de errores
      if (error.message.includes('Email')) {
        setError('El correo electrónico no es válido');
      } else if (error.message.includes('contraseña')) {
        setError('La contraseña debe tener al menos 6 caracteres');
      } else if (error.message.includes('already')) {
        setError('Este correo electrónico ya está registrado');
      } else {
        setError('Error al crear la cuenta. Por favor, intenta de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animatable.View 
        animation="fadeInUp" 
        duration={1000} 
        style={styles.formContainer}
      >
        <Text variant="headlineMedium" style={styles.title}>
          Crear Cuenta
        </Text>

        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}

        <TextInput
          label="Correo electrónico"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setError('');
          }}
          autoCapitalize="none"
          keyboardType="email-address"
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Contraseña"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setError('');
          }}
          secureTextEntry={secureTextEntry}
          mode="outlined"
          style={styles.input}
          right={
            <TextInput.Icon
              icon={secureTextEntry ? 'eye' : 'eye-off'}
              onPress={() => setSecureTextEntry(!secureTextEntry)}
            />
          }
        />

        <TextInput
          label="Confirmar Contraseña"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setError('');
          }}
          secureTextEntry={secureConfirmTextEntry}
          mode="outlined"
          style={styles.input}
          right={
            <TextInput.Icon
              icon={secureConfirmTextEntry ? 'eye' : 'eye-off'}
              onPress={() => setSecureConfirmTextEntry(!secureConfirmTextEntry)}
            />
          }
        />

        <HelperText type="info" visible={true}>
          La contraseña debe tener al menos 6 caracteres
        </HelperText>

        <Button
          mode="contained"
          onPress={handleRegister}
          loading={loading}
          disabled={loading}
          style={styles.button}
        >
          Registrarse
        </Button>

        <Button
          mode="text"
          onPress={() => navigation.navigate('Login')}
          style={styles.button}
        >
          ¿Ya tienes cuenta? Inicia sesión
        </Button>
      </Animatable.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    width: '100%',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 10,
    borderRadius: 30,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});