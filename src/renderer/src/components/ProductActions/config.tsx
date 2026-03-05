import { Add, Delete, Print } from '@mui/icons-material'
import { printSelectedProducts } from '@renderer/dbOperations/products'
import { IProduct } from '@renderer/utils/types'
export const actions = [
  {
    name: 'Aggiungi prodotto',
    icon: <Add />,
    tooltip: 'Aggiungi un nuovo prodotto',
    action: () => window.api.window.openNewProductWindow()
  },
  {
    name: 'Stampa prodotti',
    icon: <Print />,
    tooltip: 'Stampa prodotti selezionati',
    action: (products: IProduct[]) => {
      printSelectedProducts(products).catch((error) => {
        console.error('Errore durante la stampa dei prodotti:', error)
      })
    }
  },
  {
    name: 'Cancella prodotti',
    icon: <Delete />,
    tooltip: 'Cancella prodotti selezionati',
    action: (products: IProduct[], hook: { mutate: (code: string) => void }) => {
      if (products.length === 0) {
        alert('Nessun prodotto selezionato per la cancellazione.')
        return
      }
      const confirm = window.confirm(
        `Sei sicuro di voler eliminare i ${products.length} prodotti selezionati?`
      )
      if (confirm) {
        products.forEach((product) => {
          hook.mutate(product.productCode)
        })
      }
    }
  }
]
