import { FilterList } from "@mui/icons-material";

export const actions = [{
  name: 'Cambia filtri',
  icon: <FilterList />,
  tooltip: 'Cambia i filtri degli ordini',
  action: (setOpenDialog) => {
    setOpenDialog(true);
  }
}]