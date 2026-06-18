import { useState, type FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { AppIcon } from '../components/AppIcon';
import { icons } from '../icons';

export function LoginPage() {
  const { loginDemo } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const err = loginDemo(username, password);
    setError(err ?? '');
  };

  return (
    <div className="login-screen">
      <div className="login-logo">
        <AppIcon icon={icons.beer} size="lg" color="primary" />
      </div>
      <h1 className="login-title">Ramirez Z C.A</h1>
      <p className="login-tagline">Sistema administrativo · Despacho de cervezas</p>

      <form onSubmit={handleSubmit} className="login-form">
        <label className="field-label">
          Usuario
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuario"
            autoComplete="username"
            required
          />
        </label>
        <label className="field-label">
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            autoComplete="current-password"
            required
          />
        </label>
        {error && <p className="login-error">{error}</p>}
        <button type="submit" className="btn btn-primary btn-block">
          Ingresar
        </button>
      </form>

      <footer className="app-footer">
        <p>versión 1.0.0 demo · PWA</p>
      </footer>
    </div>
  );
}
