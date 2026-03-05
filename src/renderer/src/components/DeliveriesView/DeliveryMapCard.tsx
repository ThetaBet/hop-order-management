import { Box, Typography } from '@mui/material'
import { useDeliveries } from '@renderer/providers/DeliveriesProvider'
import { FC, useMemo } from 'react'
import { PaperInfoCard } from '../InfoCard/InfoCard'
import { EDeliveryStatus } from '@renderer/utils/types'

const DeliveryMapCard: FC = () => {
  const { orders } = useDeliveries()

  const deliveryPoints = useMemo(() => {
    return orders
      .filter((o) => o.delivery.deliveryAddress || o.customer?.address?.city)
      .slice(0, 12)
      .map((order, index) => {
        const angle = (index / Math.max(orders.length, 1)) * 2 * Math.PI
        const radius = 60 + Math.random() * 60
        const cx = 160 + Math.cos(angle) * radius
        const cy = 130 + Math.sin(angle) * radius

        return {
          id: order.id,
          cx,
          cy,
          label: order.customer?.customerName?.substring(0, 3) || '?',
          delivered: order.delivery.status === EDeliveryStatus.DELIVERED,
          address:
            order.delivery.deliveryAddress ||
            order.customer?.address?.city ||
            'Indirizzo non disponibile'
        }
      })
  }, [orders])

  return (
    <PaperInfoCard title="Mappa Consegne">
      <Box mt={1} display="flex" justifyContent="center">
        <svg width="100%" height={260} viewBox="0 0 320 260" preserveAspectRatio="xMidYMid meet">
          {/* Background area (stilizzata come una mappa) */}
          <defs>
            <radialGradient id="mapGradient" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#e1f5fe" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="320" height="260" fill="#fafafa" rx="12" />
          <circle cx="160" cy="130" r="120" fill="url(#mapGradient)" />

          {/* Decorative "roads" */}
          <path d="M 20 80 Q 100 100 160 60 T 300 90" stroke="#e0e0e0" fill="none" strokeWidth="2" />
          <path d="M 40 180 Q 120 150 200 200 T 310 160" stroke="#e0e0e0" fill="none" strokeWidth="2" />
          <path d="M 80 20 Q 140 120 100 240" stroke="#e0e0e0" fill="none" strokeWidth="1.5" />
          <path d="M 240 30 Q 200 130 250 230" stroke="#e0e0e0" fill="none" strokeWidth="1.5" />

          {/* Central hub */}
          <circle cx="160" cy="130" r="8" fill="#0288d1" opacity="0.8" />
          <circle cx="160" cy="130" r="14" fill="none" stroke="#0288d1" strokeWidth="1" opacity="0.3" />
          <circle cx="160" cy="130" r="22" fill="none" stroke="#0288d1" strokeWidth="0.5" opacity="0.15" />

          {/* Connection lines from hub to points */}
          {deliveryPoints.map((point) => (
            <line
              key={`line-${point.id}`}
              x1="160"
              y1="130"
              x2={point.cx}
              y2={point.cy}
              stroke={point.delivered ? '#2e7d32' : '#ed6c02'}
              strokeWidth="1"
              strokeDasharray={point.delivered ? '0' : '4 3'}
              opacity="0.4"
            />
          ))}

          {/* Delivery points */}
          {deliveryPoints.map((point, index) => (
            <g key={point.id}>
              <circle
                cx={point.cx}
                cy={point.cy}
                r={10}
                fill={point.delivered ? '#2e7d32' : '#ed6c02'}
                opacity="0.9"
              >
                <animate
                  attributeName="r"
                  from="0"
                  to="10"
                  dur={`${0.3 + index * 0.1}s`}
                  fill="freeze"
                />
              </circle>
              <text
                x={point.cx}
                y={point.cy + 3.5}
                textAnchor="middle"
                fill="white"
                fontSize="8"
                fontWeight="bold"
                fontFamily="Poppins, sans-serif"
              >
                {point.label}
              </text>
            </g>
          ))}

          {/* Info label if no points */}
          {deliveryPoints.length === 0 && (
            <text
              x="160"
              y="135"
              textAnchor="middle"
              fill="#9e9e9e"
              fontSize="13"
              fontFamily="Poppins, sans-serif"
            >
              Nessuna consegna da mostrare
            </text>
          )}
        </svg>
      </Box>
      {deliveryPoints.length > 0 && (
        <Box display="flex" gap={2} mt={1} justifyContent="center">
          <Box display="flex" alignItems="center" gap={0.5}>
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#2e7d32' }} />
            <Typography variant="caption" color="text.secondary">
              Consegnato
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={0.5}>
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ed6c02' }} />
            <Typography variant="caption" color="text.secondary">
              In attesa
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={0.5}>
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#0288d1' }} />
            <Typography variant="caption" color="text.secondary">
              Sede
            </Typography>
          </Box>
        </Box>
      )}
    </PaperInfoCard>
  )
}

export default DeliveryMapCard
