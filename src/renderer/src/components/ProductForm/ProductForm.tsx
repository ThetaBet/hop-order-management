import { useAddOrUpdateProduct, useAddProduct, useProductCodeCount } from '@renderer/hooks/useProductsQuery'
import { useSuppliers } from '@renderer/providers/SuppliersProvider'
import { useForm } from 'react-hook-form'
import { ProductFormData } from './contract'
import { useMemo } from 'react'
import { form2Db } from '@renderer/utils/number'
import { Button, CircularProgress, Grid } from '@mui/material'
import Input from '../Form/Input'
import Select from '../Form/Select'

const ProductForm = ({ product }) => {
  const query = useAddOrUpdateProduct(product?.productCode || '')
  const { suppliers } = useSuppliers()
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<ProductFormData>({
    mode: 'onChange',
    defaultValues: {
      productCode: product?.productCode || '',
      productName: product?.productName || '',
      category: product?.category || '',
      netPrice: product?.netPrice?.amount || '',
      taxRate: product?.taxRate || 22,
      supplierId: product?.supplier?.supplierId || -1,
      grossPrice: Number(product?.netPrice?.amount || 0) * (1 + (product?.taxRate || 22) / 100) || 0
    }
  })
  const { data: codeCount, isLoading: isCheckingCode } = useProductCodeCount(watch('productCode'))
  const isCodeExists = codeCount || 0 > 0

  const [netPrice, taxRate] = watch(['netPrice', 'taxRate'])
  const grossPrice = useMemo(() => {
    const parsedNetPrice = form2Db(netPrice)
    if (parsedNetPrice > 0 && taxRate) {
      const calculatedGrossPrice = Number(parsedNetPrice * (1 + taxRate / 100))
      if (isNaN(calculatedGrossPrice)) {
        return 'E'
      }
      return calculatedGrossPrice.toFixed(2)
    }
    return 0
  }, [netPrice, taxRate])

  const onSubmit = async (data: ProductFormData) => {
    const parsedProduct = {
      ...data,
      netPrice: {
        amount: form2Db(data.netPrice),
        currencyCode: 'EUR' as const
      },
      supplier: {
        supplierPrice: data.supplierPrice
          ? {
              amount: form2Db(data.supplierPrice),
              currencyCode: 'EUR' as const
            }
          : undefined,
        supplierId: data.supplierId === -1 ? undefined : data.supplierId
      }
    }
    query.mutate(parsedProduct)
    window.api.window.invalidateQueries('products');
    window.api.window.closeNewProductWindow()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
      <Grid container spacing={2}>
        <Grid size={6}>
          <Input
            name="productCode"
            control={control}
            label="Codice Prodotto"
            placeholder="Inserisci il codice prodotto"
            required
            error={errors.productCode}
            fullWidth
            rules={{
              pattern: {
                message: 'Il codice prodotto può contenere solo lettere e numeri',
                value: /^[a-zA-Z0-9]+$/
              },
              validate: (_value) => (isCodeExists ? 'Il codice prodotto esiste già' : true)
            }}
            endAdornment={isCheckingCode ? <CircularProgress size={24} /> : undefined}
          />
        </Grid>
        <Grid size={6} />
        <Grid size={8}>
          <Input
            name="productName"
            control={control}
            label="Nome Prodotto"
            placeholder="Inserisci il nome del prodotto"
            required
            error={errors.productName}
            fullWidth
          />
        </Grid>
        <Grid size={4}>
          <Input
            name="category"
            control={control}
            label="Categoria"
            placeholder="Inserisci la categoria"
            error={errors.category}
            fullWidth
          />
        </Grid>
        <Grid size={4}>
          <Input
            endAdornment="€"
            name="netPrice"
            control={control}
            label="Prezzo Netto"
            placeholder="0,00"
            required
            error={errors.netPrice}
            fullWidth
            rules={{
              min: {
                value: 0,
                message: 'Il prezzo netto deve essere almeno 0'
              },
              validate: (value) =>
                isNaN(form2Db(value)) ? 'Inserisci un prezzo netto valido' : true
            }}
          />
        </Grid>
        <Grid size={4}>
          <Input
            startAdornment="%"
            name="taxRate"
            control={control}
            label="Aliquota IVA (%)"
            placeholder="22"
            required
            error={errors.taxRate}
            fullWidth
            type="number"
            rules={{
              min: {
                value: 0,
                message: "L'aliquota IVA deve essere almeno 0"
              },
              max: {
                value: 100,
                message: "L'aliquota IVA non può superare 100"
              },
              pattern: {
                value: /^[0-9]+$/,
                message: 'Inserisci solo numeri interi'
              }
            }}
          />
        </Grid>
        <Grid size={4}>
          <Input
            name="grossPrice"
            control={control}
            label="Prezzo Lordo (€)"
            placeholder="Calcolato automaticamente"
            disabled={true}
            helperText="calcolato automaticamente"
            fullWidth
            readOnly
            value={grossPrice}
          />
        </Grid>
        <Grid size={8}>
          <Select
            name="supplierId"
            label="Fornitore"
            control={control}
            placeholder="Seleziona un fornitore"
            fullWidth
            options={[
              { value: -1, label: 'Nessun fornitore' },
              ...suppliers.map((supplier) => ({ value: supplier.id, label: supplier.supplierName }))
            ]}
          />
        </Grid>
        <Grid size={4}>
          <Input
            endAdornment="€"
            name="supplierPrice"
            control={control}
            label="Costo Fornitore"
            placeholder="0,00"
            fullWidth
          />
        </Grid>
        <Grid size={8}></Grid>
        <Grid size={4}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Salva Prodotto
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default ProductForm
