import CustomerProvider from "@renderer/providers/CustomerProvider";
import { useParams } from "react-router-dom";
import CustomerDetailsContent from "../components/CustomerDetail/CustomerDetailsContent";
import { FC } from "react";

const CustomerDetails: FC = () => {
  const { customerCode } = useParams<{ customerCode: string }>();
  return (
    <CustomerProvider customerCode={customerCode!}>
      <CustomerDetailsContent />
    </CustomerProvider>
  )
}

export default CustomerDetails;