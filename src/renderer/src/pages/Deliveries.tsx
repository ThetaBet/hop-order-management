import DeliveriesContent from '@renderer/components/DeliveriesView/DeliveriesContent'
import DeliveriesProvider from '@renderer/providers/DeliveriesProvider'
import { FC } from 'react'

const Deliveries: FC = () => {
  return (
    <DeliveriesProvider>
      <DeliveriesContent />
    </DeliveriesProvider>
  )
}

export default Deliveries
