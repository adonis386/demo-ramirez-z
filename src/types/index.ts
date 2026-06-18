export type Role = 'vendedor' | 'cobrador' | 'despachador' | 'gerencia';

export type OrderStatus = 'sin_nota_despacho' | 'con_nota_despacho' | 'despachado';
export type PaymentStatus = 'sin_aprobar' | 'aprobado' | 'parcial';
export type InvoiceStatus = 'por_cobrar' | 'parcial' | 'pagado';

export interface User {
  id: string;
  name: string;
  role: Role;
  zone?: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  unit: string;
  price: number;
}

export interface WarehouseStock {
  productId: string;
  quantity: number;
}

export interface TruckStock {
  truckId: string;
  truckName: string;
  productId: string;
  quantity: number;
}

export interface Client {
  id: string;
  name: string;
  address: string;
  zone: string;
  phone: string;
  balance: number;
}

export interface Supplier {
  id: string;
  name: string;
  legalName: string;
  phone: string;
  balance: number;
}

export interface Collection {
  id: string;
  clientId: string;
  clientName: string;
  amount: number;
  date: string;
  status: PaymentStatus;
  noteRef?: string;
  collectorId: string;
  collectorName: string;
}

export interface Order {
  id: string;
  clientId: string;
  clientName: string;
  sellerId: string;
  sellerName: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  collectionId?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface DispatchNote {
  id: string;
  clientId: string;
  clientName: string;
  noteNumber: string;
  orderId?: string;
  total: number;
  paid: number;
  status: InvoiceStatus;
  dueDate: string;
  date: string;
}

export interface Payable {
  id: string;
  supplierId: string;
  supplierName: string;
  invoiceNumber: string;
  total: number;
  paid: number;
  status: 'pendiente' | 'parcial' | 'pagado';
  dueDate: string;
}

export interface DeliveryStop {
  id: string;
  clientId: string;
  clientName: string;
  address: string;
  zone: string;
  orderId: string;
  status: 'pendiente' | 'entregado' | 'devolucion';
  items: string;
}

export interface StockMovement {
  id: string;
  date: string;
  type: 'transferencia' | 'ajuste' | 'recepcion';
  description: string;
  from?: string;
  to?: string;
  quantity: number;
  productName: string;
}
