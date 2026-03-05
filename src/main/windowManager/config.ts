import { EPrintFormat } from "./getGenericWindowForPrint";

export const getGenericPrintOptions = (printFormat: EPrintFormat = EPrintFormat.A4) => ({
    pageSize: 'A4' as 'A4',
    silent: false,
    printBackground: true,
    color: true,
    margin: {
        marginType: 'printableArea'
    },
    landscape: printFormat === EPrintFormat.LANDSCAPE_A4,
    pagesPerSheet: 1,
    collate: false,
    copies: 1
})