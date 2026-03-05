import ProductDetailContent from "@renderer/components/ProductDetail/ProductDetailContent";
import ProductProvider from "@renderer/providers/ProductProvider";
import StorageProvider from "@renderer/providers/StorageProvider";
import { FC } from "react";
import { useParams } from "react-router-dom";

const ProductDetails: FC = () => {
  const { productCode } = useParams<{ productCode: string }>();
  return (
    <ProductProvider productCode={productCode!}>
      <StorageProvider>
        <ProductDetailContent />
      </StorageProvider>
    </ProductProvider>
  )
}

export default ProductDetails;