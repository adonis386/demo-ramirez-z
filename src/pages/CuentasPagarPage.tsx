import { PageLayout } from '../components/PageLayout';
import { payables, suppliers, formatCurrency } from '../data/mockData';
import { noteStatusBadge } from '../components/StatusBadge';
import { useAuth } from '../context/AuthContext';

export function CuentasPagarPage() {
  const { user } = useAuth();

  const totalPendiente = payables.reduce((sum, p) => sum + (p.total - p.paid), 0);

  return (
    <PageLayout title="Cuentas por Pagar" subtitle="Proveedor La Regional">
      <div className="stats-row">
        <div className="stat-card">
          <div className="value">{formatCurrency(totalPendiente)}</div>
          <div className="label">Por pagar</div>
        </div>
        <div className="stat-card">
          <div className="value">{payables.length}</div>
          <div className="label">Facturas pendientes</div>
        </div>
      </div>

      <h2 className="section-title" style={{ marginTop: 0 }}>Proveedor</h2>
      {suppliers.map((sup) => (
        <div key={sup.id} className="list-item">
          <div className="list-item-header">
            <div>
              <div className="list-item-title">{sup.name}</div>
              <div className="list-item-meta">Razón social: {sup.legalName}</div>
              <div className="list-item-meta">{sup.phone}</div>
            </div>
            <span className="list-item-amount">{formatCurrency(sup.balance)}</span>
          </div>
        </div>
      ))}

      <h2 className="section-title">Facturas</h2>
      {payables.map((pay) => {
        const pending = pay.total - pay.paid;
        const pct = pay.total > 0 ? (pay.paid / pay.total) * 100 : 0;

        return (
          <div key={pay.id} className="list-item">
            <div className="list-item-header">
              <div>
                <div className="list-item-title">{pay.supplierName}</div>
                <div className="list-item-meta">
                  {pay.invoiceNumber} · Vence: {pay.dueDate}
                </div>
              </div>
              {noteStatusBadge(pay.status === 'pendiente' ? 'por_cobrar' : pay.status)}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span className="list-item-meta">Total: {formatCurrency(pay.total)}</span>
              <span className="list-item-meta">Pagado: {formatCurrency(pay.paid)}</span>
            </div>

            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${pct}%` }} />
            </div>

            {pending > 0 && (
              <div className="list-item-amount" style={{ marginTop: 8 }}>
                Pendiente: {formatCurrency(pending)}
              </div>
            )}

            {user?.role === 'gerencia' && pay.status !== 'pagado' && (
              <button type="button" className="btn btn-primary btn-block" style={{ marginTop: 10 }}>
                Registrar pago
              </button>
            )}
          </div>
        );
      })}
    </PageLayout>
  );
}
