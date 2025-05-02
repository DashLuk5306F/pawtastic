import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { Button, Text, Surface, useTheme } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

export default function PaginaInicial({ navigation }) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <Surface style={styles.logoContainer} elevation={0}>
        <Animatable.Image
          animation="bounceIn"
          duration={300}
          source={require('../assets/app-icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Surface>

      <Animatable.View 
        style={styles.footer}
        animation="fadeInUpBig"
        duration={300}
      >
        <Surface style={styles.contentSurface} elevation={2}>
          <Text variant="displaySmall" style={[styles.title, { color: theme.colors.primary }]}>
            ¡Bienvenido a Pawtastic!
          </Text>
          <Text variant="titleMedium" style={styles.subtitle}>
            La mejor manera de cuidar a tu mascota
          </Text>

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('Login')}
              style={styles.button}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
            >
              Iniciar Sesión
            </Button>

            <Button
              mode="outlined"
              onPress={() => navigation.navigate('Register')}
              style={[styles.button, styles.registerButton]}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
            >
              Registrarse
            </Button>
          </View>
        </Surface>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  footer: {
    flex: 1.5,
  },
  contentSurface: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  logo: {
    width: width * 0.6,
    height: width * 0.6,
    tintColor: '#ffffff',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  button: {
    marginVertical: 8,
    borderRadius: 30,
  },
  buttonContent: {
    height: 48,
  },
  buttonLabel: {
    fontSize: 16,
    letterSpacing: 0.5,
  },
  registerButton: {
    borderWidth: 2,
  },
});