import { Box, Card, CardContent, Divider, Paper, Typography } from "@mui/material"
import { FC, ReactNode } from "react"
import { InfoCardProps } from "./types"

const InfoCard: FC<InfoCardProps> = ({ title, children }) => {
  return (
    <Card sx={{ height: '100%', flexGrow: 1 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Divider sx={{ my: 1 }} />
        {children}
      </CardContent>
    </Card>
  )
}

export const PaperInfoCard: FC<InfoCardProps> = ({ title, children }) => {
  return (
    <Paper elevation={2} sx={{ height: '100%', p: 2, boxSizing: 'border-box' }}>
      <Typography variant="h6" fontWeight="bold">
        {title}
      </Typography>
      <Divider sx={{ my: 1 }} />
      {children}
    </Paper>
  )
} 

export const InfoLine: FC<{ title: string; value: string; color?: string; isListItem?: boolean }> = ({
  title,
  value,
  color,
  isListItem = false
}) => {
  if (isListItem) {
    return (
      <Box 
        sx={{ 
          gridColumn: '1 / -1',
          display: 'flex',
          alignItems: 'baseline',
          gap: 1
        }}
      >
        <Typography variant="subtitle2" color={color} fontWeight="bold" sx={{ flexShrink: 0 }}>
          {title}
        </Typography>
        <Box 
          sx={{ 
            flexGrow: 1,
            borderBottom: value ? '1px dashed' : undefined,
            borderColor: 'divider',
            mb: '4px',
            minWidth: '20px'
          }} 
        />
        <Typography variant="body2" color={color}>
          {value}
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="inline-flex" gap={1} alignItems="center" flexWrap="wrap">
      <Typography variant="subtitle2" color={color} fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="body2" color={color}>
        {value}
      </Typography>
    </Box>
  )
}

export const InfoList: FC<{ rowGap?: number | string, colGap?: number | string, sx?: any, children: ReactNode }> = ({ rowGap = 1, colGap = 2, children, sx }) => (
  <Box
    display="grid"
    gridTemplateColumns= 'auto'
    rowGap={rowGap}
    columnGap={colGap}
    alignItems="baseline"
    sx={sx}
  >
    {children}
  </Box>
)

export default InfoCard