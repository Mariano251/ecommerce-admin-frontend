import { createContext, useContext, useState, useEffect,type ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

interface User {
  email: string;
  name: string;
  role: 'admin';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Usuario admin por defecto (localStorage)
const ADMIN_CREDENTIALS = {
  email: 'admin@ecommerce.com',
  password: 'admin123',
  name: 'Administrador'
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Verificar si hay sesión al cargar
  useEffect(() => {
    const savedAuth = localStorage.getItem('admin_auth');
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        setUser(authData.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error al cargar sesión:', error);
        localStorage.removeItem('admin_auth');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simular delay de autenticación
    await new Promise(resolve => setTimeout(resolve, 500));

    // Verificar credenciales
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const userData: User = {
        email: ADMIN_CREDENTIALS.email,
        name: ADMIN_CREDENTIALS.name,
        role: 'admin'
      };

      setUser(userData);
      setIsAuthenticated(true);

      // Guardar en localStorage
      localStorage.setItem('admin_auth', JSON.stringify({
        user: userData,
        timestamp: Date.now()
      }));

      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}