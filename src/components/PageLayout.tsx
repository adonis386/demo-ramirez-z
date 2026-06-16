import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppIcon } from './AppIcon';
import { icons } from '../icons';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  showBack?: boolean;
}

export function PageLayout({ title, subtitle, children, showBack = true }: PageLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      {showBack && (
        <button type="button" className="back-nav" onClick={() => navigate('/')}>
          <AppIcon icon={icons.arrowLeft} size="xs" color="primary" />
          Inicio
        </button>
      )}
      <header className="page-header">
        <h1>{title}</h1>
        {subtitle && <p className="subtitle">{subtitle}</p>}
      </header>
      {children}
    </div>
  );
}
