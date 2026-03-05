import { CalendarMonth, ChevronLeft, ChevronRight } from '@mui/icons-material'
import { Box, Chip, IconButton, Typography } from '@mui/material'
import { useDeliveries } from '@renderer/providers/DeliveriesProvider'
import { addDays, isToday, subDays } from 'date-fns'
import { EDateFormat, formatDate } from '@renderer/utils/dates'
import { FC, useState } from 'react'
import { DateCalendar } from '@mui/x-date-pickers'
import { PaperInfoCard } from '../InfoCard/InfoCard'

const DateSelectorCard: FC = () => {
  const { selectedDate, setSelectedDate } = useDeliveries()
  const [showCalendar, setShowCalendar] = useState(false)

  const goToPreviousDay = () => setSelectedDate(subDays(selectedDate, 1))
  const goToNextDay = () => setSelectedDate(addDays(selectedDate, 1))
  const goToToday = () => {
    setSelectedDate(new Date())
    setShowCalendar(false)
  }

  return (
    <PaperInfoCard title="Consegne del giorno">
      <Box display="flex" alignItems="center" gap={2} mt={1}>
        <IconButton onClick={goToPreviousDay} size="small">
          <ChevronLeft />
        </IconButton>

        <Box
          display="flex"
          alignItems="center"
          gap={1}
          sx={{ cursor: 'pointer' }}
          onClick={() => setShowCalendar(!showCalendar)}
        >
          <CalendarMonth color="primary" />
          <Typography variant="h5" fontWeight={600} color="primary">
            {formatDate(selectedDate, EDateFormat.LONG_DATE)}
          </Typography>
        </Box>

        <IconButton onClick={goToNextDay} size="small">
          <ChevronRight />
        </IconButton>

        {!isToday(selectedDate) && (
          <Chip label="Vai a oggi" color="primary" size="small" onClick={goToToday} />
        )}

        {isToday(selectedDate) && (
          <Chip label="Oggi" color="success" size="small" variant="outlined" />
        )}
      </Box>

      {showCalendar && (
        <Box mt={1}>
          <DateCalendar
            value={selectedDate}
            onChange={(newDate) => {
              if (newDate) {
                setSelectedDate(newDate)
                setShowCalendar(false)
              }
            }}
          />
        </Box>
      )}
    </PaperInfoCard>
  )
}

export default DateSelectorCard
