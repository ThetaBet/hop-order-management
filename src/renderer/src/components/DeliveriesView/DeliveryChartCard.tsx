import { Box, Typography } from '@mui/material'
import { useDeliveries } from '@renderer/providers/DeliveriesProvider'
import { FC, useMemo } from 'react'
import { PaperInfoCard } from '../InfoCard/InfoCard'

const DeliveryChartCard: FC = () => {
  const { driverGroups } = useDeliveries()

  const chartData = useMemo(() => {
    if (driverGroups.length === 0) return []
    return driverGroups.slice(0, 6).map((group, index) => ({
      name: group.driverName.split(' ')[0],
      delivered: group.deliveredCount,
      pending: group.pendingCount,
      total: group.totalOrders,
      color: ['#0288d1', '#2e7d32', '#ed6c02', '#9c27b0', '#00838f', '#bf360c'][index % 6]
    }))
  }, [driverGroups])

  const maxOrders = Math.max(...chartData.map((d) => d.total), 1)
  const chartHeight = 160
  const barWidth = chartData.length > 0 ? Math.min(40, 280 / chartData.length) : 40

  return (
    <PaperInfoCard title="Distribuzione Consegne">
      {chartData.length === 0 ? (
        <Box py={4} display="flex" justifyContent="center">
          <Typography variant="body2" color="text.secondary">
            Nessun dato disponibile
          </Typography>
        </Box>
      ) : (
        <Box mt={1}>
          <svg
            width="100%"
            height={chartHeight + 40}
            viewBox={`0 0 ${Math.max(chartData.length * (barWidth + 16) + 20, 200)} ${chartHeight + 40}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
              <line
                key={ratio}
                x1="0"
                y1={chartHeight - ratio * chartHeight}
                x2={chartData.length * (barWidth + 16) + 10}
                y2={chartHeight - ratio * chartHeight}
                stroke="#f0f0f0"
                strokeWidth="1"
              />
            ))}

            {/* Bars */}
            {chartData.map((item, i) => {
              const x = i * (barWidth + 16) + 10
              const deliveredHeight = (item.delivered / maxOrders) * chartHeight
              const pendingHeight = (item.pending / maxOrders) * chartHeight

              return (
                <g key={item.name}>
                  {/* Pending (bottom) */}
                  <rect
                    x={x}
                    y={chartHeight - deliveredHeight - pendingHeight}
                    width={barWidth}
                    height={pendingHeight}
                    rx={4}
                    fill={item.color}
                    opacity={0.3}
                  >
                    <animate
                      attributeName="height"
                      from="0"
                      to={pendingHeight}
                      dur="0.6s"
                      fill="freeze"
                    />
                    <animate
                      attributeName="y"
                      from={chartHeight}
                      to={chartHeight - deliveredHeight - pendingHeight}
                      dur="0.6s"
                      fill="freeze"
                    />
                  </rect>
                  {/* Delivered (top) */}
                  <rect
                    x={x}
                    y={chartHeight - deliveredHeight}
                    width={barWidth}
                    height={deliveredHeight}
                    rx={4}
                    fill={item.color}
                  >
                    <animate
                      attributeName="height"
                      from="0"
                      to={deliveredHeight}
                      dur="0.6s"
                      fill="freeze"
                    />
                    <animate
                      attributeName="y"
                      from={chartHeight}
                      to={chartHeight - deliveredHeight}
                      dur="0.6s"
                      fill="freeze"
                    />
                  </rect>
                  {/* Label */}
                  <text
                    x={x + barWidth / 2}
                    y={chartHeight + 16}
                    textAnchor="middle"
                    fill="#546e7a"
                    fontSize="10"
                    fontFamily="Poppins, sans-serif"
                  >
                    {item.name}
                  </text>
                  {/* Value on top */}
                  <text
                    x={x + barWidth / 2}
                    y={chartHeight - deliveredHeight - pendingHeight - 5}
                    textAnchor="middle"
                    fill="#263238"
                    fontSize="11"
                    fontWeight="600"
                    fontFamily="Poppins, sans-serif"
                  >
                    {item.total}
                  </text>
                </g>
              )
            })}
          </svg>

          {/* Legend */}
          <Box display="flex" gap={2} mt={1} justifyContent="center">
            <Box display="flex" alignItems="center" gap={0.5}>
              <Box sx={{ width: 12, height: 12, borderRadius: 1, bgcolor: '#0288d1' }} />
              <Typography variant="caption" color="text.secondary">
                Consegnati
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <Box
                sx={{ width: 12, height: 12, borderRadius: 1, bgcolor: '#0288d1', opacity: 0.3 }}
              />
              <Typography variant="caption" color="text.secondary">
                In attesa
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </PaperInfoCard>
  )
}

export default DeliveryChartCard
