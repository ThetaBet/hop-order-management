import { Box, Grid, Stack, } from "@mui/material";
import { FC, useState } from "react";
import Header from "./Header";
import { useForm } from "react-hook-form";
import { useCustomer } from "@renderer/providers/CustomerProvider";
import { NewOrderFormValues } from "./types";
import OrderTimeline from "./OrderTimeline";
import TimelineContent from "./TimelineContent";
import { useCustomerByCode } from "@renderer/hooks/useCustomersQuery";
import { formatCustomerAddress } from "@renderer/utils/string";
import BottomInfo from "./BottomInfo";
import { useAddOrder } from "@renderer/hooks/useOrdersQuery";
import { INewOrder } from "@renderer/utils/types";
import { formatISO } from "date-fns";
import { form2Db, getRecap } from "@renderer/utils/number";
import { useNavigate } from "react-router-dom";

const NewOrderContent: FC = () => {
  const navigate = useNavigate();
  const { customer: defaultCustomer } = useCustomer();
  const [activeStep, setActiveStep] = useState<number>(0);
  const query = useAddOrder();
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    watch,
    getValues,
    reset
  } = useForm<NewOrderFormValues>({
    mode: 'onChange',
    defaultValues: {
      customer: defaultCustomer?.customerCode ? { label: `(${defaultCustomer.customerCode}) ${defaultCustomer.customerName}`, value: defaultCustomer.id, key: defaultCustomer.customerCode, id: defaultCustomer.customerCode, code: defaultCustomer.customerCode } : null,
      orderDate: new Date(),
      products: [],
      deliveryDate: new Date(),
      timeSlot: '',
      driverId: '',
      deliveryAddress: defaultCustomer ? formatCustomerAddress(defaultCustomer) : '',
      deliveryStatus: false,
      paymentStatus: 'PENDING',
      notes: ''
    }
  });

  const customer = useCustomerByCode(watch('customer')?.code || '', false).data; 

  if (customer && getValues('deliveryAddress') === '') {
    setValue('deliveryAddress', formatCustomerAddress(customer));
  }

      const handleNext = async () => {
        const fieldsToValidate: Array<keyof NewOrderFormValues> = []
        switch (activeStep) {
          case 0:
          fieldsToValidate.push('customer', 'orderDate')
            break;
          case 1:
            fieldsToValidate.push('products')
            break;
          case 2:
            fieldsToValidate.push('deliveryDate', 'timeSlot', 'driverId', 'deliveryAddress', 'deliveryStatus')
            break;
          case 3:
            fieldsToValidate.push('paymentStatus', 'notes')
            break;
          default:
            break;
        }
        const isValid = await trigger(fieldsToValidate)
        if (!isValid) return
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
      }

      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
      }

      const handleReset = () => {
        setActiveStep(0);
        reset();
      }

      const onSubmit = (data: NewOrderFormValues) => {
        try {
          const recap = getRecap(data.products);
          const parsedData: INewOrder = {
            customerId: Number(data.customer?.id),
            orderDate: formatISO(data.orderDate),
            delivery: {
              date: formatISO(data.deliveryDate),
              deliveryAddress: data.deliveryAddress,
              timeSlot: data.timeSlot || undefined,
              status: false,
            },
            driverId: Number(data.driverId),
            totalAmount: {amount: recap.total, currencyCode: 'EUR'},
            subtotalAmount: {amount: recap.subtotal, currencyCode: 'EUR'},
            taxAmount: {amount: recap.taxAmount, currencyCode: 'EUR'},
            paymentStatus: false,
            notes: data.notes,
            rows: data.products.map(item => ({
              productId: Number(item.product?.id),
              quantity: Number(item.quantity),
              unitPrice: {amount: form2Db(item.price), currencyCode: 'EUR'},
              totalPrice: {amount: form2Db(item.subtotal), currencyCode: 'EUR'},
              taxRate: Number(item.taxRate),
              taxAmount: {amount: form2Db(item.taxAmount), currencyCode: 'EUR'},
              totalGrossPrice: {amount: form2Db(item.total), currencyCode: 'EUR'},
              // storageQuantity: item.storageQuantity !== undefined && item.storageQuantity !== null ? Number(item.storageQuantity) : undefined
            }))
          }
          query.mutate(parsedData);
          navigate(-1);
        } catch (error) {
          console.error('Error submitting order:', error);
        }
      }

  return (
    <Box>
      <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Header control={control} />
        <Box display="flex" gap={3}>
          <Box minWidth="200px">
            <OrderTimeline activeStep={activeStep} />
          </Box>
          <Box>
            <Stack spacing={1}>
              <TimelineContent
                activeStep={activeStep}
                control={control}
                onBack={handleBack}
                onNext={handleNext}
                onReset={handleReset}
                customer={customer || null}
                setValue={setValue}
              />
              <BottomInfo activeStep={activeStep} control={control} customer={customer || null} />
            </Stack>
          </Box>
        </Box>
      </form>
    </Box>
  )
}

export default NewOrderContent; 