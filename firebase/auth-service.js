// import { 
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut
// } from 'firebase/auth';
// import { 
//   doc, 
//   setDoc, 
//   getDoc 
// } from 'firebase/firestore';
// import { auth, db } from './config';

// // Registro de usuario
// export const registerUser = async (email, password, userData) => {
//   try {
//     // Crear usuario en Authentication
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;

//     // Guardar datos adicionales en Firestore
//     await setDoc(doc(db, 'users', user.uid), {
//       ...userData,
//       email,
//       createdAt: new Date().toISOString(),
//     });

//     return { user, error: null };
//   } catch (error) {
//     return { user: null, error: error.message };
//   }
// };

// // Inicio de sesión
// export const loginUser = async (email, password) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;

//     // Obtener datos adicionales del usuario desde Firestore
//     const userDoc = await getDoc(doc(db, 'users', user.uid));
//     const userData = userDoc.data();

//     return { user, userData, error: null };
//   } catch (error) {
//     return { user: null, userData: null, error: error.message };
//   }
// };

// // Cerrar sesión
// export const logoutUser = async () => {
//   try {
//     await signOut(auth);
//     return { error: null };
//   } catch (error) {
//     return { error: error.message };
//   }
// };

// // Obtener datos del usuario
// export const getUserData = async (userId) => {
//   try {
//     const userDoc = await getDoc(doc(db, 'users', userId));
//     if (userDoc.exists()) {
//       return { userData: userDoc.data(), error: null };
//     }
//     return { userData: null, error: 'Usuario no encontrado' };
//   } catch (error) {
//     return { userData: null, error: error.message };
//   }
// };