import { EPageSize } from "./types"

export const getHeader = (title: string) => `
    <style>
        h1, h2, h3, h4, h5, h6 {
            margin: 0;
        }
        h2 {
            font-size: 16pt;
        }
        h3 {
            font-size: 14pt;
        } 
    </style>
    <div class="header">
        <h3 class="company-logo">Hop!</h3>
        <h1 class="document-title">${title}</h1>
    </div>
`

export const getFooter = () => `
    <style>
        .document-date, .document-info {
            font-size: 7pt;
            text-align: right;
            color: #555;
        }
    </style>
        <div class="footer">
            <div class="document-info">Documento generato: </div>
            <div class="document-date">Data: ${new Date().toLocaleDateString('it-IT', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
            </div>
            <div class="document-date">Ora: ${new Date().toLocaleTimeString('it-IT')}</div>
        </div>
`

export const getStyles = (pageSize: EPageSize = EPageSize.A4) => `
    <style>
        @page {
            size: ${pageSize};
            margin: 1.5cm;
            @bottom-left {
                content: "Pagina: " counter(page) " di " counter(pages);
            }
        }
        @media print {
            body { margin: 0; } 
            .no-print { display: none !important; }
            .page-break { page-break-before: always; }
        }
        body {
            border: 2px solid #000;
            border-radius: 8px;
            padding: 8px;
            font-family: Arial, sans-serif;
            font-size: 12pt;
        }
        .header, .footer {
            border: 2px solid #000;
            padding: 4px;
            border-radius: 8px;
        }
        .content {
            margin: 10px 0;
            border-radius: 8px;
            border: 2px solid #000;
            padding: 8px;
        }
                table {
            width: 100%;
            border-collapse: collapse;
            font-size: 9pt;
            table-layout: fixed;
        }
        th, td {
            border: 1px dotted #000;
            border-top: 1px solid #000;
            border-bottom: 1px solid #000;
            padding: 6px;
            text-align: left;
        }
        .nowrap-text {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        th.currency, td.currency, th.number, td.number {
            text-align: right;
        }
        td.currency, td.number {
            font-family: 'Courier New', Courier, monospace;
            white-space: nowrap;
        }
`
