import { ICustomer } from "../service/types"
import { getFooter, getHeader, getStyles } from "./baseTemplate"

const getContent = (customer: ICustomer) => `
    <div class="content">
      <h2>Informazioni Cliente</h2>
      <p><strong>Codice Cliente:</strong> ${customer.customerCode}</p>
      <p><strong>Nome Cliente:</strong> ${customer.customerName}</p>
      <h3>Indirizzo</h3>
      <p>
        ${customer.address.street || ''} <br/>
        ${customer.address.neighborhood || ''} <br/>
        ${customer.address.city || ''} (${customer.address.provinceCode || ''}) <br/>
        ${customer.address.zip || ''} <br/>
        ${customer.address.country || ''}
      </p>
      <h3>Contatti</h3>
      <p><strong>Telefono:</strong> ${customer.contact.phone || ''}${customer.contact.phoneAlt ? `, ${customer.contact.phoneAlt}` : ''}</p>
      <p><strong>Email:</strong> ${customer.contact.mail || '-'}</p>
      <p><strong>Note:</strong> ${customer.notes || '-'}</p>
    </div>
`

const getCustomerDetailsTemplate = (customer: ICustomer) => `
    <!DOCTYPE html>
    <html lang=it>
      <head>
        ${getStyles()}
      </head>
      <body>
        ${getHeader(`Dettagli cliente: ${customer.customerName}`)}
        ${getContent(customer)}
        ${getFooter()}
      </body>
    </html>
`

export default getCustomerDetailsTemplate