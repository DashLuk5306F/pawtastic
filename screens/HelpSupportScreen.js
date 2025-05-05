import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Surface, useTheme, List, Card } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

const FAQCard = ({ pregunta, respuesta }) => (
  <Animatable.View animation="fadeInUp" duration={800}>
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.question}>{pregunta}</Text>
        <Text variant="bodyMedium" style={styles.answer}>{respuesta}</Text>
      </Card.Content>
    </Card>
  </Animatable.View>
);

export default function HelpSupportScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={[styles.header, { backgroundColor: theme.colors.primary }]} elevation={4}>
        <Animatable.View animation="fadeInDown" duration={1000} style={styles.headerContent}>
          <Text variant="headlineMedium" style={styles.headerText}>
            Ayuda y Soporte
          </Text>
          <Text variant="titleMedium" style={styles.headerSubtext}>
            ¿Cómo podemos ayudarte?
          </Text>
        </Animatable.View>
      </Surface>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animatable.View animation="fadeInUp" duration={1000}>
          <List.Section>
            <List.Subheader>Contacto Directo</List.Subheader>
            <List.Item
              title="Chat en Vivo"
              description="Habla con nuestro equipo de soporte"
              left={props => <List.Icon {...props} icon="message-text" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
            <List.Item
              title="Llamar a Soporte"
              description="Atención telefónica 24/7"
              left={props => <List.Icon {...props} icon="phone" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
            <List.Item
              title="Enviar Email"
              description="soporte@pawtastic.com"
              left={props => <List.Icon {...props} icon="email" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
          </List.Section>

          <Text variant="titleMedium" style={styles.faqTitle}>Preguntas Frecuentes</Text>

          <FAQCard
            pregunta="¿Cómo agenda un servicio?"
            respuesta="Puedes agendar un servicio desde la pantalla principal seleccionando 'Agendar Servicio' y siguiendo los pasos indicados."
          />

          <FAQCard
            pregunta="¿Cómo actualizo la información de mi mascota?"
            respuesta="Ve a tu perfil, selecciona 'Mis Mascotas' y elige la mascota que deseas actualizar. Allí podrás modificar toda su información."
          />

          <FAQCard
            pregunta="¿Qué hago en caso de emergencia?"
            respuesta="Para emergencias, usa la opción de 'Chat en Vivo' o 'Llamar a Soporte' para contactar inmediatamente con nuestro equipo de atención 24/7."
          />

          <List.Section>
            <List.Subheader>Recursos Adicionales</List.Subheader>
            <List.Item
              title="Centro de Ayuda"
              description="Base de conocimientos completa"
              left={props => <List.Icon {...props} icon="help-circle" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
            <List.Item
              title="Tutoriales en Video"
              description="Guías paso a paso"
              left={props => <List.Icon {...props} icon="video" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
            <List.Item
              title="Términos y Condiciones"
              description="Información legal"
              left={props => <List.Icon {...props} icon="file-document" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
          </List.Section>
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
  faqTitle: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 15,
  },
  card: {
    marginBottom: 15,
    borderRadius: 15,
  },
  question: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  answer: {
    opacity: 0.7,
  },
});