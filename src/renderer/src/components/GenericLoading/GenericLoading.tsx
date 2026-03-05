import type { FC } from 'react'
import { Box, CircularProgress } from '@mui/material'

const GenericLoading: FC = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt="64px">
      <CircularProgress />
    </Box>
  )
}

export default GenericLoading
