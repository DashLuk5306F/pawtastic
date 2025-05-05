import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Surface, useTheme, Card, Button, Avatar } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

const PetCard = ({ nombre, tipo, edad }) => {
  return (
    <Animatable.View animation="fadeInUp" duration={800}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Avatar.Icon 
            size={60} 
            icon={tipo === 'perro' ? 'dog' : 'cat'} 
            style={styles.petAvatar}
          />
          <View style={styles.petInfo}>
            <Text variant="titleMedium" style={styles.petName}>{nombre}</Text>
            <Text variant="bodyMedium">{tipo} · {edad} años</Text>
          </View>
        </Card.Content>
      </Card>
    </Animatable.View>
  );
};

export default function MyPetsScreen({ navigation }) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={[styles.header, { backgroundColor: theme.colors.primary }]} elevation={4}>
        <Animatable.View animation="fadeInDown" duration={1000} style={styles.headerContent}>
          <Text variant="headlineMedium" style={styles.headerText}>
            Mis Mascotas
          </Text>
          <Text variant="titleMedium" style={styles.headerSubtext}>
            Tus compañeros peludos
          </Text>
        </Animatable.View>
      </Surface>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <PetCard nombre="Luna" tipo="perro" edad="3" />
        <PetCard nombre="Michi" tipo="gato" edad="2" />
        
        <Animatable.View animation="fadeInUp" duration={1000} delay={400}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('PetRegister')}
            style={styles.addButton}
            contentStyle={styles.buttonContent}
            icon="plus"
          >
            Agregar Mascota
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
  card: {
    marginBottom: 15,
    borderRadius: 15,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  petAvatar: {
    marginRight: 15,
  },
  petInfo: {
    flex: 1,
  },
  petName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  addButton: {
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 30,
  },
  buttonContent: {
    height: 48,
  },
});