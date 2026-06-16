import { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { orders, collections } from '../data/mockData';
import { formatCurrency } from '../data/mockData';
import { orderStatusBadge, paymentStatusBadge } from '../components/StatusBadge';
import { useAuth } from '../context/AuthContext';

export function VendedoresPage() {
  const [tab, setTab] = useState<'pedidos' | 'cobranzas'>('pedidos');
  const { user } = useAuth();

  const pendingOrders = orders.filter((o) => o.status === 'por_aprobar').length;
  const pendingCollections = collections.filter((c) => c.status === 'sin_aprobar').length;

  return (
    <PageLayout
      title="Vendedores"
      subtitle="Pedidos y cobranzas"
    >
      <div className="stats-row">
        <div className="stat-card">
          <div className="value">{pendingOrders}</div>
          <div className="label">Pedidos por aprobar</div>
        </div>
        <div className="stat-card">
          <div className="value">{pendingCollections}</div>
          <div className="label">Cobros sin aprobar</div>
        </div>
      </div>

      <div className="tabs">
        <button
          type="button"
          className={`tab ${tab === 'pedidos' ? 'active' : ''}`}
          onClick={() => setTab('pedidos')}
        >
          Pedidos
        </button>
        <button
          type="button"
          className={`tab ${tab === 'cobranzas' ? 'active' : ''}`}
          onClick={() => setTab('cobranzas')}
        >
          Cobranzas
        </button>
      </div>

      {tab === 'pedidos' && (
        <>
          <p className="list-item-meta" style={{ marginBottom: 12 }}>
            Flujo: primero cobranza, luego pedido → envío a la nube con estado &quot;por aprobar&quot;
          </p>
          {orders.map((order) => (
            <div key={order.id} className="list-item">
              <div className="list-item-header">
                <div>
                  <div className="list-item-title">{order.clientName}</div>
                  <div className="list-item-meta">
                    {order.id} · {order.date} · {order.sellerName}
                  </div>
                </div>
                {orderStatusBadge(order.status)}
              </div>
              <div className="list-item-meta" style={{ marginBottom: 6 }}>
                {order.items.map((item) => (
                  <div key={item.productId}>
                    {item.quantity}x {item.productName}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="list-item-amount">{formatCurrency(order.total)}</span>
                {order.collectionId && (
                  <span className="list-item-meta">Cobro: {order.collectionId}</span>
                )}
              </div>
              {user?.role === 'gerencia' && order.status === 'por_aprobar' && (
                <button type="button" className="btn btn-primary btn-block" style={{ marginTop: 10 }}>
                  Aprobar y facturar
                </button>
              )}
            </div>
          ))}
        </>
      )}

      {tab === 'cobranzas' && (
        <>
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
              {user?.role === 'gerencia' && col.status === 'sin_aprobar' && (
                <button type="button" className="btn btn-primary btn-block" style={{ marginTop: 10 }}>
                  Aprobar cobro
                </button>
              )}
            </div>
          ))}
        </>
      )}
    </PageLayout>
  );
}
