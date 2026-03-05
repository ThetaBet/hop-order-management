import { Add, Delete, Print } from "@mui/icons-material";
import { printSelectedDrivers } from "@renderer/dbOperations/drivers";
import { IDriver } from "@renderer/utils/types";

export const actions = [
  {
    name: 'Aggiungi autista',
    icon: <Add />,
    tooltip: 'Aggiungi un nuovo autista',
    action: () => window.api.window.openNewDriverWindow()
  },
  {
    name: 'Stampa autisti',
    icon: <Print />,
    tooltip: 'Stampa autisti selezionati',
    action: (drivers: IDriver[]) => {
      printSelectedDrivers(drivers).catch((error) => {
        console.error('Errore durante la stampa degli autisti:', error);
      });
    }
  },
  {
    name: 'Cancella autisti',
    icon: <Delete />,
    tooltip: 'Cancella autisti selezionati',
    action: (drivers: IDriver[], hook: { mutate: (code: string) => void }) => {
      if (drivers.length === 0) {
        alert('Nessun autista selezionato per la cancellazione.');
        return;
      }
      const confirm = window.confirm(
        `Sei sicuro di voler eliminare i ${drivers.length} autisti selezionati?`
      );
      if (confirm) {
        drivers.forEach((driver) => {
          hook.mutate(driver.driverCode);
        });
      }
    }
  }
]