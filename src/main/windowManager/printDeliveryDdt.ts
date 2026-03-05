import log from '../logger'
import { formatDateTimeForTitle } from '../print/utils'
import getDeliveryDdtTemplate from '../print/deliveryDdtTemplate'
import getGenericWindowForPrint from './getGenericWindowForPrint'
import { getGenericPrintOptions } from './config'

export const printDeliveryDdt = async (driverGroups: any[]) => {
  try {
    const printWindow = getGenericWindowForPrint()
    printWindow.setTitle(`ddt_consegne_${formatDateTimeForTitle(new Date())}`)
    const printHtml = getDeliveryDdtTemplate(driverGroups)
    await printWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(printHtml)}`)
    printWindow.webContents.print(getGenericPrintOptions(), (success, failureReason) => {
      if (success) {
        log.info('DDT print completed successfully')
      } else {
        log.error(`DDT print failed: ${failureReason}`)
      }
      printWindow.close()
    })

    return { success: true }
  } catch (error) {
    log.error('Error opening print delivery DDT window: ' + (error as string))
    return { success: false, error: error as string }
  }
}
