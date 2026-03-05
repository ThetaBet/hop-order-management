import log from '../logger'
import { IProduct } from '../service/types'
import { formatDateTimeForTitle } from '../print/utils'
import getProductTemplate from '../print/productTemplate'
import getGenericWindowForPrint from './getGenericWindowForPrint'
import { getGenericPrintOptions } from './config'



export const printProducts = async (products: IProduct[]) => {
  try {
    const printWindow = getGenericWindowForPrint()
    printWindow.setTitle(`distinta_prodotti_${formatDateTimeForTitle(new Date())}`)
    const printHtml = getProductTemplate(products)
    await printWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(printHtml)}`)
    printWindow.webContents.print(getGenericPrintOptions(), (success, failureReason) => {
      if (success) {
        log.info('Print completed successfully')
      } else {
        log.error(`Print failed: ${failureReason}`)
      }
      printWindow.close()
    })

    return { success: true }
  } catch (error) {
    log.error('Error opening print products window: ' + (error as string))
    return { success: false, error: error as string }
  }
}
