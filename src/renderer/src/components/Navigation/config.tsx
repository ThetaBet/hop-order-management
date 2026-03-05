import {
  Business,
  DeliveryDining,
  Engineering,
  Help,
  Inventory,
  People,
  ReceiptLong,
  Settings
} from '@mui/icons-material'

export enum NavigationRoutes {
  DELIVERIES = '/',
  ORDERS = '/orders',
  PRODUCTS = '/products',
  CUSTOMERS = '/customers',
  SUPPLIERS = '/suppliers',
  DRIVERS = '/drivers',
  // SETTINGS = '/settings',
  // HELP = '/help'
}

export const HomeRoute = '/'

export const NavigationIcons: Record<NavigationRoutes, JSX.Element> = {
  [NavigationRoutes.PRODUCTS]: <Inventory />,
  [NavigationRoutes.ORDERS]: <ReceiptLong />,
  [NavigationRoutes.CUSTOMERS]: <People />,
  // [NavigationRoutes.SETTINGS]: <Settings />,
  [NavigationRoutes.SUPPLIERS]: <Business />,
  // [NavigationRoutes.HELP]: <Help />,
  [NavigationRoutes.DELIVERIES]: <DeliveryDining />,
  [NavigationRoutes.DRIVERS]: <Engineering />
}

export const NavigationLabels: Record<NavigationRoutes, string> = {
  [NavigationRoutes.DELIVERIES]: 'Consegne',
  [NavigationRoutes.PRODUCTS]: 'Prodotti',
  [NavigationRoutes.ORDERS]: 'Ordini',
  [NavigationRoutes.CUSTOMERS]: 'Clienti',
  // [NavigationRoutes.SETTINGS]: 'Impostazioni',
  [NavigationRoutes.SUPPLIERS]: 'Fornitori',
  // [NavigationRoutes.HELP]: 'Aiuto',
  [NavigationRoutes.DRIVERS]: 'Autisti',
}

export const HomeLabel = 'Home'

import type { ComponentType, JSX } from 'react'

export interface ISecondaryMenuActionItem {
  label: string
  route?: string
  action?: () => void
}
export interface ISecondaryMenuElementItem {
  element: ComponentType
}
export type ISecondaryMenuItem = ISecondaryMenuActionItem | ISecondaryMenuElementItem

export const routes = Object.values(NavigationRoutes)
