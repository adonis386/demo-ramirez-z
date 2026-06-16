import { PageLayout } from '../components/PageLayout';
import { receivables, formatCurrency } from '../data/mockData';
import { invoiceStatusBadge } from '../components/StatusBadge';
import { useAuth } from '../context/AuthContext';

export function CuentasCobrarPage() {
  const { user } = useAuth();

  const totalPorCobrar = receivables.reduce((sum, r) => sum + (r.total - r.paid), 0);
  const totalParcial = receivables.filter((r) => r.status === 'parcial').length;

  return (
    <PageLayout title="Cuentas por Cobrar" subtitle="Facturas y abonos">
      <div className="stats-row">
        <div className="stat-card">
          <div className="value">{formatCurrency(totalPorCobrar)}</div>
          <div className="label">Saldo pendiente</div>
        </div>
        <div className="stat-card">
          <div className="value">{totalParcial}</div>
          <div className="label">Con abono parcial</div>
        </div>
      </div>

      <p className="list-item-meta" style={{ marginBottom: 12 }}>
        Soporta abonos parciales: la factura queda en &quot;por cobrar&quot; con el monto pagado reflejado.
      </p>

      {receivables.map((rec) => {
        const pct = rec.total > 0 ? (rec.paid / rec.total) * 100 : 0;
        const pending = rec.total - rec.paid;

        return (
          <div key={rec.id} className="list-item">
            <div className="list-item-header">
              <div>
                <div className="list-item-title">{rec.clientName}</div>
                <div className="list-item-meta">
                  {rec.invoiceNumber} · Vence: {rec.dueDate}
                </div>
              </div>
              {invoiceStatusBadge(rec.status)}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span className="list-item-meta">Total: {formatCurrency(rec.total)}</span>
              <span className="list-item-meta">Pagado: {formatCurrency(rec.paid)}</span>
            </div>

            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${pct}%` }} />
            </div>

            {pending > 0 && (
              <div className="list-item-amount" style={{ marginTop: 8 }}>
                Pendiente: {formatCurrency(pending)}
              </div>
            )}

            {user?.role === 'gerencia' && rec.status !== 'pagado' && (
              <button type="button" className="btn btn-primary btn-block" style={{ marginTop: 10 }}>
                Registrar abono
              </button>
            )}
          </div>
        );
      })}
    </PageLayout>
  );
}
