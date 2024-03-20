import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Box,
    TextField,
} from '@mui/material'
import { Product } from '@/app/API/product'
import { useEffect, useState } from 'react'


export default function EditProductDialog({ productToEdit, value, onClose, onUpdateProduct }) {
    const [product, setProduct] = useState<Partial<Product>>({})

    useEffect(() => {
        console.log('>>prop', productToEdit)
        setProduct(productToEdit)
    }, [productToEdit])

    const isEditing = ((): boolean => {
        return Object.keys(productToEdit).length !== 0
      })()

    return (
        <Dialog
            open={value}
            keepMounted
            onClose={() => onClose()}
        >
          <DialogTitle>
            Editar Produto
            {isEditing}
          </DialogTitle>
          <DialogContent>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
            }}>
              <TextField
                value={product?.name}
                label="Nome"
                InputLabelProps={{
                  shrink: isEditing,
                }}
                sx={{ my: 2 }}
                onChange={
                  event => setProduct(product => ({ ...product, name: event.target.value }) )
                }
              />
              <TextField
                value={product?.price}
                label='Preço'
                InputLabelProps={{
                  shrink: isEditing,
                }}
                sx={{ mb: 2 }}
                onChange={
                  event => setProduct(product => ({ ...product, price: Number(event.target.value) }) )
                }
              />
              <TextField
                value={product?.amount}
                label="Quantidade"
                InputLabelProps={{
                  shrink: isEditing,
                }}
                sx={{ mb: 2 }}
                onChange={
                  event => setProduct(product => ({ ...product, amount: Number(event.target.value) }) )
                }
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => onClose()}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={() => onUpdateProduct(product)}
            >
              Salvar
            </Button>
          </DialogActions>
      </Dialog>
    )
}