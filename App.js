import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { theme } from './theme';
import app from './config/firebase';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoadingScreen from './components/LoadingScreen';

// Auth Screens
import PaginaInicial from './screens/auth/PaginaInicial';
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import PersonalInfoScreen from './screens/auth/PersonalInfoScreen';

// Main Screens
import HomeScreen from './screens/main/HomeScreen';
import MarketScreen from './screens/main/MarketScreen';

// Profile Screens
import ProfileScreen from './screens/profile/ProfileScreen';
import EditProfileScreen from './screens/profile/EditProfileScreen';
import MyPetsScreen from './screens/profile/MyPetsScreen';
import PetRegisterScreen from './screens/profile/PetRegisterScreen';

// Service Screens
import ServiceBookingScreen from './screens/services/ServiceBookingScreen';
import ServiceHistoryScreen from './screens/services/ServiceHistoryScreen';

// Settings Screens
import NotificationsScreen from './screens/settings/NotificationsScreen';
import PrivacyScreen from './screens/settings/PrivacyScreen';
import HelpSupportScreen from './screens/settings/HelpSupportScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Mercado') {
            iconName = focused ? 'shopping' : 'shopping-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'account' : 'account-outline';
          }

          return (
            <Animatable.View
              animation={focused ? 'bounceIn' : undefined}
              duration={500}
            >
              <MaterialCommunityIcons name={iconName} size={size} color={color} />
            </Animatable.View>
          );
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 65,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 5,
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Mercado" component={MarketScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const screenOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: '#fff' },
  animation: 'slide_from_right'
};

function Navigation() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator 
      initialRouteName={user ? "Home" : "Inicial"}
      screenOptions={screenOptions} 
    >
      {!user ? (
        // Rutas públicas
        <>
          <Stack.Screen 
            name="Inicial" 
            component={PaginaInicial}
            options={{ animation: 'fade' }}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
        </>
      ) : (
        // Rutas protegidas
        <>
          <Stack.Screen name="Home" component={TabNavigator} />
          <Stack.Screen name="PetRegister" component={PetRegisterScreen} />
          <Stack.Screen name="ServiceBooking" component={ServiceBookingScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="MyPets" component={MyPetsScreen} />
          <Stack.Screen name="ServiceHistory" component={ServiceHistoryScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="Privacy" component={PrivacyScreen} />
          <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <AuthProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <Navigation />
            </NavigationContainer>
          </SafeAreaProvider>
        </AuthProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
