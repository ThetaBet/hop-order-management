import { FC, useMemo } from 'react'
import { IOrderInfoProps } from './types'
import { useWatch } from 'react-hook-form'
import {
  Box,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Chip,
  Grid,
  Card,
  CardContent
} from '@mui/material'
import { InfoList, InfoLine } from '../InfoCard/InfoCard'
import { format } from 'date-fns'
import { it } from 'date-fns/locale'
import { form2Db } from '@renderer/utils/number'
import { EDateFormat, formatDate } from '@renderer/utils/dates'
import { formatTimeSlot } from '@renderer/utils/string'
import { useDrivers } from '@renderer/providers/DriversProvider'
import { useGetLastOrderNumber } from '@renderer/hooks/useOrdersQuery'

const ReviewOrder: FC<IOrderInfoProps> = ({ control }) => {
  const { data: orderNumber } = useGetLastOrderNumber()
  const { drivers } = useDrivers()
  const [customer, orderDate, products, deliveryDate, timeSlot, driverId, deliveryAddress] =
    useWatch({
      control,
      name: [
        'customer',
        'orderDate',
        'products',
        'deliveryDate',
        'timeSlot',
        'driverId',
        'deliveryAddress'
      ]
    })

  return (
    <Stack spacing={2}>
      <Grid container spacing={3}>
        <Grid size={6}>
          <Divider sx={{ mb: 2 }}>
            <Chip size="small" label="Dettagli ordine" />
          </Divider>
          <Grid container spacing={2}>
            <Grid size={6}>
              <InfoList colGap={3} rowGap={1}>
                <InfoLine
                  isListItem
                  title="Numero Ordine:"
                  value={(orderNumber || 0 + 1).toString()}
                />
              </InfoList>
            </Grid>
            <Grid size={6}>
              <InfoList colGap={3} rowGap={1}>
                <InfoLine
                  isListItem
                  title="Data Ordine:"
                  value={formatDate(orderDate, EDateFormat.DATE)}
                />
              </InfoList>
            </Grid>
            <Grid size={12}>
              <InfoList colGap={3} rowGap={1}>
                <InfoLine isListItem title="Cliente:" value={customer?.name || 'Non selezionato'} />
              </InfoList>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={6}>
          <Divider sx={{ mb: 2 }}>
            <Chip size="small" label="Dettagli consegna" />
          </Divider>
          <Grid container spacing={2}>
            <Grid size={6}>
              <InfoList colGap={3} rowGap={1}>
                <InfoLine
                  isListItem
                  title="Data Consegna:"
                  value={formatDate(deliveryDate, EDateFormat.DATE)}
                />

                <InfoLine
                  isListItem
                  title="Autista:"
                  value={drivers?.find((d) => d.id === driverId)?.driverName || 'Non selezionato'}
                />
              </InfoList>
            </Grid>
            <Grid size={6}>
              <InfoList colGap={3} rowGap={1}>
                <InfoLine
                  isListItem
                  title="Fascia Oraria:"
                  value={formatTimeSlot(timeSlot) || '-'}
                />
              </InfoList>
            </Grid>
            <Grid size={12}>
              <InfoList colGap={3} rowGap={1}>
                <InfoLine
                  isListItem
                  title="Indirizzo Consegna:"
                  value={deliveryAddress || 'Non specificato'}
                />
              </InfoList>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={12}>
          <Divider sx={{ mb: 2 }}>
            <Chip size="small" label="Prodotti" />
          </Divider>
          <Card>
            <CardContent sx={{ height: '180px', overflow: 'auto', pt: 0 }}>
              <Table size="small">
                <TableHead style={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>
                  <TableRow>
                    <TableCell>Prodotto</TableCell>
                    <TableCell align="right">Qtà</TableCell>
                    <TableCell align="right">Prezzo Unit.</TableCell>
                    <TableCell align="right">IVA %</TableCell>
                    <TableCell align="right">Subtotale</TableCell>
                    <TableCell align="right">IVA</TableCell>
                    <TableCell align="right">Totale</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>
                        {product?.productId?.label ||
                          product?.productName ||
                          `Prodotto ${index + 1}`}
                      </TableCell>
                      <TableCell align="right">{product?.quantity || '0'}</TableCell>
                      <TableCell align="right">{product?.price || '0,00'} €</TableCell>
                      <TableCell align="right">{product?.taxRate || '0'}%</TableCell>
                      <TableCell align="right">{product?.subtotal || '0,00'} €</TableCell>
                      <TableCell align="right">{product?.taxAmount || '0,00'} €</TableCell>
                      <TableCell align="right">
                        <strong>{product?.total || '0,00'} €</strong>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default ReviewOrder
