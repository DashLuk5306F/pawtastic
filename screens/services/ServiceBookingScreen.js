import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Alert, Platform } from 'react-native';
import { Text, TextInput, Button, useTheme, SegmentedButtons, Card, Portal, Modal } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../config/supabase';

export default function ServiceBookingScreen({ navigation }) {
  const theme = useTheme();
  const { user } = useAuth();
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [serviceType, setServiceType] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);

  useEffect(() => {
    const loadPets = async () => {
      try {
        const { data, error } = await supabase
          .from('pets')
          .select('*')
          .eq('owner_id', user.id);

        if (error) throw error;
        setPets(data || []);
        
        if (data && data.length > 0) {
          setSelectedPet(data[0].id);
        }
      } catch (error) {
        console.error('Error al cargar mascotas:', error);
        Alert.alert('Error', 'No se pudieron cargar tus mascotas');
      }
    };

    loadPets();
  }, [user]);

  const handleBookService = async () => {
    if (!selectedPet || !serviceType || !date) {
      Alert.alert('Error', 'Por favor completa todos los campos requeridos');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('services')
        .insert([
          {
            user_id: user.id,
            pet_id: selectedPet,
            tipo_servicio: serviceType,
            fecha: date.toISOString(),
            estado: 'pendiente',
            notas: notes,
            created_at: new Date().toISOString(),
          }
        ]);

      if (error) throw error;

      Alert.alert(
        'Éxito',
        'Servicio reservado correctamente',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('ServiceHistory')
          }
        ]
      );
    } catch (error) {
      console.error('Error al reservar servicio:', error);
      Alert.alert('Error', 'No se pudo reservar el servicio');
    } finally {
      setLoading(false);
    }
  };

  const serviceTypes = [
    { value: 'paseo', label: 'Paseo' },
    { value: 'peluqueria', label: 'Peluquería' },
    { value: 'veterinaria', label: 'Veterinaria' },
    { value: 'guarderia', label: 'Guardería' }
  ];

  // Función para seleccionar una fecha
  const selectDate = (newDate) => {
    const currentDate = newDate || date;
    const now = new Date();
    
    // Si la fecha seleccionada es anterior a hoy, usar hoy
    if (currentDate < now) {
      setDate(now);
    } else {
      setDate(currentDate);
    }
    setShowDateModal(false);
  };

  const DatePickerModal = () => (
    <Portal>
      <Modal
        visible={showDateModal}
        onDismiss={() => setShowDateModal(false)}
        contentContainerStyle={styles.modalContainer}
      >
        <View style={styles.datePickerContainer}>
          <Text variant="titleMedium" style={styles.modalTitle}>
            Seleccionar Fecha
          </Text>
          <ScrollView>
            {[...Array(30)].map((_, index) => {
              const dateOption = new Date();
              dateOption.setDate(dateOption.getDate() + index);
              const isSelected = date.toDateString() === dateOption.toDateString();

              return (
                <Button
                  key={index}
                  mode={isSelected ? "contained" : "outlined"}
                  onPress={() => selectDate(dateOption)}
                  style={styles.dateOption}
                >
                  {dateOption.toLocaleDateString('es-ES', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Button>
              );
            })}
          </ScrollView>
          <Button
            mode="contained"
            onPress={() => setShowDateModal(false)}
            style={styles.closeButton}
          >
            Cerrar
          </Button>
        </View>
      </Modal>
    </Portal>
  );

  return (
    <ScrollView style={styles.container}>
      <Animatable.View animation="fadeIn" duration={1000}>
        <Text variant="headlineSmall" style={styles.title}>
          Reservar Servicio
        </Text>

        {pets.length > 0 ? (
          <View>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Selecciona tu mascota
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {pets.map(pet => (
                <Card
                  key={pet.id}
                  style={[
                    styles.petCard,
                    selectedPet === pet.id && styles.selectedPetCard
                  ]}
                  onPress={() => setSelectedPet(pet.id)}
                >
                  <Card.Content>
                    <Text variant="titleMedium">{pet.nombre}</Text>
                    <Text variant="bodySmall">{pet.especie}</Text>
                  </Card.Content>
                </Card>
              ))}
            </ScrollView>

            <Text variant="titleMedium" style={styles.sectionTitle}>
              Tipo de Servicio
            </Text>
            <SegmentedButtons
              value={serviceType}
              onValueChange={setServiceType}
              buttons={serviceTypes.map(type => ({
                value: type.value,
                label: type.label,
              }))}
            />

            <Button
              mode="contained"
              onPress={() => setShowDateModal(true)}
              style={styles.dateButton}
            >
              {date.toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Button>

            <DatePickerModal />

            <TextInput
              label="Notas adicionales"
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
              mode="outlined"
              style={styles.notesInput}
            />

            <Button
              mode="contained"
              onPress={handleBookService}
              loading={loading}
              disabled={loading || !selectedPet || !serviceType || !date}
              style={styles.bookButton}
            >
              Reservar Servicio
            </Button>
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text variant="bodyLarge" style={styles.emptyText}>
              No tienes mascotas registradas
            </Text>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('PetRegister')}
              style={styles.registerPetButton}
            >
              Registrar Mascota
            </Button>
          </View>
        )}
      </Animatable.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    marginVertical: 16,
  },
  petCard: {
    marginRight: 12,
    minWidth: 120,
  },
  selectedPetCard: {
    backgroundColor: '#e8f5e9',
  },
  dateButton: {
    marginVertical: 16,
  },
  notesInput: {
    marginVertical: 16,
  },
  bookButton: {
    marginTop: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    marginBottom: 16,
  },
  registerPetButton: {
    width: '100%',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    maxHeight: '80%',
  },
  datePickerContainer: {
    flex: 1,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  dateOption: {
    marginVertical: 5,
  },
  closeButton: {
    marginTop: 10,
  },
});