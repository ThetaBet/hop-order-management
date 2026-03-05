import { Cancel, Download, FilterList, Search, ViewColumn } from '@mui/icons-material'
import {
  Badge,
  Divider,
  InputAdornment,
  styled,
  TextField,
  Tooltip,
} from '@mui/material'

import {
  Toolbar,
  ColumnsPanelTrigger,
  ExportCsv,
  FilterPanelTrigger,
  QuickFilter,
  QuickFilterTrigger,
  ToolbarButton,
  QuickFilterControl,
  QuickFilterClear
} from '@mui/x-data-grid'
import { FC } from 'react'


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

const CustomToolbar: FC<{ customFilters?: React.ReactNode }> = ({ customFilters }) => {

  return (
    <Toolbar>
      {customFilters}
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
    </Toolbar>
  )
}
export default CustomToolbar
