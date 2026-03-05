import { createContext, useContext } from "react";
import { IProductProviderContext } from "./types";
import { useProductsForAutocomplete } from "@renderer/hooks/useProductsQuery";

const ProductAutocompleteContext = createContext<Omit<IProductProviderContext, 'refetch'> | null>(null);

const ProductAutocompleteProvider = ({ children }) => {
  const { data: products = [], isLoading, error } = useProductsForAutocomplete();

  return (
    <ProductAutocompleteContext.Provider value={{ products, isLoading, error }}>
      {children}
    </ProductAutocompleteContext.Provider>
  );
}

export const useProductAutocomplete = () => {
  const context = useContext(ProductAutocompleteContext);
  if (context === null) {
    throw new Error('useProductAutocomplete must be used within a ProductAutocompleteProvider');
  }
  return context;
}

export default ProductAutocompleteProvider;