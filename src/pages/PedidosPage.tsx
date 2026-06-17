import { PageLayout } from '../components/PageLayout';
import { orders, formatCurrency } from '../data/mockData';
import { orderStatusBadge } from '../components/StatusBadge';
import { useAuth } from '../context/AuthContext';

export function PedidosPage() {
  const { user } = useAuth();
  const pendingOrders = orders.filter((o) => o.status === 'por_aprobar').length;
  const isGerencia = user?.role === 'gerencia';

  return (
    <PageLayout title="Pedidos" subtitle={isGerencia ? 'Aprobación y seguimiento' : 'Registro de pedidos'}>
      <div className="stats-row">
        <div className="stat-card">
          <div className="value">{pendingOrders}</div>
          <div className="label">Pedidos por aprobar</div>
        </div>
        <div className="stat-card">
          <div className="value">{orders.length}</div>
          <div className="label">Total registrados</div>
        </div>
      </div>

      {user?.role === 'vendedor' && (
        <button type="button" className="btn btn-primary btn-block" style={{ marginBottom: 16 }}>
          Nuevo pedido
        </button>
      )}

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
          {isGerencia && order.status === 'por_aprobar' && (
            <button type="button" className="btn btn-primary btn-block" style={{ marginTop: 10 }}>
              Aprobar y facturar
            </button>
          )}
        </div>
      ))}
    </PageLayout>
  );
}
