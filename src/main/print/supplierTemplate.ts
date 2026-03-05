import { ISupplier } from "../service/types"
import { getFooter, getHeader, getStyles } from "./baseTemplate"

const getTableStyles = () => `
        th:nth-child(1), td:nth-child(1) { width: 20%; } 
        th:nth-child(2), td:nth-child(2) { width: 25%; } 
        th:nth-child(3), td:nth-child(3) { width: 15%; } 
        th:nth-child(4), td:nth-child(4) { width: 15%; }
        th:nth-child(5), td:nth-child(5) { width: 25%; } 
    `

const parseSupplierRow = (supplier: ISupplier) => `
    <tr>
        <td class="code">${supplier.supplierCode}</td>
        <td class="nowrap-text">${supplier.supplierName}</td>
        <td class="nowrap-text">${supplier.payment.paymentForm || '-'}</td>
        <td class="nowrap-text">${supplier.payment.paymentTerms || '-'}</td>
        <td class="nowrap-text">${supplier.notes || ''}</td>
    </tr>
`

const getContent = (suppliers: ISupplier[]) => `
    <div class="content">
        <table>
            <thead>
                <tr>
                    <th>Codice fornitore</th>
                    <th>Nome fornitore</th>
                    <th>Forma di pagamento</th>
                    <th>Termini di pagamento</th>
                    <th>Note</th>
                </tr>
            </thead>
            <tbody>
                ${suppliers.map(parseSupplierRow).join('')}
            </tbody>
        </table>
    </div>
`

const getSupplierTemplate = (suppliers: ISupplier[]) => `
    <!DOCTYPE html>
    <html lang="it">
        <head>
            <style>
                ${getStyles()}
                ${getTableStyles()}
            </style>
        </head>
        <body>
            ${getHeader('Distinta fornitori')}
            ${getContent(suppliers)}
            ${getFooter()}
        </body>
    </html>
`
export default getSupplierTemplate