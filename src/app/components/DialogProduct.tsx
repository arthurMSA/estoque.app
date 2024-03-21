import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
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
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [open, setOpen] = useState<boolean>(value)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setProduct(productToEdit)
    setOpen(value)
  }, [productToEdit, value])


  const closeDialog = () => {
    setOpen(false)
    setErrorMessage('')
    onClose()
  }

  const saveProduct = async () => {
    if (product.name === '' || !product.price || !product.amount) {
      setErrorMessage('* Preencha os campos')
      return
    }
    if (product?.price < 0) {
      setErrorMessage('Dados inválidos')
      return
    }
    setErrorMessage('')
    setIsLoading(true)
    await onSaveProduct(product)
    setIsLoading(false)
  }

  return (
    <Dialog
      open={open}
      fullWidth
      onClose={() => onClose()}
    >
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
            color='error'
            variant='body2'
          >
            { errorMessage }
          </Typography>
          <TextField
            defaultValue={product?.name}
            label='Nome'
            required
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
            defaultValue={product?.price}
            label='Preço'
            required
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: <InputAdornment position='start'>R$</InputAdornment>,
            }}
            onChange={(event) =>
              setProduct((product) => ({
                ...product,
                price: Number(event.target.value),
              }))
            }
          />
          <TextField
            defaultValue={product?.amount}
            label='Quantidade'
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
      <DialogActions sx={{ pr: 2 }}>
        <Button onClick={() => closeDialog()}>Cancelar</Button>
        <LoadingButton
          variant='contained'
          loading={isLoading}
          onClick={() => saveProduct()}
        >
          Salvar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}
