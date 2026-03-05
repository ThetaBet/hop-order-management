import { useProduct } from "@renderer/providers/ProductProvider";
import { FC } from "react";
import InfoCard, { InfoLine } from "../InfoCard/InfoCard";
import { Box } from "@mui/material";
import { formatCurrency } from "@renderer/utils/number";

export const ProductInfoCard: FC = () => {
  const { product } = useProduct();
  if (!product) return null;

  return (
    <InfoCard title="Informazioni prodotto">
      <Box display="flex" flexDirection="column" gap={1}>
        <InfoLine title="Codice Prodotto:" value={product.productCode} />
        <InfoLine title="Nome Prodotto:" value={product.productName} />
        <InfoLine title="Categoria:" value={product.category || '-'} />
        <InfoLine title="Prezzo Unitario:" value={formatCurrency(product.netPrice.amount)!} />
      </Box>
    </InfoCard>
  )
}

export default ProductInfoCard;