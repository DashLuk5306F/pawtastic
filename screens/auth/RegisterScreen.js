import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { TextInput, Button, Text, Surface, useTheme, Snackbar } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { registerUser } from '../../firebase/auth-service';

const { width } = Dimensions.get('window');

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (!email || !password) {
      setError('Por favor, completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      const { user, error: registerError } = await registerUser(email, password, {});
      
      if (registerError) {
        setError(registerError);
        return;
      }

      if (user) {
        // Registro exitoso, navegar a la siguiente pantalla
        navigation.navigate('PersonalInfo');
      }
    } catch (err) {
      setError('Error al registrar el usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <Animatable.View 
        animation="fadeInDown"
        duration={500}
        style={styles.header}
      >
        <Animatable.Image
          animation="bounceIn"
          delay={500}
          duration={500}
          source={require('../../assets/app-icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text variant="displaySmall" style={styles.headerText}>
          Crear Cuenta
        </Text>
      </Animatable.View>

      <Animatable.View 
        animation="fadeInUpBig" 
        duration={500} 
        style={styles.footer}
      >
        <Surface style={styles.surface} elevation={2}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              left={<TextInput.Icon icon="email" />}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />

            <TextInput
              label="Contraseña"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon 
                  icon={showPassword ? "eye-off" : "eye"} 
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              secureTextEntry={!showPassword}
              style={styles.input}
            />

            <TextInput
              label="Confirmar contraseña"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              mode="outlined"
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon 
                  icon={showConfirmPassword ? "eye-off" : "eye"} 
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              }
              secureTextEntry={!showConfirmPassword}
              style={styles.input}
            />

            <Button
              mode="contained"
              onPress={handleRegister}
              style={styles.button}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
              loading={loading}
            >
              Registrarse
            </Button>

            <Button
              mode="text"
              onPress={() => navigation.replace('Login')}
              style={styles.loginButton}
              labelStyle={[styles.buttonLabel, { color: theme.colors.primary }]}
            >
              ¿Ya tienes cuenta? Inicia sesión
            </Button>
          </ScrollView>
        </Surface>
      </Animatable.View>

      <Snackbar
        visible={!!error}
        onDismiss={() => setError('')}
        action={{
          label: 'OK',
          onPress: () => setError(''),
        }}
      >
        {error}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: width * 0.3,
    height: width * 0.3,
    tintColor: '#ffffff',
    marginBottom: 20,
  },
  headerText: {
    color: '#fff',
    textAlign: 'center',
  },
  footer: {
    flex: 3,
  },
  surface: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  button: {
    marginTop: 10,
    marginHorizontal: 30,
    borderRadius: 30,
  },
  buttonContent: {
    height: 48,
  },
  buttonLabel: {
    fontSize: 16,
    letterSpacing: 0.5,
  },
  loginButton: {
    marginTop: 20,
  },
});