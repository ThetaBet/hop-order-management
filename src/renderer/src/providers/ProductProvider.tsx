import { createContext, useContext } from "react";
import { IProductProviderContext } from "./types";
import { useProductByCode } from "@renderer/hooks/useProductsQuery";
import { useQueryInvalidationListener } from "@renderer/hooks/useQueryInvalidationListener";

const ProductContext = createContext<IProductProviderContext | null>(null);

const ProductProvider = ({ children, productCode }) => {
  const { data = null, isLoading, error } = useProductByCode(productCode);
  useQueryInvalidationListener();

  return (
    <ProductContext.Provider value={{ product: data, isLoading, error }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === null) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
}

export default ProductProvider;