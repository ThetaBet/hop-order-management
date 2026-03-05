import { Cancel, Download, FilterList, Search, ViewColumn } from "@mui/icons-material"
import { Badge, Button, Chip, Dialog, Divider, InputAdornment, Stack, styled, TextField, Tooltip, Typography } from "@mui/material"

import { Toolbar, ColumnsPanelTrigger, ExportCsv, FilterPanelTrigger, QuickFilter, QuickFilterTrigger, ToolbarButton, QuickFilterControl, QuickFilterClear } from "@mui/x-data-grid"
import { useOrders } from "@renderer/providers/OrdersProviders"
import { EDateFormat } from "@renderer/utils/dates"
import { formatDate } from "date-fns"
import { FC, useState } from "react"
import DialogContentComponent from "../OrdersActions/OrdersFilterDialog"

type OwnerState = {
  expanded: boolean
}

const StyledQuickFilter = styled(QuickFilter)({
  display: 'grid',
  alignItems: 'center'
})

const StyledToolbarButton = styled(ToolbarButton)<{ ownerState: OwnerState }>(
  ({ theme, ownerState }) => ({
    gridArea: '1 / 1',
    width: 'min-content',
    height: 'min-content',
    zIndex: 1,
    opacity: ownerState.expanded ? 0 : 1,
    pointerEvents: ownerState.expanded ? 'none' : 'auto',
    transition: theme.transitions.create(['opacity'])
  })
)

const StyledTextField = styled(TextField)<{
  ownerState: OwnerState
}>(({ theme, ownerState }) => ({
  gridArea: '1 / 1',
  overflowX: 'clip',
  width: ownerState.expanded ? 260 : 'var(--trigger-width)',
  opacity: ownerState.expanded ? 1 : 0,
  transition: theme.transitions.create(['width', 'opacity'])
}))

const CustomToolbar: FC = () => {
    const [openStart, setOpenStart] =  useState(false);
    const [openEnd, setOpenEnd] =  useState(false);
    const { dates, unpaidOnly, setUnpaidOnly } = useOrders();
  return (
    <Toolbar>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mr: 'auto' }}>
        <Typography variant="body2" fontWeight="bold">Ordini filtrati:</Typography>
        <Chip
          onClick={() => {
            setOpenStart(true)
          }}
          label={`Dal: ${formatDate(dates.startDate!, EDateFormat.DATE)} `}
          variant="outlined"
        />
        <Chip
          onClick={() => {
            setOpenEnd(true)
          }}
          label={`Al: ${formatDate(dates.endDate!, EDateFormat.DATE)} `}
          variant="outlined"
        />
        <Chip
          onClick={() => {
            setUnpaidOnly(!unpaidOnly)
          }}
          label={unpaidOnly ? 'Mostra: solo Non Pagati' : 'Mostra: tutti gli Ordini'}
          color={unpaidOnly ? 'secondary' : 'default'}
          variant="outlined"
        />
      </Stack>
      <Tooltip title="Gestisci colonne">
        <ColumnsPanelTrigger render={<ToolbarButton />}>
          <ViewColumn fontSize="small" />
        </ColumnsPanelTrigger>
      </Tooltip>
      <Tooltip title="Filtri">
        <FilterPanelTrigger
          render={(props, state) => (
            <ToolbarButton {...props} color="default">
              <Badge badgeContent={state.filterCount} color="secondary" variant="dot">
                <FilterList fontSize="small" />
              </Badge>
            </ToolbarButton>
          )}
        />
      </Tooltip>
      <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 0.5 }} />
      <Tooltip title="Esporta CSV">
        <ExportCsv render={<ToolbarButton />}>
          <Download fontSize="small" />
        </ExportCsv>
      </Tooltip>
      <StyledQuickFilter>
        <QuickFilterTrigger
          render={(triggerProps, state) => (
            <Tooltip title="Cerca" enterDelay={0}>
              <StyledToolbarButton
                {...triggerProps}
                ownerState={{ expanded: state.expanded }}
                color="default"
                aria-disabled={state.expanded}
              >
                <Search fontSize="small" />
              </StyledToolbarButton>
            </Tooltip>
          )}
        />
        <QuickFilterControl
          render={({ ref, ...controlProps }, state) => (
            <StyledTextField
              {...controlProps}
              ownerState={{ expanded: state.expanded }}
              inputRef={ref}
              aria-label="Cerca"
              placeholder="Cerca..."
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: state.value ? (
                    <InputAdornment position="end">
                      <QuickFilterClear
                        edge="end"
                        size="small"
                        aria-label="Cancella ricerca"
                        material={{ sx: { marginRight: -0.75 } }}
                      >
                        <Cancel fontSize="small" />
                      </QuickFilterClear>
                    </InputAdornment>
                  ) : null,
                  ...controlProps.slotProps?.input
                },
                ...controlProps.slotProps
              }}
            />
          )}
        />
      </StyledQuickFilter>
      <Dialog open={openStart} onClose={() => setOpenStart(false)} maxWidth="xl">
        <DialogContentComponent isSettingStartDate={true} setOpen={setOpenStart} />
      </Dialog>
      <Dialog open={openEnd} onClose={() => setOpenEnd(false)} maxWidth="xl">
        <DialogContentComponent isSettingEndDate={true} setOpen={setOpenEnd} />
      </Dialog>
    </Toolbar>
  )
}
export default CustomToolbar