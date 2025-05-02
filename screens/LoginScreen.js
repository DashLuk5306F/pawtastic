import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { TextInput, Button, Text, Surface, useTheme } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  const handleLogin = () => {
    // Navegar directamente a Home sin autenticación
    navigation.replace('Home');
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: theme.colors.primary }]} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Animatable.View animation="fadeInDown" duration={1500} style={styles.logoContainer}>
          <Animatable.Image
            animation="bounceIn"
            delay={500}
            duration={1500}
            source={require('../assets/app-icon.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text variant="displaySmall" style={styles.headerText}>
            ¡Bienvenido de nuevo!
          </Text>
          <Text variant="titleMedium" style={styles.subtitle}>
            Inicia sesión para continuar
          </Text>
        </Animatable.View>
      </View>

      <Animatable.View 
        animation="fadeInUpBig"
        duration={1500}
        style={styles.footer}
      >
        <Surface style={styles.surface} elevation={2}>
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

          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.button}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
          >
            Iniciar Sesión
          </Button>

          <View style={styles.registerContainer}>
            <Text variant="bodyMedium" style={styles.registerText}>
              ¿No tienes una cuenta?
            </Text>
            <Button
              mode="text"
              onPress={() => navigation.replace('Register')}
              labelStyle={[styles.buttonLabel, { color: theme.colors.primary }]}
            >
              Regístrate
            </Button>
          </View>
        </Surface>
      </Animatable.View>
    </KeyboardAvoidingView>
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
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: width * 0.35,
    height: width * 0.35,
    tintColor: '#ffffff',
    marginBottom: 20,
  },
  headerText: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: '#fff',
    textAlign: 'center',
    opacity: 0.8,
  },
  footer: {
    flex: 2,
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
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#666',
  },
});