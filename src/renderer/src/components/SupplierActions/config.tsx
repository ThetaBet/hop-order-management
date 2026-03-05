import { Add, Delete, Print } from '@mui/icons-material'
import { printSelectedSuppliers } from '@renderer/dbOperations/suppliers'
import { ISupplier } from '@renderer/utils/types'

const actions = [
    {
        name: 'Aggiungi fornitore',
        icon: <Add />,
        tooltip: 'Aggiungi un nuovo fornitore',
        action: () => window.api.window.openNewSupplierWindow()
    },
    {
        name: 'Stampa fornitori',
        icon: <Print />,
        tooltip: 'Stampa fornitori selezionati',
        action: (suppliers: ISupplier[]) => {
            printSelectedSuppliers(suppliers).catch((error) => {
                console.error('Errore durante la stampa dei fornitori:', error)
            })
        }
    },
    {
        name: 'Cancella fornitori',
        icon: <Delete />,
        tooltip: 'Cancella fornitori selezionati',
        action: (suppliers: ISupplier[], hook: { mutate: (code: string) => void }) => {
            if (suppliers.length === 0) {
                alert('Nessun fornitore selezionato per la cancellazione.')
                return
            }
            const confirm = window.confirm('Sei sicuro di voler cancellare i fornitori selezionati?')
            if (confirm) {
                suppliers.forEach((supplier) => {
                    hook.mutate(supplier.supplierCode)
                })
            }
        }
    }
];

export default actions;
