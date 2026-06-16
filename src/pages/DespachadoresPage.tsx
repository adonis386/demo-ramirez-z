import { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { AppIcon } from '../components/AppIcon';
import { icons } from '../icons';
import { deliveryStops } from '../data/mockData';
import { deliveryStatusBadge } from '../components/StatusBadge';

const pinPositions = [
  { top: '30%', left: '25%' },
  { top: '45%', left: '60%' },
  { top: '65%', left: '35%' },
  { top: '25%', left: '75%' },
  { top: '70%', left: '70%' },
];

export function DespachadoresPage() {
  const [zone, setZone] = useState('Todas');
  const zones = ['Todas', ...new Set(deliveryStops.map((d) => d.zone))];

  const filtered =
    zone === 'Todas' ? deliveryStops : deliveryStops.filter((d) => d.zone === zone);

  const pending = filtered.filter((d) => d.status === 'pendiente').length;
  const delivered = filtered.filter((d) => d.status === 'entregado').length;

  return (
    <PageLayout title="Despachadores" subtitle="Radar de entregas">
      <div className="stats-row">
        <div className="stat-card">
          <div className="value">{pending}</div>
          <div className="label">Pendientes</div>
        </div>
        <div className="stat-card">
          <div className="value">{delivered}</div>
          <div className="label">Entregados</div>
        </div>
      </div>

      <h2 className="section-title" style={{ marginTop: 0 }}>Radar</h2>
      <div className="radar-map">
        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
          Mapa de clientes en zona
        </span>
        {filtered.map((stop, i) => (
          <div
            key={stop.id}
            className={`radar-pin ${stop.status === 'entregado' ? 'delivered' : ''} ${stop.status === 'devolucion' ? 'return' : ''}`}
            style={pinPositions[i % pinPositions.length]}
            title={stop.clientName}
          />
        ))}
      </div>

      <div className="tabs" style={{ overflowX: 'auto' }}>
        {zones.map((z) => (
          <button
            key={z}
            type="button"
            className={`tab ${zone === z ? 'active' : ''}`}
            onClick={() => setZone(z)}
          >
            {z}
          </button>
        ))}
      </div>

      {filtered.map((stop) => (
        <div key={stop.id} className="list-item">
          <div className="list-item-header">
            <div>
              <div className="list-item-title">{stop.clientName}</div>
              <div className="list-item-meta list-item-meta--icon">
                <AppIcon icon={icons.location} size="xs" color="danger" />
                {stop.address} · {stop.zone}
              </div>
            </div>
            {deliveryStatusBadge(stop.status)}
          </div>
          <div className="list-item-meta">{stop.items}</div>
          <div className="list-item-meta" style={{ marginTop: 4 }}>
            Pedido: {stop.orderId}
          </div>
          {stop.status === 'pendiente' && (
            <button type="button" className="btn btn-primary btn-block" style={{ marginTop: 10 }}>
              Marcar entregado
            </button>
          )}
          {stop.status === 'pendiente' && (
            <button type="button" className="btn btn-outline btn-block" style={{ marginTop: 6 }}>
              Registrar devolución
            </button>
          )}
        </div>
      ))}
    </PageLayout>
  );
}
