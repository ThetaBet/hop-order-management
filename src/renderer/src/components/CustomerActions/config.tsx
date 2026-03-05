import { Add, Delete, PictureAsPdf } from "@mui/icons-material";
import { printSelectedCustomers } from "@renderer/dbOperations/customers";
import { ICustomer } from "@renderer/utils/types";

export const actions = [
  {
    id: 'add-customer',
    name: 'Aggiungi cliente',
    icon: <Add />,
    tooltip: 'Aggiungi un nuovo cliente',
    action: () => window.api.window.openNewCustomerWindow()
  },
  {
    id: 'print-customers',
    name: 'Stompa clienti',
    icon: <PictureAsPdf />,
    tooltip: 'Esporta clienti selezionati su PDF',
    action: (customers: ICustomer[]) => {
      printSelectedCustomers(customers).catch((error) => {
        console.error('Errore durante la stampa dei clienti:', error);
      });
    }
  }, 
  {
    id: 'delete-customers',
    name: 'Cancella clienti',
    icon: <Delete />,
    tooltip: 'Cancella clienti selezionati',
    action: (customers: ICustomer[], hook: { mutate: (id: string) => void }) => {
      if (customers.length === 0) {
        alert('Nessun cliente selezionato per la cancellazione.');
        return;
      }
      const confirm = window.confirm(
        `Sei sicuro di voler eliminare i ${customers.length} clienti selezionati?`
      );
      if (confirm) {
        customers.forEach((customer) => {
          hook.mutate(customer.customerCode);
        });
      }
    }
  }
]