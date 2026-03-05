import { IProduct } from '../service/types'
import { getFooter, getHeader, getStyles } from './baseTemplate'
import { calcGrossPrice, parseCurrencyForPrint, parsePercentageForPrint } from './utils'

const getTableStyles = () => `
        th:nth-child(1), td:nth-child(1) { width: 20%; } 
        th:nth-child(2), td:nth-child(2) { width: 25%; } 
        th:nth-child(3), td:nth-child(3) { width: 12%; } 
        th:nth-child(4), td:nth-child(4) { width: 12%; } 
        th:nth-child(5), td:nth-child(5) { width: 10%; } 
        th:nth-child(6), td:nth-child(6) { width: 12%; } 
        th:nth-child(7), td:nth-child(7) { width: 10%; } 
    `

const parseProductRow = (product: IProduct) => `
    <tr>
        <td class="code">${product.productCode}</td>
        <td class="nowrap-text">${product.productName}</td>
        <td class="nowrap-text">${product.category || ''}</td>
        <td class="currency">${parseCurrencyForPrint(product.netPrice)}</td>
        <td class="number">${parsePercentageForPrint(product.taxRate)}</td>
        <td class="currency">${parseCurrencyForPrint({ amount: calcGrossPrice(product.netPrice, product.taxRate), currencyCode: product.netPrice.currencyCode })}</td>
        <td>${product.supplier.supplierName || '-'}</td>
    </tr>
`

const getContent = (products: IProduct[]) => `
    <div class="content">
        <table>
            <thead>
                <tr>
                    <th>Codice Prodotto</th>
                    <th>Nome Prodotto</th>
                    <th>Categoria</th>
                    <th class="currency">Prezzo Netto</th>
                    <th class="number">A. IVA</th>
                    <th class="currency">Prezzo Lordo</th>
                    <th>Fornitore</th>
                </tr>
            </thead>
            <tbody>
                ${products.map(parseProductRow).join('')}
            </tbody>
        </table>
    </div>
`

const getProductTemplate = (products: IProduct[]) => `
    <!DOCTYPE html>
    <html lang="it">
        <head>
            <style>
                ${getStyles()}
                ${getTableStyles()}
            </style>
        </head>
        <body>
            ${getHeader('Distinta prodotti')}
            ${getContent(products)}
            ${getFooter()}
        </body>
    </html>
`

export default getProductTemplate
