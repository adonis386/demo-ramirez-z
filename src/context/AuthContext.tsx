import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Role, User } from '../types';
import { users } from '../data/mockData';
import demoAuth from '../data/demoAuth.json';

interface AuthContextValue {
  user: User | null;
  login: (userId: string) => void;
  loginDemo: (username: string, password: string) => string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userId: string) => {
    const found = users.find((u) => u.id === userId);
    if (found) setUser(found);
  };

  const loginDemo = (username: string, password: string): string | null => {
    const match = demoAuth.find(
      (a) => a.username.toLowerCase() === username.trim().toLowerCase() && a.password === password,
    );
    if (!match) return 'Usuario o contraseña incorrectos';
    setUser({
      id: 'demo',
      name: match.name,
      role: match.role as Role,
    });
    return null;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, loginDemo, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return { ...ctx, roleModules };
}

export const roleLabels: Record<Role, string> = {
  vendedor: 'Vendedor',
  cobrador: 'Cobrador',
  despachador: 'Despachador',
  gerencia: 'Gerencia Administrativa',
};

export const roleModules: Record<Role, string[]> = {
  vendedor: ['mi-camion', 'cuentas-cobrar'],
  cobrador: ['cuentas-cobrar'],
  despachador: ['despachadores'],
  gerencia: ['inventario', 'vendedores', 'despachadores', 'cuentas-cobrar', 'cuentas-pagar'],
};
