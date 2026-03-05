import OrderProvider from "@renderer/providers/OrderProvider";
import { FC } from "react";
import { useParams } from "react-router-dom";
import OrderDetailContent from "@renderer/components/OrderDetail/OrderDetailContent";

const OrderDetails: FC = () => {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  return (
    <OrderProvider orderNumber={Number(orderNumber!)}>
      <OrderDetailContent />
    </OrderProvider>
  )
}

export default OrderDetails;