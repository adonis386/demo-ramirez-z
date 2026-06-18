import { PageLayout } from '../components/PageLayout';
import { AppIcon } from '../components/AppIcon';
import { icons } from '../icons';
import { truckStock, getProductName } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

export function MiCamionPage() {
  const { user } = useAuth();
  const trucks = [...new Set(truckStock.map((t) => t.truckId))];
  const truckName = user?.zone ? `Camión - ${user.zone}` : trucks[0] ? truckStock.find((t) => t.truckId === trucks[0])?.truckName : 'Mi Camión';

  const items = user?.role === 'despachador'
    ? truckStock.filter((t) => t.truckId === 't1')
    : truckStock.filter((t) => t.truckId === 't1');

  return (
    <PageLayout title="Mi Camión" subtitle={truckName ?? 'Inventario del camión'}>
      <div className="card">
        <div className="truck-header">
          <AppIcon icon={icons.truckFast} size="sm" color="warning" />
          {items[0]?.truckName ?? truckName}
        </div>
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
    </PageLayout>
  );
}
