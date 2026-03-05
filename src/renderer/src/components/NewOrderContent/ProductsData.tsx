import { FC, useMemo, useState } from "react";
import { IOrderInfoProps, IProductLineFormProps } from "./types";
import { Button, Card, CardContent, Grid, IconButton, Stack, Typography } from "@mui/material";
import AutoComplete from "../Form/AutoComplete";
import { useFieldArray, useWatch } from "react-hook-form";
import { useProductAutocomplete } from "@renderer/providers/ProductAutocompleteProvider";
import Input from "../Form/Input";
import { db2Form, form2Db } from "@renderer/utils/number";
import { Add, Remove, Warehouse } from "@mui/icons-material";

const ProductLineForm: FC<IProductLineFormProps> = ({ idx, append, control, setValue, remove }) => {
  const { products, isLoading } = useProductAutocomplete();
  const [price, quantity, taxRate, storageQuantity] = useWatch({
    control,
    name: [
      `products.${idx}.price`,
      `products.${idx}.quantity`,
      `products.${idx}.taxRate`,
      `products.${idx}.storageQuantity`
    ]
  });

  const subTotal = useMemo(() => {
    if (!taxRate || !price) return ''
    const subTotal = form2Db(price) * form2Db(quantity);
    return db2Form(subTotal);
  }, [price, taxRate, quantity]); 
  const taxAmount = useMemo(() => {
    if (!taxRate || !price) return ''
    const taxAmount = (form2Db(price) * form2Db(quantity)) * (form2Db(taxRate) / 100);
    return db2Form(taxAmount);
  }, [price, taxRate, quantity]);
  const total = useMemo(() => {
    if (!taxAmount  || !subTotal) return ''
    const total = form2Db(subTotal) + form2Db(taxAmount);
    return db2Form(total);
  }, [taxAmount, subTotal]);

  setValue(`products.${idx}.subtotal`, subTotal,);
  setValue(`products.${idx}.taxAmount`, taxAmount,);
  setValue(`products.${idx}.total`, total,);

  const handleOption = (option) => {
    if (!option) {
      setValue(`products.${idx}.price`, '');
      setValue(`products.${idx}.taxRate`, '');
      setValue(`products.${idx}.storageQuantity`, null);
      return;
    }
    const price = option?.price?.amount || '';
    const taxRate = option?.taxRate || '';
    setValue(`products.${idx}.price`, db2Form(price));
    setValue(`products.${idx}.taxRate`, taxRate);
    setValue(`products.${idx}.storageQuantity`, option.storageQuantity ?? null);
  };

  const warehouseColor = useMemo(() => {
    if (storageQuantity === null) return 'inherit';
    if (quantity === '' || quantity === null) return 'inherit';
    const sq = Number(storageQuantity);
    const q = Number(quantity);
    if (Number.isNaN(sq)) return 'inherit';
    if (sq < q) return 'error';
    if (sq - q < 5) return 'warning';
    return 'success';
  }, [storageQuantity, quantity]);

  return (
    <Grid container spacing={1} alignItems="top">
      <Grid size={3}>
        <AutoComplete
          size="small"
          name={`products.${idx}.product`}
          label={`Prodotto #${idx + 1}`}
          fullWidth
          control={control}
          loading={isLoading}
          options={products.map((product) => ({
            label: `(${product.productCode}) ${product.productName}`,
            value: product.id,
            id: product.id,
            key: product.id,
            code: product.productCode,
            price: product.netPrice,
            taxRate: product.taxRate,
            storageQuantity: product.storageQuantity
          }))}
          onOptionChange={handleOption}
          required
        />
      </Grid>
      <Grid size={1.5}>
        <Input
          size="small"
          name={`products.${idx}.quantity`}
          label="Quantità"
          type="number"
          fullWidth
          control={control}
          required
          endAdornment={<Warehouse color={warehouseColor} />}
          rules={{
            min: {
              value: 1,
              message: 'Almeno un pezzo/unità'
            }
          }}
        />
      </Grid>
      <Grid size={1}>
        <Input
          endAdornment="€"
          name={`products.${idx}.price`}
          label="Prezzo"
          fullWidth
          control={control}
          size="small"
          required
        />
      </Grid>
      <Grid size={1}>
        <Input
          name={`products.${idx}.taxRate`}
          label="IVA"
          endAdornment="%"
          fullWidth
          control={control}
          size="small"
          required
          rules={{
            min: {
              value: 0,
              message: "L'IVA deve essere almeno 0"
            },
            max: {
              value: 100,
              message: "L'IVA non può superare 100"
            },
            pattern: {
              value: /^[0-9]+$/,
              message: 'Inserisci solo numeri interi'
            }
          }}
        />
      </Grid>
      <Grid size={1.5}>
        <Input
          name={`products.${idx}.subtotal`}
          label="Netto"
          endAdornment="€"
          fullWidth
          control={control}
          readOnly
          size="small"
        />
      </Grid>
      <Grid size={1}>
        <Input
          name={`products.${idx}.taxAmount`}
          label="IVA"
          endAdornment="€"
          fullWidth
          control={control}
          readOnly
          size="small"
        />
      </Grid>
      <Grid size={2}>
        <Input
          name={`products.${idx}.total`}
          label="Lordo"
          endAdornment="€"
          fullWidth
          control={control}
          readOnly
          size="small"
        />
      </Grid>
      <Grid size={1} display="flex" justifyContent="center" alignItems="baseline">
        <IconButton
          color="error"
          disabled={idx === 0}
          onClick={() => remove(idx)}
        >
          <Remove />
        </IconButton>
      </Grid>
    </Grid>
  )
}

const ProductsData: FC<IOrderInfoProps> = ({ control, setValue }) => {
  const { fields, append, remove } = useFieldArray({
    control, 
    name: 'products'
  });
  if (fields.length === 0) {
    append({
      product: null,
      quantity: '',
      price: '',
      taxRate: '',
      subtotal: '',
      taxAmount: '',
      total: '',
      storageQuantity: null
    });
  }
  
  return (
    <>
          <Stack spacing={2} mb={2}>
            {fields.map((field, index) => (
              <ProductLineForm
                key={field.id}
                idx={index}
                append={append}
                remove={remove}
                control={control}
                setValue={setValue!}
              />
            ))}
          </Stack>
      <Grid container>
        <Grid size={10} />
        <Grid size={2} display="flex" justifyContent="center">
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Add />}
            onClick={() =>
              append({
                product: null,
                quantity: '',
                price: '',
                taxRate: '',
                subtotal: '',
                taxAmount: '',
                total: '',
                storageQuantity: null
              })
            }
          >
            Aggiungi Prodotto
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default ProductsData;