import { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { AppIcon } from '../components/AppIcon';
import { icons } from '../icons';
import {
  products,
  warehouseStock,
  truckStock,
  stockMovements,
  getProductName,
} from '../data/mockData';

export function InventarioPage() {
  const [tab, setTab] = useState<'deposito' | 'camiones' | 'movimientos'>('deposito');

  const trucks = [...new Set(truckStock.map((t) => t.truckId))];

  return (
    <PageLayout title="Inventario" subtitle="Depósito y camiones">
      <div className="tabs">
        <button
          type="button"
          className={`tab ${tab === 'deposito' ? 'active' : ''}`}
          onClick={() => setTab('deposito')}
        >
          Depósito
        </button>
        <button
          type="button"
          className={`tab ${tab === 'camiones' ? 'active' : ''}`}
          onClick={() => setTab('camiones')}
        >
          Camiones
        </button>
        <button
          type="button"
          className={`tab ${tab === 'movimientos' ? 'active' : ''}`}
          onClick={() => setTab('movimientos')}
        >
          Movimientos
        </button>
      </div>

      {tab === 'deposito' && (
        <div className="card">
          <table className="stock-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th style={{ textAlign: 'right' }}>Stock</th>
              </tr>
            </thead>
            <tbody>
              {warehouseStock.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                return (
                  <tr key={item.productId}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{product?.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        {product?.sku}
                      </div>
                    </td>
                    <td className="qty">
                      {item.quantity} {product?.unit ?? ''}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'camiones' && (
        <>
          {trucks.map((truckId) => {
            const items = truckStock.filter((t) => t.truckId === truckId);
            const truckName = items[0]?.truckName ?? truckId;
            return (
              <div key={truckId} className="truck-section">
                <div className="truck-header">
                  <AppIcon icon={icons.truckFast} size="xs" color="warning" />
                  {truckName}
                </div>
                <div className="card">
                  <table className="stock-table">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th style={{ textAlign: 'right' }}>Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={`${item.truckId}-${item.productId}`}>
                          <td>{getProductName(item.productId)}</td>
                          <td className="qty">{item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </>
      )}

      {tab === 'movimientos' && (
        <>
          {stockMovements.map((mov) => (
            <div key={mov.id} className="list-item">
              <div className="list-item-header">
                <div>
                  <div className="list-item-title">{mov.description}</div>
                  <div className="list-item-meta">{mov.date}</div>
                </div>
                <span className={`badge badge-${mov.type === 'ajuste' ? 'return' : 'approved'}`}>
                  {mov.type}
                </span>
              </div>
              <div className="list-item-meta">
                {mov.productName} · {mov.quantity > 0 ? '+' : ''}{mov.quantity}
                {mov.from && ` · ${mov.from}`}
                {mov.to && ` → ${mov.to}`}
              </div>
            </div>
          ))}
        </>
      )}
    </PageLayout>
  );
}
