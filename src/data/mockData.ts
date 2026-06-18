import type {
  Client,
  Collection,
  DeliveryStop,
  DispatchNote,
  Order,
  Payable,
  Product,
  StockMovement,
  Supplier,
  TruckStock,
  User,
  WarehouseStock,
} from '../types';

export const users: User[] = [
  { id: 'u1', name: 'Carlos Mendoza', role: 'vendedor', zone: 'Zona Norte' },
  { id: 'u2', name: 'María López', role: 'cobrador', zone: 'Zona Norte' },
  { id: 'u3', name: 'José Ramírez', role: 'despachador', zone: 'Ruta A' },
  { id: 'u4', name: 'Yohan Ramirez', role: 'gerencia' },
];

/** Catálogo AUTOVENTA NACIONAL — productos Zulia (Cervecería Regional) */
export const products: Product[] = [
  { id: 'p1', name: 'Zulia 222 ml Retornable', sku: '1086', unit: 'caja', price: 23.0 },
  { id: 'p2', name: 'Zulia 250 ml No Retornable', sku: '1116', unit: 'caja', price: 23.38 },
  { id: 'p3', name: 'Zulia 295 ml Lata', sku: '1187', unit: 'caja', price: 22.43 },
  { id: 'p4', name: 'Zulia 250 ml Ed. Limitada', sku: '1389', unit: 'caja', price: 23.38 },
  { id: 'p5', name: 'Zulia 295 ml Ed. Limitada Lata', sku: '1380', unit: 'caja', price: 22.43 },
];

export const warehouseStock: WarehouseStock[] = [
  { productId: 'p1', quantity: 450 },
  { productId: 'p2', quantity: 320 },
  { productId: 'p3', quantity: 280 },
  { productId: 'p4', quantity: 150 },
  { productId: 'p5', quantity: 200 },
];

export const truckStock: TruckStock[] = [
  { truckId: 't1', truckName: 'Camión 01 - Ruta A', productId: 'p1', quantity: 80 },
  { truckId: 't1', truckName: 'Camión 01 - Ruta A', productId: 'p2', quantity: 60 },
  { truckId: 't1', truckName: 'Camión 01 - Ruta A', productId: 'p3', quantity: 40 },
  { truckId: 't2', truckName: 'Camión 02 - Ruta B', productId: 'p1', quantity: 70 },
  { truckId: 't2', truckName: 'Camión 02 - Ruta B', productId: 'p3', quantity: 35 },
  { truckId: 't2', truckName: 'Camión 02 - Ruta B', productId: 'p4', quantity: 50 },
];

export const clients: Client[] = [
  { id: 'c1', name: 'Bodega El Progreso', address: 'Av. Principal #45', zone: 'Zona Norte', phone: '0414-555-0101', balance: 750.0 },
  { id: 'c2', name: 'Licorería Central', address: 'Calle 5 con Carrera 8', zone: 'Zona Norte', phone: '0414-555-0102', balance: 0 },
  { id: 'c3', name: 'Minimarket La Esquina', address: 'Urbanización Los Olivos', zone: 'Zona Sur', phone: '0414-555-0103', balance: 0 },
  { id: 'c4', name: 'Restaurante Mar Azul', address: 'Malecón #12', zone: 'Zona Este', phone: '0414-555-0104', balance: 2100.0 },
  { id: 'c5', name: 'Bar El Rincón', address: 'Sector Industrial', zone: 'Zona Oeste', phone: '0414-555-0105', balance: 250.0 },
];

/** Proveedor único: La Regional — razón social Cervecería Regional C.A. */
export const suppliers: Supplier[] = [
  {
    id: 's1',
    name: 'La Regional',
    legalName: 'Cervecería Regional C.A.',
    phone: '0212-555-0001',
    balance: 45000.0,
  },
];

export const collections: Collection[] = [
  { id: 'col1', clientId: 'c1', clientName: 'Bodega El Progreso', amount: 500.0, date: '2026-06-16', status: 'sin_aprobar', collectorId: 'u2', collectorName: 'María López' },
  { id: 'col2', clientId: 'c2', clientName: 'Licorería Central', amount: 890.5, date: '2026-06-15', status: 'aprobado', noteRef: 'ND-2026-0142', collectorId: 'u2', collectorName: 'María López' },
  { id: 'col3', clientId: 'c4', clientName: 'Restaurante Mar Azul', amount: 1000.0, date: '2026-06-16', status: 'sin_aprobar', collectorId: 'u2', collectorName: 'María López' },
];

export const orders: Order[] = [
  {
    id: 'ped1',
    clientId: 'c1',
    clientName: 'Bodega El Progreso',
    sellerId: 'u1',
    sellerName: 'Carlos Mendoza',
    date: '2026-06-16',
    status: 'sin_nota_despacho',
    collectionId: 'col1',
    items: [
      { productId: 'p1', productName: 'Zulia 222 ml Retornable', quantity: 25, unitPrice: 23.0 },
      { productId: 'p2', productName: 'Zulia 250 ml No Retornable', quantity: 10, unitPrice: 23.38 },
    ],
    total: 808.8,
  },
  {
    id: 'ped2',
    clientId: 'c3',
    clientName: 'Minimarket La Esquina',
    sellerId: 'u1',
    sellerName: 'Carlos Mendoza',
    date: '2026-06-15',
    status: 'con_nota_despacho',
    items: [
      { productId: 'p3', productName: 'Zulia 295 ml Lata', quantity: 15, unitPrice: 22.43 },
    ],
    total: 336.45,
  },
  {
    id: 'ped3',
    clientId: 'c4',
    clientName: 'Restaurante Mar Azul',
    sellerId: 'u1',
    sellerName: 'Carlos Mendoza',
    date: '2026-06-16',
    status: 'sin_nota_despacho',
    collectionId: 'col3',
    items: [
      { productId: 'p3', productName: 'Zulia 295 ml Lata', quantity: 30, unitPrice: 22.43 },
      { productId: 'p4', productName: 'Zulia 250 ml Ed. Limitada', quantity: 20, unitPrice: 23.38 },
    ],
    total: 1140.5,
  },
];

export const dispatchNotes: DispatchNote[] = [
  { id: 'nd1', clientId: 'c1', clientName: 'Bodega El Progreso', noteNumber: 'ND-2026-0138', orderId: 'ped0', total: 1250.0, paid: 500.0, status: 'parcial', dueDate: '2026-06-30', date: '2026-06-01' },
  { id: 'nd2', clientId: 'c2', clientName: 'Licorería Central', noteNumber: 'ND-2026-0142', total: 890.5, paid: 890.5, status: 'pagado', dueDate: '2026-06-15', date: '2026-06-10' },
  { id: 'nd3', clientId: 'c4', clientName: 'Restaurante Mar Azul', noteNumber: 'ND-2026-0145', total: 2100.0, paid: 0, status: 'por_cobrar', dueDate: '2026-07-15', date: '2026-06-12' },
  { id: 'nd4', clientId: 'c5', clientName: 'Bar El Rincón', noteNumber: 'ND-2026-0140', total: 450.0, paid: 200.0, status: 'parcial', dueDate: '2026-06-25', date: '2026-06-08' },
];

export const payables: Payable[] = [
  { id: 'cp1', supplierId: 's1', supplierName: 'Cervecería Regional C.A.', invoiceNumber: 'REG-INV-8821', total: 45000.0, paid: 30000.0, status: 'parcial', dueDate: '2026-06-20' },
  { id: 'cp2', supplierId: 's1', supplierName: 'Cervecería Regional C.A.', invoiceNumber: 'REG-4455', total: 12800.0, paid: 0, status: 'pendiente', dueDate: '2026-06-18' },
];

export const deliveryStops: DeliveryStop[] = [
  { id: 'd1', clientId: 'c1', clientName: 'Bodega El Progreso', address: 'Av. Principal #45', zone: 'Zona Norte', orderId: 'ped1', status: 'pendiente', items: '25 cajas Zulia 222ml, 10 cajas Zulia 250ml' },
  { id: 'd2', clientId: 'c2', clientName: 'Licorería Central', address: 'Calle 5 con Carrera 8', zone: 'Zona Norte', orderId: 'ped2', status: 'pendiente', items: '15 cajas Zulia 295ml Lata' },
  { id: 'd3', clientId: 'c3', clientName: 'Minimarket La Esquina', address: 'Urbanización Los Olivos', zone: 'Zona Sur', orderId: 'ped2', status: 'entregado', items: '15 cajas Zulia 295ml Lata' },
  { id: 'd4', clientId: 'c4', clientName: 'Restaurante Mar Azul', address: 'Malecón #12', zone: 'Zona Este', orderId: 'ped3', status: 'pendiente', items: '30 cajas Zulia 295ml, 20 cajas Zulia Ed. Limitada' },
  { id: 'd5', clientId: 'c5', clientName: 'Bar El Rincón', address: 'Sector Industrial', zone: 'Zona Oeste', orderId: 'ped3', status: 'devolucion', items: '5 cajas Zulia 295ml (devolución)' },
];

export const stockMovements: StockMovement[] = [
  { id: 'm1', date: '2026-06-16', type: 'transferencia', description: 'Carga camión Ruta A', from: 'Depósito', to: 'Camión 01', quantity: 180, productName: 'Zulia 222 ml Retornable' },
  { id: 'm2', date: '2026-06-16', type: 'transferencia', description: 'Carga camión Ruta B', from: 'Depósito', to: 'Camión 02', quantity: 155, productName: 'Varios Zulia' },
  { id: 'm3', date: '2026-06-15', type: 'recepcion', description: 'Recepción REG-INV-8821', to: 'Depósito', quantity: 500, productName: 'Zulia 222 ml Retornable' },
  { id: 'm4', date: '2026-06-14', type: 'ajuste', description: 'Ajuste por rotura', from: 'Depósito', quantity: -3, productName: 'Zulia 295 ml Lata' },
];

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'USD' }).format(amount);
}

export function getProductName(productId: string): string {
  return products.find((p) => p.id === productId)?.name ?? 'Desconocido';
}

export function getClientDebt(clientId: string): number {
  return dispatchNotes
    .filter((n) => n.clientId === clientId && n.status !== 'pagado')
    .reduce((sum, n) => sum + (n.total - n.paid), 0);
}

export function getClientsWithDebt(): Client[] {
  return clients.filter((c) => getClientDebt(c.id) > 0);
}

export function getPendingNotesByClient(clientId: string): DispatchNote[] {
  return dispatchNotes.filter(
    (n) => n.clientId === clientId && n.status !== 'pagado',
  );
}
