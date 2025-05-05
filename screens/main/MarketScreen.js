import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { Text, Surface, useTheme, Card, Button } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

const ProductCard = ({ title, price, description, image }) => {
  return (
    <Animatable.View animation="fadeInUp" duration={800}>
      <Card style={styles.card}>
        <Card.Cover source={require('../../assets/app-icon.png')} />
        <Card.Content>
          <Text variant="titleMedium" style={styles.productTitle}>{title}</Text>
          <Text variant="bodyMedium" style={styles.description}>{description}</Text>
          <Text variant="titleLarge" style={styles.price}>${price}</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" style={styles.buyButton}>
            Comprar
          </Button>
        </Card.Actions>
      </Card>
    </Animatable.View>
  );
};

export default function MarketScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={[styles.header, { backgroundColor: theme.colors.primary }]} elevation={4}>
        <Animatable.View animation="fadeInDown" duration={1000} style={styles.headerContent}>
          <Text variant="displaySmall" style={styles.headerText}>
            Mercado
          </Text>
          <Text variant="titleMedium" style={styles.headerSubtext}>
            Todo para tu mascota
          </Text>
        </Animatable.View>
      </Surface>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <ProductCard
          title="Alimento Premium"
          price="29.99"
          description="Alimento balanceado de alta calidad para tu mascota"
        />
        <ProductCard
          title="Juguete Interactivo"
          price="15.99"
          description="Mantén entretenida a tu mascota con este juguete especial"
        />
        <ProductCard
          title="Cama Confortable"
          price="49.99"
          description="Dale a tu mascota el mejor descanso con esta cama premium"
        />
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
    marginBottom: 20,
    borderRadius: 15,
  },
  productTitle: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 5,
    opacity: 0.7,
  },
  price: {
    marginTop: 10,
    color: '#705aa9',
    fontWeight: 'bold',
  },
  buyButton: {
    marginLeft: 'auto',
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 20,
  },
});