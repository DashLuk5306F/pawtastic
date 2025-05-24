import { supabase } from '../config/supabase';

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const supabaseAuthService = {
  // Registro de usuario
  async register(email, password, userData) {
    // Validación de datos
    if (!email || !password) {
      throw new Error('El correo electrónico y la contraseña son obligatorios');
    }

    if (!validateEmail(email)) {
      throw new Error('El correo electrónico no es válido');
    }

    if (password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    try {
      console.log('Iniciando registro con Supabase...');
      
      // 1. Registrar usuario en Auth
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            email: email,
          }
        }
      });

      if (signUpError) {
        console.error('Error en signUp:', signUpError);
        throw signUpError;
      }
      console.log('Usuario registrado:', authData);
      
      // Esperar a que la sesión se establezca
      const { data: session } = await supabase.auth.getSession();
      
      // 2. Crear perfil del usuario
      if (authData.user && session) {
        console.log('Creando perfil para usuario:', authData.user.id);
        
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              email: email,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          ]);

        if (profileError) {
          console.error('Error al crear perfil:', profileError);
          throw profileError;
        }

        return authData;
      }
      
      throw new Error('No se pudo crear el usuario');
    } catch (error) {
      console.error('Error en proceso de registro:', error);
      throw error;
    }
  },

  // Inicio de sesión
  async login(email, password) {
    try {
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { user };
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  },

  // Cerrar sesión
  async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error en logout:', error);
      throw error;
    }
  },

  // Obtener usuario actual
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      return user;
    } catch (error) {
      console.error('Error al obtener usuario actual:', error);
      return null;
    }
  },

  // Obtener perfil del usuario
  async getUserProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      throw error;
    }
  },

  // Actualizar perfil del usuario
  async updateUserProfile(userId, updates) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      throw error;
    }
  },

  // Subir avatar del usuario
  async uploadAvatar(userId, file) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl }, error: urlError } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      if (urlError) throw urlError;

      // Actualizar el perfil con la URL del avatar
      await this.updateUserProfile(userId, {
        avatar_url: publicUrl,
      });

      return publicUrl;
    } catch (error) {
      console.error('Error al subir avatar:', error);
      throw error;
    }
  },

  // Eliminar cuenta de usuario
  async deleteAccount(userId) {
    try {
      // Eliminar datos del usuario
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (profileError) throw profileError;

      // Eliminar archivos de storage
      const { error: storageError } = await supabase.storage
        .from('avatars')
        .remove([`${userId}`]);

      if (storageError) console.warn('Error al eliminar archivos:', storageError);

      // Eliminar usuario de auth
      const { error: authError } = await supabase.auth.admin.deleteUser(userId);
      
      if (authError) throw authError;
    } catch (error) {
      console.error('Error al eliminar cuenta:', error);
      throw error;
    }
  }
};
