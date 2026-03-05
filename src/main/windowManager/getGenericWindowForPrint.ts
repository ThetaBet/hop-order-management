import { BrowserWindow } from "electron"

export enum EPrintFormat {
    A4 = 'A4',
    LANDSCAPE_A4 = 'LSA4'
}

export const printDimensionsMap = {
    [EPrintFormat.A4]: { width: 800, height: 600 },
    [EPrintFormat.LANDSCAPE_A4]: { width: 600, height: 800 }
}

const getGenericWindowForPrint = (format: EPrintFormat = EPrintFormat.A4) => {
    return new BrowserWindow({
        ...printDimensionsMap[format],
        show: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    })
}

export default getGenericWindowForPrint;