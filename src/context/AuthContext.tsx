
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define user type
interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on load
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Authentication error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock authentication - would normally call API
      // This is a simplified demo version
      if (email && password) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Demo user - in a real app, this would come from backend
        const authenticatedUser = {
          id: crypto.randomUUID(),
          email,
          name: email.split('@')[0],
        };
        
        localStorage.setItem('user', JSON.stringify(authenticatedUser));
        setUser(authenticatedUser);
      } else {
        throw new Error('Email and password are required');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // Mock signup - would normally call API
      if (email && password && name) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Create new user
        const newUser = {
          id: crypto.randomUUID(),
          email,
          name,
        };
        
        localStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
      } else {
        throw new Error('All fields are required');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
