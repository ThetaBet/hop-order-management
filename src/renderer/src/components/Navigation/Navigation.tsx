import type { FC } from 'react'
import { NavigationIcons, NavigationLabels, routes } from './config'
import { Link, useLocation } from 'react-router-dom'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'

const Navigation: FC = () => {
  const location = useLocation()
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '64px' }} elevation={3}>
      <BottomNavigation value={location.pathname}>
        {routes.map((route) => (
          <BottomNavigationAction
            component={Link}
            to={route}
            showLabel={true}
            key={route}
            label={NavigationLabels[route]}
            icon={NavigationIcons[route]}
            value={route}
          />
        ))}
      </BottomNavigation>
    </Paper>
  )
}

export default Navigation
