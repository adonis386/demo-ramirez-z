import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Role, User } from '../types';
import { users } from '../data/mockData';

interface AuthContextValue {
  user: User | null;
  login: (userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userId: string) => {
    const found = users.find((u) => u.id === userId);
    if (found) setUser(found);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
  vendedor: ['inventario', 'vendedores', 'cuentas-cobrar'],
  cobrador: ['vendedores', 'cuentas-cobrar'],
  despachador: ['inventario', 'despachadores'],
  gerencia: ['inventario', 'vendedores', 'despachadores', 'cuentas-cobrar', 'cuentas-pagar'],
};
