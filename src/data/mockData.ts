import type {
  Client,
  Collection,
  DeliveryStop,
  Order,
  Payable,
  Product,
  Receivable,
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

export const products: Product[] = [
  { id: 'p1', name: 'Polar Pilsen 12oz x24', sku: 'POL-PIL-24', unit: 'caja', price: 18.5 },
  { id: 'p2', name: 'Polar Light 12oz x24', sku: 'POL-LIG-24', unit: 'caja', price: 17.0 },
  { id: 'p3', name: 'Solera Light 12oz x24', sku: 'SOL-LIG-24', unit: 'caja', price: 15.5 },
  { id: 'p4', name: 'Budweiser 12oz x24', sku: 'BUD-24', unit: 'caja', price: 22.0 },
  { id: 'p5', name: 'Papelón con limón 2L x6', sku: 'PAP-LIM-6', unit: 'pack', price: 8.0 },
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
  { truckId: 't2', truckName: 'Camión 02 - Ruta B', productId: 'p4', quantity: 35 },
  { truckId: 't2', truckName: 'Camión 02 - Ruta B', productId: 'p5', quantity: 50 },
];

export const clients: Client[] = [
  { id: 'c1', name: 'Bodega El Progreso', address: 'Av. Principal #45', zone: 'Zona Norte', phone: '0414-555-0101', balance: 1250.0 },
  { id: 'c2', name: 'Licorería Central', address: 'Calle 5 con Carrera 8', zone: 'Zona Norte', phone: '0414-555-0102', balance: 890.5 },
  { id: 'c3', name: 'Minimarket La Esquina', address: 'Urbanización Los Olivos', zone: 'Zona Sur', phone: '0414-555-0103', balance: 0 },
  { id: 'c4', name: 'Restaurante Mar Azul', address: 'Malecón #12', zone: 'Zona Este', phone: '0414-555-0104', balance: 2100.0 },
  { id: 'c5', name: 'Bar El Rincón', address: 'Sector Industrial', zone: 'Zona Oeste', phone: '0414-555-0105', balance: 450.0 },
];

export const suppliers: Supplier[] = [
  { id: 's1', name: 'Cervecería Polar C.A.', phone: '0212-555-0001', balance: 45000.0 },
  { id: 's2', name: 'Distribuidora Andina', phone: '0212-555-0002', balance: 12800.0 },
  { id: 's3', name: 'Empaques del Centro', phone: '0212-555-0003', balance: 3200.0 },
];

export const collections: Collection[] = [
  { id: 'col1', clientId: 'c1', clientName: 'Bodega El Progreso', amount: 500.0, date: '2026-06-16', status: 'sin_aprobar', collectorId: 'u2', collectorName: 'María López' },
  { id: 'col2', clientId: 'c2', clientName: 'Licorería Central', amount: 890.5, date: '2026-06-15', status: 'aprobado', invoiceRef: 'FAC-2026-0142', collectorId: 'u2', collectorName: 'María López' },
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
    status: 'por_aprobar',
    collectionId: 'col1',
    items: [
      { productId: 'p1', productName: 'Polar Pilsen 12oz x24', quantity: 25, unitPrice: 18.5 },
      { productId: 'p2', productName: 'Polar Light 12oz x24', quantity: 10, unitPrice: 17.0 },
    ],
    total: 632.5,
  },
  {
    id: 'ped2',
    clientId: 'c3',
    clientName: 'Minimarket La Esquina',
    sellerId: 'u1',
    sellerName: 'Carlos Mendoza',
    date: '2026-06-15',
    status: 'aprobado',
    items: [
      { productId: 'p3', productName: 'Solera Light 12oz x24', quantity: 15, unitPrice: 15.5 },
    ],
    total: 232.5,
  },
  {
    id: 'ped3',
    clientId: 'c4',
    clientName: 'Restaurante Mar Azul',
    sellerId: 'u1',
    sellerName: 'Carlos Mendoza',
    date: '2026-06-16',
    status: 'por_aprobar',
    collectionId: 'col3',
    items: [
      { productId: 'p4', productName: 'Budweiser 12oz x24', quantity: 30, unitPrice: 22.0 },
      { productId: 'p5', productName: 'Papelón con limón 2L x6', quantity: 20, unitPrice: 8.0 },
    ],
    total: 820.0,
  },
];

export const receivables: Receivable[] = [
  { id: 'cx1', clientId: 'c1', clientName: 'Bodega El Progreso', invoiceNumber: 'FAC-2026-0138', total: 1250.0, paid: 500.0, status: 'parcial', dueDate: '2026-06-30' },
  { id: 'cx2', clientId: 'c2', clientName: 'Licorería Central', invoiceNumber: 'FAC-2026-0142', total: 890.5, paid: 890.5, status: 'pagado', dueDate: '2026-06-15' },
  { id: 'cx3', clientId: 'c4', clientName: 'Restaurante Mar Azul', invoiceNumber: 'FAC-2026-0145', total: 2100.0, paid: 0, status: 'por_cobrar', dueDate: '2026-07-15' },
  { id: 'cx4', clientId: 'c5', clientName: 'Bar El Rincón', invoiceNumber: 'FAC-2026-0140', total: 450.0, paid: 200.0, status: 'parcial', dueDate: '2026-06-25' },
];

export const payables: Payable[] = [
  { id: 'cp1', supplierId: 's1', supplierName: 'Cervecería Polar C.A.', invoiceNumber: 'POL-INV-8821', total: 45000.0, paid: 30000.0, status: 'parcial', dueDate: '2026-06-20' },
  { id: 'cp2', supplierId: 's2', supplierName: 'Distribuidora Andina', invoiceNumber: 'AND-4455', total: 12800.0, paid: 0, status: 'pendiente', dueDate: '2026-06-18' },
  { id: 'cp3', supplierId: 's3', supplierName: 'Empaques del Centro', invoiceNumber: 'EMP-1122', total: 3200.0, paid: 3200.0, status: 'pagado', dueDate: '2026-06-10' },
];

export const deliveryStops: DeliveryStop[] = [
  { id: 'd1', clientId: 'c1', clientName: 'Bodega El Progreso', address: 'Av. Principal #45', zone: 'Zona Norte', orderId: 'ped1', status: 'pendiente', items: '25 cajas Polar Pilsen, 10 cajas Polar Light' },
  { id: 'd2', clientId: 'c2', clientName: 'Licorería Central', address: 'Calle 5 con Carrera 8', zone: 'Zona Norte', orderId: 'ped2', status: 'pendiente', items: '15 cajas Solera Light' },
  { id: 'd3', clientId: 'c3', clientName: 'Minimarket La Esquina', address: 'Urbanización Los Olivos', zone: 'Zona Sur', orderId: 'ped2', status: 'entregado', items: '10 cajas Solera Light' },
  { id: 'd4', clientId: 'c4', clientName: 'Restaurante Mar Azul', address: 'Malecón #12', zone: 'Zona Este', orderId: 'ped3', status: 'pendiente', items: '30 cajas Budweiser, 20 packs Papelón' },
  { id: 'd5', clientId: 'c5', clientName: 'Bar El Rincón', address: 'Sector Industrial', zone: 'Zona Oeste', orderId: 'ped3', status: 'devolucion', items: '5 cajas Budweiser (devolución)' },
];

export const stockMovements: StockMovement[] = [
  { id: 'm1', date: '2026-06-16', type: 'transferencia', description: 'Carga camión Ruta A', from: 'Depósito', to: 'Camión 01', quantity: 180, productName: 'Polar Pilsen 12oz x24' },
  { id: 'm2', date: '2026-06-16', type: 'transferencia', description: 'Carga camión Ruta B', from: 'Depósito', to: 'Camión 02', quantity: 155, productName: 'Varios' },
  { id: 'm3', date: '2026-06-15', type: 'recepcion', description: 'Recepción factura POL-INV-8821', to: 'Depósito', quantity: 500, productName: 'Polar Pilsen 12oz x24' },
  { id: 'm4', date: '2026-06-14', type: 'ajuste', description: 'Ajuste por rotura', from: 'Depósito', quantity: -3, productName: 'Budweiser 12oz x24' },
];

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'USD' }).format(amount);
}

export function getProductName(productId: string): string {
  return products.find((p) => p.id === productId)?.name ?? 'Desconocido';
}
