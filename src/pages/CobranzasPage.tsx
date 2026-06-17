import { PageLayout } from '../components/PageLayout';
import { collections, formatCurrency } from '../data/mockData';
import { paymentStatusBadge } from '../components/StatusBadge';
import { useAuth } from '../context/AuthContext';

export function CobranzasPage() {
  const { user } = useAuth();
  const pendingCollections = collections.filter((c) => c.status === 'sin_aprobar').length;
  const isGerencia = user?.role === 'gerencia';
  const canCreate = user?.role === 'vendedor' || user?.role === 'cobrador';

  return (
    <PageLayout
      title="Cobranzas"
      subtitle={isGerencia ? 'Aprobación de cobros' : 'Registro de cobranzas'}
    >
      <div className="stats-row">
        <div className="stat-card">
          <div className="value">{pendingCollections}</div>
          <div className="label">Cobros sin aprobar</div>
        </div>
        <div className="stat-card">
          <div className="value">{collections.length}</div>
          <div className="label">Total registrados</div>
        </div>
      </div>

      {canCreate && (
        <button type="button" className="btn btn-primary btn-block" style={{ marginBottom: 16 }}>
          {user?.role === 'cobrador' ? 'Nuevo recibo' : 'Nueva cobranza'}
        </button>
      )}

      <p className="list-item-meta" style={{ marginBottom: 12 }}>
        Los cobros inician sin aprobar. Gerencia verifica antes de marcar facturas como pagadas.
      </p>

      {collections.map((col) => (
        <div key={col.id} className="list-item">
          <div className="list-item-header">
            <div>
              <div className="list-item-title">{col.clientName}</div>
              <div className="list-item-meta">
                {col.id} · {col.date} · {col.collectorName}
              </div>
            </div>
            {paymentStatusBadge(col.status)}
          </div>
          <div className="list-item-amount">{formatCurrency(col.amount)}</div>
          {col.invoiceRef && (
            <div className="list-item-meta" style={{ marginTop: 4 }}>
              Factura: {col.invoiceRef}
            </div>
          )}
          {isGerencia && col.status === 'sin_aprobar' && (
            <button type="button" className="btn btn-primary btn-block" style={{ marginTop: 10 }}>
              Aprobar cobro
            </button>
          )}
        </div>
      ))}
    </PageLayout>
  );
}
