import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useProduct } from "@renderer/providers/ProductProvider";
import { FC } from "react";
import Header from "./Header";
import ProductInfoCard from "./ProductInfoCard";
import ProductActions from "./ProductActions";

const ProductDetailContent: FC = () => {
  const { product, isLoading, error } = useProduct();
  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading product details: {error.message}</Typography>;
  if (!product) return <Typography>Product not found</Typography>;
  return (
    <Box>
      <Header />
      <Grid container spacing={3}>
        <Grid size={8}>
          <ProductInfoCard />
        </Grid>
        <Grid size={4}>
          <ProductActions />
        </Grid>
        <Grid size={6}>
        </Grid>
        <Grid size={6}>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProductDetailContent;