import { PageLayout } from '../components/PageLayout';
import { orders, formatCurrency } from '../data/mockData';
import { orderStatusBadge } from '../components/StatusBadge';
import { useAuth } from '../context/AuthContext';

export function PedidosPage() {
  const { user } = useAuth();
  const sinNota = orders.filter((o) => o.status === 'sin_nota_despacho').length;
  const canEmitNote = user?.role === 'gerencia' || user?.role === 'vendedor';

  return (
    <PageLayout title="Pedidos" subtitle="Gestión de pedidos y notas de despacho">
      <div className="stats-row">
        <div className="stat-card">
          <div className="value">{sinNota}</div>
          <div className="label">Pedidos sin Notas de Despacho</div>
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
        Flujo: primero cobranza, luego pedido → emitir nota de despacho para entregar mercancía.
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
          {canEmitNote && order.status === 'sin_nota_despacho' && (
            <button type="button" className="btn btn-primary btn-block" style={{ marginTop: 10 }}>
              Emitir Nota de Despacho
            </button>
          )}
        </div>
      ))}
    </PageLayout>
  );
}
