# Ramirez Z C.A — Demo PWA

Sistema administrativo móvil para despacho de cervezas.

## Módulos

- **Inventario** — Depósito, camiones y movimientos de stock
- **Vendedores** — Pedidos y cobranzas (flujo: cobro → pedido → aprobación)
- **Despachadores** — Radar de entregas por zona
- **Cuentas por Cobrar** — Facturas con soporte de abonos parciales
- **Cuentas por Pagar** — Proveedores y pagos

## Roles

| Rol | Acceso |
|-----|--------|
| Vendedor | Inventario, Vendedores, CxC |
| Cobrador | Vendedores, CxC |
| Despachador | Inventario, Despachadores |
| Gerencia Administrativa | Todos los módulos + aprobaciones |

## Desarrollo

```bash
npm install
npm run dev
```

Abrir http://localhost:5173

## Build PWA

```bash
npm run build
npm run preview
```
