import { CheckCircle, LocalShipping, Schedule, Warning } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { useDeliveries } from '@renderer/providers/DeliveriesProvider'
import { FC } from 'react'
import { PaperInfoCard } from '../InfoCard/InfoCard'

interface StatItemProps {
  icon: React.ReactNode
  label: string
  value: number | string
  color: string
}

const StatItem: FC<StatItemProps> = ({ icon, label, value, color }) => (
  <Box
    display="flex"
    alignItems="center"
    gap={1.5}
    sx={{
      p: 1.5,
      borderRadius: 2,
      bgcolor: `${color}12`,
      border: `1px solid ${color}30`
    }}
  >
    <Box sx={{ color, display: 'flex' }}>{icon}</Box>
    <Box>
      <Typography variant="h5" fontWeight={700} lineHeight={1}>
        {value}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
    </Box>
  </Box>
)

const StatsCard: FC = () => {
  const { stats } = useDeliveries()

  return (
    <PaperInfoCard title="Riepilogo">
      <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1.5} mt={1}>
        <StatItem
          icon={<LocalShipping />}
          label="Ordini totali"
          value={stats.totalOrders}
          color="#0288d1"
        />
        <StatItem
          icon={<CheckCircle />}
          label="Consegnati"
          value={stats.deliveredCount}
          color="#2e7d32"
        />
        <StatItem
          icon={<Schedule />}
          label="In attesa"
          value={stats.pendingCount}
          color="#ed6c02"
        />
        <StatItem
          icon={<Warning />}
          label="In ritardo"
          value={stats.delayedCount}
          color="#c82f0a"
        />
      </Box>

      <Box mt={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
          <Typography variant="caption" color="text.secondary">
            Tasso di consegna
          </Typography>
          <Typography variant="caption" fontWeight={600}>
            {stats.deliveryRate}%
          </Typography>
        </Box>
        <Box
          sx={{
            height: 8,
            borderRadius: 4,
            bgcolor: '#e0e0e0',
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{
              height: '100%',
              width: `${stats.deliveryRate}%`,
              borderRadius: 4,
              bgcolor:
                stats.deliveryRate === 100
                  ? '#2e7d32'
                  : stats.deliveryRate > 50
                    ? '#0288d1'
                    : '#ed6c02',
              transition: 'width 0.6s ease-in-out'
            }}
          />
        </Box>
      </Box>
    </PaperInfoCard>
  )
}

export default StatsCard
