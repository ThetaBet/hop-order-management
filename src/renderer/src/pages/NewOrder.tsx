import NewOrderContent from "@renderer/components/NewOrderContent/NewOrderContent";
import CustomerAutocompleteProvider from "@renderer/providers/CustomerAutocompleteProvider";
import CustomerProvider from "@renderer/providers/CustomerProvider";
import DriversProvider from "@renderer/providers/DriversProvider";
import { FC } from "react";
import { useSearchParams } from "react-router-dom";

const NewOrder: FC = () => {
  const [searchParams] = useSearchParams()
  return (
    <CustomerProvider customerCode={searchParams.get('customerCode')}>
      <DriversProvider>
      <CustomerAutocompleteProvider>
        <NewOrderContent />
      </CustomerAutocompleteProvider>
      </DriversProvider>
    </CustomerProvider>
  );
}

export default NewOrder;