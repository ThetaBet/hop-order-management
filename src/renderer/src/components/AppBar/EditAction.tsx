import { Cancel, Close, Edit, Print, Save } from "@mui/icons-material"
import { Box, IconButton } from "@mui/material"
import { printCustomerDetails } from "@renderer/dbOperations/customers"
import { useEditCustomer } from "@renderer/providers/EditCustomerProvider"
import { FC } from "react"

const EditAction: FC<{ closeApi: () => Promise<void> }> = ({ closeApi }) => {
  const { isEditing, toggleEditing, handleSubmit, customerCode } = useEditCustomer()
  if (isEditing) {
    return (
      <Box>
        <IconButton
          sx={{ appRegion: 'no-drag' }}
          color="inherit"
          size="large"
          edge="end"
          onClick={handleSubmit}
        >
          <Save />
        </IconButton>
        <IconButton
          sx={{ appRegion: 'no-drag' }}
          color="inherit"
          size="large"
          edge="end"
          onClick={() => toggleEditing(false)}
        >
          <Cancel />
        </IconButton>
      </Box>
    )
  }
  return (
    <Box>
      <IconButton
        sx={{ appRegion: 'no-drag' }}
        color="inherit"
        size="large"
        edge="end"
        onClick={() => {
          printCustomerDetails(customerCode).catch((error) => {
            console.error('Error printing customer details:', error);
          });
        }}
      >
        <Print />
      </IconButton>
      <IconButton
        sx={{ appRegion: 'no-drag' }}
        color="inherit"
        size="large"
        edge="end"
        onClick={() => toggleEditing(true)}
      >
        <Edit />
      </IconButton>
      <IconButton
        sx={{ appRegion: 'no-drag' }}
        color="inherit"
        size="large"
        edge="end"
        onClick={closeApi}
      >
        <Close />
      </IconButton>
    </Box>
  )
}

export default EditAction