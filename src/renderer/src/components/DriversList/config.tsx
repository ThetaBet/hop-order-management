import { GridColDef } from "@mui/x-data-grid";
import { genericLocaleText } from "@renderer/utils/localizations";
import { IDriver } from "@renderer/utils/types";

export enum DriversPageSize {
  SMALL = 5,
  MEDIUM = 25,
  LARGE = 50
}
export const DEFAULT_PAGE_SIZE = DriversPageSize.MEDIUM;

export const getColumns = (): GridColDef<Partial<IDriver>>[] => [
  {
    field: "driverCode",
    headerName: "Codice autista",
    width: 300,
    editable: false,
  },
  {
    field: "driverName",
    headerName: "Nome autista",
    width: 300,
    editable: false,
  }, {
    field: "phone",
    headerName: "Numero di telefono",
    width: 300,
    editable: true,
  }
];

export const localeText = {
  ...genericLocaleText,
  noRowsLabel: "Nessun autista trovato",
  paginationRowsPerPage: "Autisti per pagina:",
  footerRowSelected: (count: number) =>
    count > 1
      ? `${count.toLocaleString()} autisti selezionati`
      : `${count.toLocaleString()} autista selezionato`,
};