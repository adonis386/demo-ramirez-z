import type { ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { InventarioPage } from './pages/InventarioPage';
import { MiCamionPage } from './pages/MiCamionPage';
import { VendedoresPage } from './pages/VendedoresPage';
import { PedidosPage } from './pages/PedidosPage';
import { CobranzasPage } from './pages/CobranzasPage';
import { DespachadoresPage } from './pages/DespachadoresPage';
import { CuentasCobrarPage } from './pages/CuentasCobrarPage';
import { ClienteCuentaPage } from './pages/ClienteCuentaPage';
import { CuentasPagarPage } from './pages/CuentasPagarPage';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/inventario" element={<ProtectedRoute><InventarioPage /></ProtectedRoute>} />
      <Route path="/mi-camion" element={<ProtectedRoute><MiCamionPage /></ProtectedRoute>} />
      <Route path="/pedidos" element={<ProtectedRoute><PedidosPage /></ProtectedRoute>} />
      <Route path="/cobranzas" element={<ProtectedRoute><CobranzasPage /></ProtectedRoute>} />
      <Route path="/vendedores" element={<ProtectedRoute><VendedoresPage /></ProtectedRoute>} />
      <Route path="/despachadores" element={<ProtectedRoute><DespachadoresPage /></ProtectedRoute>} />
      <Route path="/cuentas-cobrar" element={<ProtectedRoute><CuentasCobrarPage /></ProtectedRoute>} />
      <Route path="/cuentas-cobrar/:clientId" element={<ProtectedRoute><ClienteCuentaPage /></ProtectedRoute>} />
      <Route path="/cuentas-pagar" element={<ProtectedRoute><CuentasPagarPage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
