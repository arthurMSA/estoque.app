import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  TextField,
  Typography,
} from '@mui/material'
import { Product } from '@/app/entities/product'
import { useEffect, useState } from 'react'

export default function DialogProduct({
  productToEdit,
  value,
  isEditing,
  onClose,
  onSaveProduct,
}) {
  const [product, setProduct] = useState<Partial<Product>>({})
  const [errorMessage, setErrorMessage] = useState('')
  const [open, setOpen] = useState(value)

  useEffect(() => {
    console.log(isEditing)
    setProduct(productToEdit)
    setOpen(value)
  }, [productToEdit, value])


  const closeDialog = () => {
    setOpen(false)
    onClose()
  }

  const saveProduct = () => {
    if (product.name === '' || product.price === 0) {
      setErrorMessage('Dados inválidos')
      return
    }
    setErrorMessage('')
    onSaveProduct(product)
  }

  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle variant='h5'>
        { isEditing ? 'Editar Produto' : 'Novo Produto'}
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography
            color="error"
            variant='caption'
          >
            {errorMessage}
          </Typography>
          <TextField
            value={product?.name}
            label="Nome"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ my: 2 }}
            onChange={(event) =>
              setProduct((product) => ({
                ...product,
                name: event.target.value,
              }))
            }
          />
          <TextField
            value={product?.price}
            label="Preço"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2 }}
            onChange={(event) =>
              setProduct((product) => ({
                ...product,
                price: Number(event.target.value),
              }))
            }
          />
          <TextField
            value={product?.amount}
            label="Quantidade"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2 }}
            onChange={(event) =>
              setProduct((product) => ({
                ...product,
                amount: Number(event.target.value),
              }))
            }
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closeDialog()}>Cancelar</Button>
        <Button variant="contained" onClick={() => saveProduct()}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
