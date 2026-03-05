import { useEffect, type FC, type JSX } from 'react'
import { HashRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import Deliveries from './pages/Deliveries'
import Orders from './pages/Orders'
import Settings from './pages/Settings'
import Navigation from './components/Navigation/Navigation'
import Products from './pages/Products'
import ProductOperation from './pages/ProductOperation'
import AppBar from './components/AppBar/Appbar'
import { Container, Fade, ThemeProvider } from '@mui/material'
import SecondaryAppBar from './components/AppBar/SecondaryAppBar'
import { theme } from './theme'
import Suppliers from './pages/Suppliers'
import SupplierOperation from './pages/SupplierOperation'
import Customers from './pages/Customers'
import CustomerDetails from './pages/CustomerDetails'
import NewCustomer from './pages/newCustomer'
import Drivers from './pages/Drivers'
import DriverOperations from './pages/DriverOperations'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { it } from 'date-fns/locale'
import SubRouteAppBar from './components/AppBar/SubRouteAppBar'
import OrderDetails from './pages/OrderDetails'
import EditCustomer from './pages/EditCustomers'
import NewOrder from './pages/NewOrder'
import ProductDetails from './pages/ProductDetails'
import { useQueryClient } from '@tanstack/react-query'
import UpdateNotification from './components/UpdateNotification/UpdateNotification'

interface ILayoutProps {
  pageName?: string
  closeApi?: () => Promise<void>
  isDoubleCheckClose?: boolean
  operations?: JSX.Element
}

const MainLayout: FC = () => {
  const queryClient = useQueryClient();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = window.api.window.onQueriesInvalidated((queryType) => {
      queryClient.invalidateQueries({ queryKey: [queryType, 'all'] })
      if (['products', 'customers', 'drivers', 'orders'].includes(queryType)) {
        queryClient.invalidateQueries({ queryKey: ['orders', 'all'] })
      }
      return () => {
        unsubscribe()
      }
    })
  }, [queryClient])

  return (
    <>
      <AppBar />
        <Fade key={location.pathname} timeout={500} in={true} appear={true}>
      <Container sx={{ my: 10, minHeight: 'calc(100vh - 160px)', maxWidth: '1920px !important' }}>
        <Outlet />
      </Container>
        </Fade>
      <Navigation />
    </>
  )
}

const SecondaryLayout: FC<ILayoutProps> = ({ pageName, closeApi, operations }) => {
  const location = useLocation();
  return (
  <>
    <SecondaryAppBar pageName={pageName || ''} closeApi={closeApi} operations={operations} />
    <Fade in={true} timeout={500} appear={true} key={location.pathname}>
    <Container sx={{ my: 10, minHeight: 'calc(100vh - 160px)', maxWidth: '1920px !important' }} >
      <Outlet />
    </Container>
    </Fade>
  </>
  )
}

const SubLayout: FC = () => (
  <>
    <SubRouteAppBar />
    <Fade in={true} timeout={500} appear={true}>
    <Container sx={{ my: 10, minHeight: 'calc(100vh - 160px)', maxWidth: '1920px !important' }}>
      <Outlet />
    </Container>
    </Fade>
  </>
)

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={it}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Deliveries />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/drivers" element={<Drivers />} />
          </Route>
          <Route path="/orders/:orderNumber/details" element={<SubLayout />}>
            <Route index element={<OrderDetails />} />
          </Route>
          <Route path="/customers/:customerCode/details" element={<SubLayout />}>
            <Route index element={<CustomerDetails />} />
          </Route>
          <Route path="/products/:productCode/details" element={<SubLayout />}>
            <Route index element={<ProductDetails />} />
          </Route>
          <Route path="/orders/new" element={<SubLayout />}>
            <Route index element={<NewOrder />} />
          </Route>
          <Route
            path="/customers/new"
            element={
              <SecondaryLayout
                pageName="Nuovo Cliente"
                closeApi={window.api.window.closeNewCustomerWindow}
              />
            }
          >
            <Route index element={<NewCustomer />} />
          </Route>
          <Route
            path="/products/new"
            element={
              <SecondaryLayout
                pageName="Nuovo Prodotto"
                closeApi={window.api.window.closeNewProductWindow}
              />
            }
          >
            <Route index element={<ProductOperation />} />
          </Route>
          <Route
            path="/customers/:customerCode/edit"
            element={
              <SecondaryLayout
                pageName="Modifica Cliente"
                closeApi={window.api.window.closeCustomerDetailWindow}
              />
            }
          >
            <Route index element={<EditCustomer />} />
          </Route>
          <Route
            path="/products/:productCode/edit"
            element={
              <SecondaryLayout
                pageName="Modifica Prodotto"
                closeApi={window.api.window.closeEditProductWindow}
              />
            }
          >
            <Route index element={<ProductOperation />} />
          </Route>
          <Route
            path="/suppliers/new"
            element={
              <SecondaryLayout
                pageName="Nuovo Fornitore"
                closeApi={window.api.window.closeNewSupplierWindow}
              />
            }
          >
            <Route index element={<SupplierOperation />} />
          </Route>
          <Route
            path="/drivers/new"
            element={
              <SecondaryLayout
                pageName="Nuovo Autista"
                closeApi={window.api.window.closeNewDriverWindow}
              />
            }
          >
            <Route index element={<DriverOperations />} />
          </Route>
          <Route path="*" element={<div><button onClick={() => {
            console.log(window.location)
            window.api.window.closeCustomerDetailWindow()
            window.api.window.closeNewCustomerWindow()
            window.api.window.closeNewProductWindow()
            window.api.window.closeNewSupplierWindow()
            window.api.window.closeNewDriverWindow()
          }}>Please reset</button></div>} />
        </Routes>
      </Router>
      </LocalizationProvider>
      <UpdateNotification />
    </ThemeProvider>
  )
}

export default App
