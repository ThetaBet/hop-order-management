import { ICustomer } from "../service/types"
import { getFooter, getHeader, getStyles } from "./baseTemplate"
import { EPageSize } from "./types"

const parseCustomerRow = (customer: ICustomer) => `
    <tr>
        <td class="code">${customer.customerCode}</td>
        <td class="nowrap-text">${customer.customerName}</td>
        <td class="nowrap-text">
          ${customer.address.street || ''} 
          ${customer.address.neighborhood || ''},
          ${customer.address.city || ''} 
          (${customer.address.provinceCode || ''}) 
          ${customer.address.zip || ''} 
          ${customer.address.country || ''}
        </td>
        <td class="nowrap-text">${customer.contact.phone || ''}${customer.contact.phoneAlt ? `, ${customer.contact.phoneAlt}` : ''}</td>
        <td class="nowrap-text">${customer.contact.mail || '-'}</td>
    </tr>
`

const getContent = (customers: ICustomer[]) => `
    <div class="content">
      <table>
        <thead>
          <tr>
            <th>Codice Cliente</th>
            <th>Nome Cliente</th>
            <th>Indirizzo</th>
            <th>N. Telefono</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          ${customers.map(parseCustomerRow).join('')}
        </tbody>
      </table>
    </div>
`

const getTableStyles = () => `
        th:nth-child(1), td:nth-child(1) { width: 20%; }
        th:nth-child(2), td:nth-child(2) { width: 10%; }
        th:nth-child(3), td:nth-child(3) { width: 40%; }
        th:nth-child(4), td:nth-child(4) { width: 15%; }
        th:nth-child(5), td:nth-child(5) { width: 15%; }
`

const getCustomersTemplate = (customers: ICustomer[]) => {
  return `
    <!DOCTYPE html>
    <html lang=it>
      <head>
        <style>
          ${getStyles(EPageSize.A4_LANDSCAPE)}
          ${getTableStyles()}
        </style>
      </head>
      <body>
        ${getHeader('Elenco clienti')}
        ${getContent(customers)}
        ${getFooter()}
      </body>
    </html>
  `
}

export default getCustomersTemplate