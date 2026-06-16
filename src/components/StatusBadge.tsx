type BadgeVariant = 'pending' | 'approved' | 'partial' | 'paid' | 'delivered' | 'return';

const variantClass: Record<BadgeVariant, string> = {
  pending: 'badge-pending',
  approved: 'badge-approved',
  partial: 'badge-partial',
  paid: 'badge-paid',
  delivered: 'badge-delivered',
  return: 'badge-return',
};

interface StatusBadgeProps {
  label: string;
  variant: BadgeVariant;
}

export function StatusBadge({ label, variant }: StatusBadgeProps) {
  return <span className={`badge ${variantClass[variant]}`}>{label}</span>;
}

export function orderStatusBadge(status: string) {
  const map: Record<string, { label: string; variant: BadgeVariant }> = {
    por_aprobar: { label: 'Por aprobar', variant: 'pending' },
    aprobado: { label: 'Aprobado', variant: 'approved' },
    facturado: { label: 'Facturado', variant: 'paid' },
    despachado: { label: 'Despachado', variant: 'delivered' },
  };
  const cfg = map[status] ?? { label: status, variant: 'pending' as BadgeVariant };
  return <StatusBadge label={cfg.label} variant={cfg.variant} />;
}

export function paymentStatusBadge(status: string) {
  const map: Record<string, { label: string; variant: BadgeVariant }> = {
    sin_aprobar: { label: 'Sin aprobar', variant: 'pending' },
    aprobado: { label: 'Aprobado', variant: 'approved' },
    parcial: { label: 'Abono parcial', variant: 'partial' },
  };
  const cfg = map[status] ?? { label: status, variant: 'pending' as BadgeVariant };
  return <StatusBadge label={cfg.label} variant={cfg.variant} />;
}

export function invoiceStatusBadge(status: string) {
  const map: Record<string, { label: string; variant: BadgeVariant }> = {
    por_cobrar: { label: 'Por cobrar', variant: 'pending' },
    parcial: { label: 'Abono parcial', variant: 'partial' },
    pagado: { label: 'Pagado', variant: 'paid' },
    pendiente: { label: 'Pendiente', variant: 'pending' },
    pagado_cp: { label: 'Pagado', variant: 'paid' },
  };
  const key = status === 'pagado' ? 'pagado' : status;
  const cfg = map[key] ?? { label: status, variant: 'pending' as BadgeVariant };
  return <StatusBadge label={cfg.label} variant={cfg.variant} />;
}

export function deliveryStatusBadge(status: string) {
  const map: Record<string, { label: string; variant: BadgeVariant }> = {
    pendiente: { label: 'Pendiente', variant: 'pending' },
    entregado: { label: 'Entregado', variant: 'delivered' },
    devolucion: { label: 'Devolución', variant: 'return' },
  };
  const cfg = map[status] ?? { label: status, variant: 'pending' as BadgeVariant };
  return <StatusBadge label={cfg.label} variant={cfg.variant} />;
}
