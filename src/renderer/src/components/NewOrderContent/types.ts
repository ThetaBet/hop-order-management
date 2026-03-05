import { ICustomer, TTimeSlot } from "@renderer/utils/types";
import { Control, UseFieldArrayAppend, UseFormSetValue } from "react-hook-form";

export interface NewOrderFormValues {
  customer: {
    label: string;
    value: number;
    key: string;
    id: string;
    code: string;
    name: string;
  } | null;
  orderDate: Date;
  products: INewOrderProductsFormValues[];
  deliveryDate: Date;
  timeSlot: TTimeSlot | '';
  driverId: number | '';
  deliveryAddress: string;
  deliveryStatus: boolean;
  paymentStatus: string;
  notes: string;
}

export interface INewOrderProductsFormValues {
  product: {
    label: string;
    value: number;
    key: string;
    id: string;
    code: string;
    name: string;
  } | null;
  quantity: number | '';
  price: string | '';
  taxRate: string | '';
  subtotal: string | '';
  taxAmount: string | '';
  total: string | '';
}

export interface INewOrderContentHeaderProps {
  control: Control<NewOrderFormValues>;
}

export interface IOrderInfoProps {
  control: Control<NewOrderFormValues>;
  customer?: ICustomer | null;
  setValue?: UseFormSetValue<NewOrderFormValues>;
  activeStep?: number;
}

export interface ITimelineContentProps {
  activeStep: number;
  control: Control<NewOrderFormValues>;
  onNext: () => void;
  onBack: () => void;
  onReset: () => void;
  customer: ICustomer | null;
  setValue?: UseFormSetValue<NewOrderFormValues>;
}

export interface IProductLineFormProps {
  idx: number;
  append: UseFieldArrayAppend<NewOrderFormValues, "products">;
  remove: (index: number) => void;
  control: Control<NewOrderFormValues>;
  setValue: UseFormSetValue<NewOrderFormValues>; 
}

export interface IOrderRecapProps {
  control: Control<NewOrderFormValues>;
  step: number;
}