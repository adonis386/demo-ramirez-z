import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../components/PageLayout';
import { getClientsWithDebt, getClientDebt, formatCurrency, clients } from '../data/mockData';
import { AppIcon } from '../components/AppIcon';
import { icons } from '../icons';

export function CuentasCobrarPage() {
  const navigate = useNavigate();
  const clientsWithDebt = getClientsWithDebt();
  const totalCartera = clientsWithDebt.reduce((sum, c) => sum + getClientDebt(c.id), 0);

  return (
    <PageLayout title="Cuentas por Cobrar" subtitle="Clientes con saldo pendiente">
      <div className="stats-row">
        <div className="stat-card">
          <div className="value">{formatCurrency(totalCartera)}</div>
          <div className="label">Cartera total</div>
        </div>
        <div className="stat-card">
          <div className="value">{clientsWithDebt.length}</div>
          <div className="label">Clientes con deuda</div>
        </div>
      </div>

      <p className="list-item-meta" style={{ marginBottom: 12 }}>
        Seleccione un cliente para ver sus notas de despacho pendientes por cancelar.
      </p>

      {clientsWithDebt.length === 0 && (
        <div className="empty-state">
          <div className="icon">✓</div>
          <p>No hay clientes con saldo pendiente</p>
        </div>
      )}

      {clientsWithDebt.map((client) => {
        const debt = getClientDebt(client.id);
        return (
          <button
            key={client.id}
            type="button"
            className="list-item list-item--clickable"
            onClick={() => navigate(`/cuentas-cobrar/${client.id}`)}
          >
            <div className="list-item-header">
              <div>
                <div className="list-item-title">{client.name}</div>
                <div className="list-item-meta">{client.zone} · {client.phone}</div>
              </div>
              <AppIcon icon={icons.chevronRight} size="sm" color="primary" />
            </div>
            <div className="list-item-amount">Deuda total: {formatCurrency(debt)}</div>
          </button>
        );
      })}

      {clients.filter((c) => getClientDebt(c.id) === 0).length > 0 && (
        <p className="list-item-meta" style={{ marginTop: 16, textAlign: 'center' }}>
          {clients.filter((c) => getClientDebt(c.id) === 0).length} cliente(s) al día
        </p>
      )}
    </PageLayout>
  );
}
