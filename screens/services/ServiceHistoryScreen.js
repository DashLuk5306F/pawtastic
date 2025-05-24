import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { Text, Card, useTheme, ActivityIndicator } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../config/supabase';

export default function ServiceHistoryScreen() {
  const theme = useTheme();
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let subscription;

    const loadServices = async () => {
      try {
        // Cargar servicios con información de las mascotas
        const { data, error } = await supabase
          .from('services')
          .select(`
            *,
            pets (
              nombre,
              especie,
              raza
            )
          `)
          .eq('user_id', user.id)
          .order('fecha', { ascending: false });

        if (error) throw error;
        setServices(data || []);

        // Suscribirse a cambios en tiempo real
        subscription = supabase
          .channel('services')
          .on('postgres_changes', 
            { 
              event: '*', 
              schema: 'public', 
              table: 'services',
              filter: `user_id=eq.${user.id}`
            },
            payload => {
              if (payload.eventType === 'INSERT') {
                setServices(current => [payload.new, ...current]);
              } else if (payload.eventType === 'DELETE') {
                setServices(current => 
                  current.filter(service => service.id !== payload.old.id)
                );
              } else if (payload.eventType === 'UPDATE') {
                setServices(current => 
                  current.map(service => 
                    service.id === payload.new.id ? payload.new : service
                  )
                );
              }
            }
          )
          .subscribe();

      } catch (error) {
        console.error('Error al cargar servicios:', error);
        Alert.alert('Error', 'No se pudieron cargar los servicios');
      } finally {
        setLoading(false);
      }
    };

    loadServices();

    return () => {
      if (subscription) {
        supabase.removeChannel(subscription);
      }
    };
  }, [user]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Animatable.View animation="fadeIn" duration={1000}>
        {services.length > 0 ? (
          services.map(service => (
            <Card key={service.id} style={styles.card}>
              <Card.Content>
                <Text variant="titleMedium">
                  {service.pets?.nombre || 'Mascota no disponible'}
                </Text>
                <Text variant="bodyMedium">
                  Servicio: {service.tipo_servicio}
                </Text>
                <Text variant="bodyMedium">
                  Fecha: {new Date(service.fecha).toLocaleDateString()}
                </Text>
                <Text variant="bodyMedium">
                  Estado: {service.estado}
                </Text>
                {service.notas && (
                  <Text variant="bodySmall">
                    Notas: {service.notas}
                  </Text>
                )}
              </Card.Content>
            </Card>
          ))
        ) : (
          <Text style={styles.emptyText}>
            No hay servicios registrados
          </Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginBottom: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
  },
});