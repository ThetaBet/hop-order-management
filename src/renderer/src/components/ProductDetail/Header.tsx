import { Box, Stack, Typography } from "@mui/material";
import { useProduct } from "@renderer/providers/ProductProvider";
import { FC } from "react";

const Header: FC = () => {
  const { product } = useProduct();
  if (!product) return null;

  return (
    <Box sx={{py: 2, mb: 1}}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h4" gutterBottom flexGrow={1}>
          {product.productName}
        </Typography>
      </Stack>
    </Box>
  )
}

export default Header;