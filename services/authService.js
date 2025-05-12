import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export const authService = {
  // Registro de usuario
  async register(email, password, userData) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;
      
      // Guardar información adicional del usuario en Firestore
      await setDoc(doc(db, 'users', uid), {
        id: uid,
        ...userData,
        createdAt: serverTimestamp(),
      });

      return { user: userCredential.user, id: uid };
    } catch (error) {
      throw error;
    }
  },

  // Inicio de sesión
  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { user: userCredential.user };
    } catch (error) {
      throw error;
    }
  },

  // Cerrar sesión
  async logout() {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  },

  // Obtener usuario actual
  getCurrentUser() {
    return auth.currentUser;
  },

  // Observador del estado de autenticación
  onAuthStateChanged(callback) {
    return onAuthStateChanged(auth, callback);
  }
};
// Este servicio ha sido reemplazado por supabaseAuthService.js
// Usar la nueva implementación que trabaja con Supabase