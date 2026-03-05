import { getFooter, getHeader, getStyles } from './baseTemplate'
import { parseCurrencyForPrint } from './utils'

interface IDriverGroupForPrint {
  driverCode: string
  driverName: string
  phone?: string
  orders: any[]
  totalOrders: number
  deliveredCount: number
  pendingCount: number
}

const getTimeSlotLabel = (slot?: string) => {
  switch (slot) {
    case 'MORNING':
      return 'Mattina'
    case 'AFTERNOON':
      return 'Pomeriggio'
    case 'EVENING':
      return 'Sera'
    case 'NIGHT':
      return 'Notte'
    case 'BANK_HOLIDAY':
      return 'Festivo'
    default:
      return ''
  }
}

const getDdtStyles = () => `
  .driver-section {
    margin-bottom: 16px;
    page-break-inside: avoid;
  }
  .driver-header {
    background-color: #e1f5fe;
    padding: 8px 12px;
    border-radius: 6px;
    margin-bottom: 8px;
    border: 1px solid #b3e5fc;
  }
  .driver-header h3 {
    margin: 0;
    color: #01579b;
    font-size: 13pt;
  }
  .driver-header .driver-info {
    font-size: 9pt;
    color: #546e7a;
    margin-top: 2px;
  }
  .order-block {
    margin-bottom: 12px;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    padding: 8px;
    page-break-inside: avoid;
  }
  .order-header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 4px;
    margin-bottom: 6px;
    font-size: 9pt;
  }
  .order-header strong {
    color: #263238;
  }
  .order-header .customer-name {
    font-weight: 600;
    font-size: 10pt;
  }
  .order-header .address {
    color: #546e7a;
    font-size: 8pt;
  }
  .product-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 8pt;
  }
  .product-table th {
    background-color: #fafafa;
    text-align: left;
    padding: 3px 6px;
    border-bottom: 1px solid #e0e0e0;
    font-size: 8pt;
  }
  .product-table td {
    padding: 3px 6px;
    border-bottom: 1px dotted #eee;
  }
  .product-table td.qty {
    text-align: center;
    font-weight: 600;
  }
  .product-table td.price {
    text-align: right;
    font-family: 'Courier New', monospace;
  }
  .order-total {
    text-align: right;
    font-weight: 600;
    font-size: 9pt;
    padding-top: 4px;
    border-top: 1px solid #e0e0e0;
    margin-top: 4px;
  }
  .delivery-checkbox {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid #333;
    border-radius: 3px;
    vertical-align: middle;
    margin-right: 6px;
  }
  .summary-section {
    margin-top: 16px;
    padding: 8px 12px;
    border: 2px solid #000;
    border-radius: 8px;
  }
  .summary-section h3 {
    margin: 0 0 8px 0;
    font-size: 11pt;
  }
  .summary-table {
    width: 100%;
    font-size: 9pt;
    border-collapse: collapse;
  }
  .summary-table th, .summary-table td {
    padding: 4px 8px;
    border: none;
    border-bottom: 1px dotted #ccc;
  }
  .summary-table th {
    text-align: left;
    font-weight: 600;
  }
  .summary-table td.number {
    text-align: right;
    font-family: 'Courier New', monospace;
  }
  .timeslot-group {
    margin-bottom: 12px;
  }
  .timeslot-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f5f5f5;
    padding: 5px 10px;
    border-radius: 4px;
    margin-bottom: 6px;
    border-left: 3px solid #0288d1;
    font-size: 10pt;
    font-weight: 600;
    color: #263238;
  }
  .timeslot-count {
    font-size: 8pt;
    font-weight: 400;
    color: #546e7a;
  }
`

const TIME_SLOT_ORDER: Record<string, number> = {
  MORNING: 0,
  AFTERNOON: 1,
  EVENING: 2,
  NIGHT: 3,
  BANK_HOLIDAY: 4
}

const TIME_SLOT_ICONS: Record<string, string> = {
  MORNING: '🌅',
  AFTERNOON: '☀️',
  EVENING: '🌇',
  NIGHT: '🌙',
  BANK_HOLIDAY: '📅'
}

const getOrderBlock = (order: any): string => {
  const items = (order as any).items || []
  const productsHtml = items.length > 0
    ? items
        .map(
          (item: any) => `
      <tr>
        <td>${item.product?.productCode || '-'}</td>
        <td>${item.product?.productName || '-'}</td>
        <td class="qty">${item.quantity}</td>
        <td class="price">${parseCurrencyForPrint(item.unitPrice)}</td>
        <td class="price">${parseCurrencyForPrint(item.totalGrossPrice)}</td>
      </tr>
    `
        )
        .join('')
    : `<tr><td colspan="5" style="text-align:center; color:#999;">Nessun prodotto</td></tr>`

  return `
    <div class="order-block">
      <div class="order-header">
        <div>
          <span class="customer-name">${order.customer?.customerName || '-'}</span>
          <span style="margin-left: 12px; color: #999;">Ordine #${order.orderNumber}</span>
        </div>
        <div>
          <span class="delivery-checkbox"></span>
          Consegnato
        </div>
      </div>
      <div class="address">
        📍 ${order.delivery?.deliveryAddress || 'Indirizzo non disponibile'}
      </div>
      <table class="product-table" style="margin-top: 6px;">
        <thead>
          <tr>
            <th style="width: 15%">Codice</th>
            <th style="width: 40%">Prodotto</th>
            <th style="width: 10%; text-align: center">Qtà</th>
            <th style="width: 15%; text-align: right">Prezzo Un.</th>
            <th style="width: 20%; text-align: right">Totale</th>
          </tr>
        </thead>
        <tbody>
          ${productsHtml}
        </tbody>
      </table>
      <div class="order-total">
        Totale: ${parseCurrencyForPrint(order.totalAmount)}
      </div>
    </div>
  `
}

const groupOrdersByTimeSlot = (orders: any[]): Map<string, any[]> => {
  const groups = new Map<string, any[]>()

  orders.forEach((order) => {
    const slot = order.delivery?.timeSlot || 'NO_SLOT'
    if (!groups.has(slot)) {
      groups.set(slot, [])
    }
    groups.get(slot)!.push(order)
  })

  // Ordina per fascia oraria
  const sorted = new Map(
    [...groups.entries()].sort(([a], [b]) => {
      const orderA = TIME_SLOT_ORDER[a] ?? 99
      const orderB = TIME_SLOT_ORDER[b] ?? 99
      return orderA - orderB
    })
  )

  return sorted
}

const getDriverSection = (group: IDriverGroupForPrint): string => {
  const slotGroups = groupOrdersByTimeSlot(group.orders)

  const slotSectionsHtml = [...slotGroups.entries()]
    .map(([slot, orders]) => {
      const label = slot === 'NO_SLOT' ? 'Senza fascia oraria' : getTimeSlotLabel(slot)
      const icon = slot === 'NO_SLOT' ? '📦' : (TIME_SLOT_ICONS[slot] || '📦')

      const ordersHtml = orders.map((order) => getOrderBlock(order)).join('')

      return `
        <div class="timeslot-group">
          <div class="timeslot-header">
            <span>${icon} ${label}</span>
            <span class="timeslot-count">${orders.length} ordin${orders.length === 1 ? 'e' : 'i'}</span>
          </div>
          ${ordersHtml}
        </div>
      `
    })
    .join('')

  return `
    <div class="driver-section">
      <div class="driver-header">
        <h3>🚚 ${group.driverName}</h3>
        <div class="driver-info">
          ${group.phone ? `Tel: ${group.phone} · ` : ''}${group.totalOrders} ordin${group.totalOrders === 1 ? 'e' : 'i'} · 
          ${group.deliveredCount} consegnat${group.deliveredCount === 1 ? 'o' : 'i'} · 
          ${group.pendingCount} in attesa
        </div>
      </div>
      ${slotSectionsHtml}
    </div>
  `
}

const getSummary = (groups: IDriverGroupForPrint[]): string => {
  const totalOrders = groups.reduce((acc, g) => acc + g.totalOrders, 0)
  const totalDelivered = groups.reduce((acc, g) => acc + g.deliveredCount, 0)

  const rows = groups
    .map(
      (g) => `
    <tr>
      <td>${g.driverName}</td>
      <td class="number">${g.totalOrders}</td>
      <td class="number">${g.deliveredCount}</td>
      <td class="number">${g.pendingCount}</td>
    </tr>
  `
    )
    .join('')

  return `
    <div class="summary-section">
      <h3>Riepilogo Consegne</h3>
      <table class="summary-table">
        <thead>
          <tr>
            <th>Autista</th>
            <th style="text-align: right">Totale</th>
            <th style="text-align: right">Consegnati</th>
            <th style="text-align: right">In Attesa</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
          <tr style="border-top: 2px solid #000; font-weight: 700;">
            <td><strong>TOTALE</strong></td>
            <td class="number"><strong>${totalOrders}</strong></td>
            <td class="number"><strong>${totalDelivered}</strong></td>
            <td class="number"><strong>${totalOrders - totalDelivered}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  `
}

const getDeliveryDdtTemplate = (
  groups: IDriverGroupForPrint[],
  date?: string
): string => {
  const dateStr =
    date ||
    new Date().toLocaleDateString('it-IT', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

  const driverSections = groups.map((g) => getDriverSection(g)).join('')

  return `
  <!DOCTYPE html>
  <html lang="it">
    <head>
      <meta charset="UTF-8">
      <style>
        ${getStyles()}
        ${getDdtStyles()}
      </style>
    </head>
    <body>
      ${getHeader(`DDT Consegne - ${dateStr}`)}
      <div class="content">
        ${driverSections}
      </div>
      ${getSummary(groups)}
      ${getFooter()}
    </body>
  </html>
  `
}

export default getDeliveryDdtTemplate
