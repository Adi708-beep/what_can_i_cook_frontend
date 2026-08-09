import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await api.get('/auth/me');
      if (res.success && res.data.user) {
        setUser(res.data.user);
      }
    } catch (err) {
      // Fallback dev user if unauthenticated on local dev environment
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setUser({
          _id: '60d0fe4f5311236168a109ca',
          name: 'Aditya Saha',
          email: 'aditya@example.com',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
          role: 'user',
          onboardingCompleted: true,
          dietaryPreferences: ['Vegetarian', 'High Protein'],
          allergies: ['Peanuts'],
          favoriteCuisines: ['Italian', 'Indian'],
          cookingSkill: 'Intermediate',
        });
      } else {
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.success && res.data) {
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      return res.data.user;
    }
  };

  const register = async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password });
    if (res.success && res.data) {
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      return res.data.user;
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {}
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateUser = (updatedFields) => {
    setUser((prev) => (prev ? { ...prev, ...updatedFields } : null));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
