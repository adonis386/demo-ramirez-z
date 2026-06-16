import { users } from '../data/mockData';
import { useAuth, roleLabels } from '../context/AuthContext';
import { AppIcon } from '../components/AppIcon';
import { icons } from '../icons';

export function LoginPage() {
  const { login } = useAuth();

  return (
    <div className="login-screen">
      <div className="login-logo">
        <AppIcon icon={icons.beer} size="lg" color="primary" />
      </div>
      <h1 className="login-title">Ramirez Z C.A</h1>
      <p className="login-tagline">Sistema administrativo · Despacho de cervezas</p>

      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: 16, textAlign: 'center' }}>
        Seleccione un usuario para la demo
      </p>

      {users.map((user) => (
        <button
          key={user.id}
          type="button"
          className="user-select-card"
          onClick={() => login(user.id)}
        >
          <div className="name">
            <AppIcon icon={icons.user} size="xs" color="primary" />
            {user.name}
          </div>
          <div className="role">{roleLabels[user.role]}</div>
          {user.zone && (
            <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: 2 }}>
              {user.zone}
            </div>
          )}
        </button>
      ))}

      <footer className="app-footer">
        <p>versión 1.0.0 demo · PWA</p>
      </footer>
    </div>
  );
}
