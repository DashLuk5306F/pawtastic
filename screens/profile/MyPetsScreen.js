import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
import { Text, Surface, useTheme, Card, Button, Avatar, IconButton } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { useAuth } from '../../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const PetCard = ({ pet, onEdit, onDelete }) => {
  const tipoIcono = pet.tipo === 'perro' ? 'dog' : (pet.tipo === 'gato' ? 'cat' : 'paw');

  return (
    <Animatable.View animation="fadeInUp" duration={800}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Avatar.Icon 
            size={60} 
            icon={tipoIcono}
            style={styles.petAvatar}
          />
          <View style={styles.petInfo}>
            <Text variant="titleMedium" style={styles.petName}>{pet.nombre}</Text>
            <Text variant="bodyMedium">{pet.tipo} · {pet.edad} años</Text>
            {pet.raza && <Text variant="bodySmall">Raza: {pet.raza}</Text>}
            {pet.peso && <Text variant="bodySmall">Peso: {pet.peso} kg</Text>}
          </View>
          <View style={styles.actions}>
            <IconButton icon="pencil" size={20} onPress={() => onEdit(pet)} />
            <IconButton icon="delete" size={20} onPress={() => onDelete(pet)} />
          </View>
        </Card.Content>
        {pet.caracteristicas && (
          <Card.Actions style={styles.cardActions}>
            <Text variant="bodySmall">{pet.caracteristicas}</Text>
          </Card.Actions>
        )}
      </Card>
    </Animatable.View>
  );
};

export default function MyPetsScreen({ navigation }) {
  const theme = useTheme();
  const { user } = useAuth();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      if (!user?.uid) {
        setLoading(false);
        return;
      }

      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists() && userDoc.data().pets) {
          setPets(userDoc.data().pets);
        } else {
          setPets([]);
        }
      } catch (error) {
        console.error('Error al obtener mascotas:', error);
        setPets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();

    // Agregar un listener para recargar los datos cuando regresemos a esta pantalla
    const unsubscribe = navigation.addListener('focus', fetchPets);
    return unsubscribe;
  }, [user, navigation]);

  const handleEditPet = (pet) => {
    // Navegamos a la pantalla de edición con los datos de la mascota
    navigation.navigate('PetRegister', { petData: pet, isEditing: true });
  };

  const handleDeletePet = (pet) => {
    // Aquí implementarías la lógica para eliminar una mascota
    alert('Función para eliminar mascota: ' + pet.nombre);
    
    // Implementación pendiente
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text>Cargando mascotas...</Text>
      </View>
    );
  }

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
        {pets.length === 0 ? (
          <Animatable.View animation="fadeIn" duration={1000} style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tienes mascotas registradas</Text>
            <Text style={styles.emptySubtext}>¡Registra a tu primer compañero peludo!</Text>
          </Animatable.View>
        ) : (
          pets.map((pet, index) => (
            <PetCard
              key={index}
              pet={pet}
              onEdit={handleEditPet}
              onDelete={handleDeletePet}
            />
          ))
        )}

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
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
  actions: {
    flexDirection: 'row',
  },
  cardActions: {
    paddingTop: 0,
  },
  addButton: {
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 30,
  },
  buttonContent: {
    height: 48,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    opacity: 0.7,
  },
});