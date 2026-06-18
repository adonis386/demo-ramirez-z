import { useParams, useNavigate } from 'react-router-dom';
import { PageLayout } from '../components/PageLayout';
import {
  clients,
  getClientDebt,
  getPendingNotesByClient,
  formatCurrency,
} from '../data/mockData';
import { noteStatusBadge } from '../components/StatusBadge';
import { useAuth } from '../context/AuthContext';

export function ClienteCuentaPage() {
  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const client = clients.find((c) => c.id === clientId);
  const notes = clientId ? getPendingNotesByClient(clientId) : [];
  const totalDebt = clientId ? getClientDebt(clientId) : 0;

  if (!client) {
    return (
      <PageLayout title="Cliente no encontrado">
        <button type="button" className="btn btn-outline btn-block" onClick={() => navigate('/cuentas-cobrar')}>
          Volver
        </button>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={client.name} subtitle="Notas de despacho pendientes">
      <div className="stat-card" style={{ marginBottom: 16 }}>
        <div className="value">{formatCurrency(totalDebt)}</div>
        <div className="label">Deuda total pendiente</div>
      </div>

      <p className="list-item-meta" style={{ marginBottom: 12 }}>
        {client.address} · {client.zone}
      </p>

      {notes.length === 0 ? (
        <div className="empty-state">
          <p>Sin notas de despacho pendientes</p>
        </div>
      ) : (
        notes.map((note) => {
          const pending = note.total - note.paid;
          const pct = note.total > 0 ? (note.paid / note.total) * 100 : 0;

          return (
            <div key={note.id} className="list-item">
              <div className="list-item-header">
                <div>
                  <div className="list-item-title">Nota {note.noteNumber}</div>
                  <div className="list-item-meta">
                    {note.date} · Vence: {note.dueDate}
                  </div>
                </div>
                {noteStatusBadge(note.status)}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span className="list-item-meta">Monto: {formatCurrency(note.total)}</span>
                <span className="list-item-meta">Pagado: {formatCurrency(note.paid)}</span>
              </div>

              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${pct}%` }} />
              </div>

              <div className="list-item-amount" style={{ marginTop: 8 }}>
                Pendiente: {formatCurrency(pending)}
              </div>

              {(user?.role === 'gerencia' || user?.role === 'cobrador') && (
                <button type="button" className="btn btn-primary btn-block" style={{ marginTop: 10 }}>
                  Registrar abono
                </button>
              )}
            </div>
          );
        })
      )}
    </PageLayout>
  );
}
