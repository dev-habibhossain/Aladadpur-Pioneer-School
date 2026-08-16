import { useState, useEffect } from 'react';
import {
  loginWithEmailPassword,
  signupWithEmailPassword,
  loginWithGoogle,
  logoutUser,
  onAuthStateChange,
} from '../../services/authService';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [backendUser, setBackendUser] = useState(() => {
    const saved = localStorage.getItem('spik_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    setLoading(true);
    const result = await loginWithEmailPassword(email, password);
    if (result.backendUser) {
      setBackendUser(result.backendUser);
    }
    setLoading(false);
    return result;
  };

  const register = async (userData) => {
    setLoading(true);
    const result = await signupWithEmailPassword(userData);
    if (result.backendUser) {
      setBackendUser(result.backendUser);
    }
    setLoading(false);
    return result;
  };

  const googleLogin = async () => {
    setLoading(true);
    const result = await loginWithGoogle();
    setLoading(false);
    return result;
  };

  const logout = async () => {
    setLoading(true);
    await logoutUser();
    setUser(null);
    setBackendUser(null);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChange((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    backendUser,
    loading,
    login,
    register,
    googleLogin,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;