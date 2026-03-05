import { Box } from "@mui/material";
import EditCustomerContent from "@renderer/components/EditCustomerContent/EditCustomerContent";
import CustomerProvider from "@renderer/providers/CustomerProvider";
import { FC } from "react";
import { useParams } from "react-router-dom";


const EditCustomer: FC = () => {
  const params = useParams();
  return (
    <Box height="100%" display="flex" flexDirection="column">
      <CustomerProvider customerCode={params.customerCode}>
        <EditCustomerContent />
      </CustomerProvider>
    </Box>
  )
}

export default EditCustomer;  
