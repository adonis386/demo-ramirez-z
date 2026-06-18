import { useNavigate } from 'react-router-dom';
import { useAuth, roleLabels } from '../context/AuthContext';
import { AppIcon } from '../components/AppIcon';
import { actionIcons, icons, moduleIcons } from '../icons';

const moduleConfig: Record<string, { key: string; label: string; path: string }> = {
  inventario: { key: 'inventario', label: 'Inventario', path: '/inventario' },
  'mi-camion': { key: 'mi-camion', label: 'Mi Camión', path: '/mi-camion' },
  vendedores: { key: 'vendedores', label: 'Vendedores', path: '/vendedores' },
  despachadores: { key: 'despachadores', label: 'Despachadores', path: '/despachadores' },
  'cuentas-cobrar': { key: 'cuentas-cobrar', label: 'Cuentas por Cobrar', path: '/cuentas-cobrar' },
  'cuentas-pagar': { key: 'cuentas-pagar', label: 'Cuentas por Pagar', path: '/cuentas-pagar' },
};

const quickActions: Record<string, { iconKey: keyof typeof actionIcons; label: string; path: string }[]> = {
  vendedor: [
    { iconKey: 'nuevoPedido', label: 'Nuevo Pedido', path: '/pedidos' },
    { iconKey: 'nuevaCobranza', label: 'Nueva Cobranza', path: '/cobranzas' },
    { iconKey: 'miCamion', label: 'Mi Camión', path: '/mi-camion' },
  ],
  cobrador: [
    { iconKey: 'nuevoRecibo', label: 'Nuevo Recibo', path: '/cobranzas' },
    { iconKey: 'cartera', label: 'Cartera', path: '/cuentas-cobrar' },
  ],
  despachador: [
    { iconKey: 'verRadar', label: 'Ver Radar', path: '/despachadores' },
    { iconKey: 'miCamion', label: 'Mi Camión', path: '/mi-camion' },
  ],
  gerencia: [
    { iconKey: 'nuevoPedido', label: 'Pedidos', path: '/pedidos' },
    { iconKey: 'aprobarCobros', label: 'Cobranzas', path: '/cobranzas' },
    { iconKey: 'pagarProveedor', label: 'Pagar Proveedor', path: '/cuentas-pagar' },
  ],
};

export function Dashboard() {
  const { user, logout, roleModules } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const modules = roleModules[user.role].map((key) => moduleConfig[key]);
  const actions = quickActions[user.role] ?? [];

  return (
    <div className="app-shell">
      <header className="page-header">
        <div className="brand-icon">
          <AppIcon icon={icons.beer} size="md" color="primary" />
        </div>
        <h1>Ramirez Z C.A</h1>
        <p className="subtitle">
          {user.name} · {roleLabels[user.role]}
        </p>
      </header>

      {actions.length > 0 && (
        <>
          <h2 className="section-title">Registro</h2>
          <div className={`card-grid card-grid-${Math.min(actions.length, 3)}`}>
            {actions.map((action) => {
              const { icon, color } = actionIcons[action.iconKey];
              return (
                <button
                  key={action.label}
                  type="button"
                  className="action-card"
                  onClick={() => navigate(action.path)}
                >
                  <span className="icon">
                    <AppIcon icon={icon} size="sm" color={color} />
                  </span>
                  <span className="label">{action.label}</span>
                </button>
              );
            })}
          </div>
        </>
      )}

      {modules.length > 0 && (
        <>
          <h2 className="section-title">Módulos</h2>
          <div className="card-grid card-grid-2">
            {modules.map((mod) => {
              const { icon, color } = moduleIcons[mod.key];
              return (
                <button
                  key={mod.path}
                  type="button"
                  className="module-card"
                  onClick={() => navigate(mod.path)}
                >
                  <span className="icon">
                    <AppIcon icon={icon} size="md" color={color} />
                  </span>
                  <span className="label">{mod.label}</span>
                </button>
              );
            })}
          </div>
        </>
      )}

      <div style={{ marginTop: 24 }}>
        <div className="info-banner">
          <AppIcon icon={icons.mobile} size="xs" color="primary" />
          <span>Sistema administrativo móvil para despacho de cervezas Zulia</span>
        </div>
      </div>

      <footer className="app-footer">
        <button type="button" className="logout-btn" onClick={logout}>
          Cerrar sesión
        </button>
        <p style={{ marginTop: 8 }}>versión 1.0.0 demo</p>
      </footer>
    </div>
  );
}
