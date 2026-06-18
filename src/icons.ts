import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowLeft,
  faBoxesStacked,
  faCartShopping,
  faTruck,
  faHandHoldingDollar,
  faFileInvoiceDollar,
  faClipboardList,
  faMoneyBillWave,
  faReceipt,
  faChartPie,
  faMapLocationDot,
  faTruckFast,
  faCircleCheck,
  faMoneyCheckDollar,
  faCreditCard,
  faWarehouse,
  faLocationDot,
  faMobileScreen,
  faBeerMugEmpty,
  faUsers,
  faRoute,
  faBoxOpen,
  faRotateLeft,
  faUser,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import type { IconColor } from './components/AppIcon';

export const icons = {
  arrowLeft: faArrowLeft,
  boxes: faBoxesStacked,
  cart: faCartShopping,
  truck: faTruck,
  handDollar: faHandHoldingDollar,
  invoice: faFileInvoiceDollar,
  clipboard: faClipboardList,
  money: faMoneyBillWave,
  receipt: faReceipt,
  chart: faChartPie,
  radar: faMapLocationDot,
  truckFast: faTruckFast,
  check: faCircleCheck,
  moneyCheck: faMoneyCheckDollar,
  creditCard: faCreditCard,
  warehouse: faWarehouse,
  location: faLocationDot,
  mobile: faMobileScreen,
  beer: faBeerMugEmpty,
  users: faUsers,
  route: faRoute,
  boxOpen: faBoxOpen,
  return: faRotateLeft,
  user: faUser,
  chevronRight: faChevronRight,
} as const satisfies Record<string, IconDefinition>;

export const moduleIcons: Record<
  string,
  { icon: IconDefinition; color: IconColor }
> = {
  inventario: { icon: icons.boxes, color: 'primary' },
  'mi-camion': { icon: icons.truckFast, color: 'primary' },
  vendedores: { icon: icons.cart, color: 'success' },
  despachadores: { icon: icons.truck, color: 'warning' },
  'cuentas-cobrar': { icon: icons.handDollar, color: 'info' },
  'cuentas-pagar': { icon: icons.invoice, color: 'accent' },
};

export const actionIcons: Record<
  string,
  { icon: IconDefinition; color: IconColor }
> = {
  nuevoPedido: { icon: icons.clipboard, color: 'primary' },
  nuevaCobranza: { icon: icons.money, color: 'success' },
  nuevoRecibo: { icon: icons.receipt, color: 'success' },
  cartera: { icon: icons.chart, color: 'info' },
  verRadar: { icon: icons.radar, color: 'warning' },
  miCamion: { icon: icons.truckFast, color: 'primary' },
  aprobarPedidos: { icon: icons.check, color: 'success' },
  aprobarCobros: { icon: icons.moneyCheck, color: 'info' },
  pagarProveedor: { icon: icons.creditCard, color: 'accent' },
};
