'use client'

import {
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Container,
  Button,
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import EditProductDialog from '@/app/components/EditProductDialog'
import SearchIcon from '@mui/icons-material/Search'
import EditIcon from '@mui/icons-material/Edit'
import { useEffect, useState } from 'react'
import { ProductQueryParams, listProducts, editProduct, Product } from './API/product'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [productName, setProductName] = useState<string>('')
  const [editDialog, setEditDialog] = useState<boolean>(false)
  const [productToEdit, setProductToEdit] = useState<Partial<Product>>({})

  useEffect(() => {
    getProductsList()
  }, [productName])


  const openEditProductDialog = (product: Product) => {
    setEditDialog(true)
    setProductToEdit(product)
  }

  const closeDialog = () => {
    setEditDialog(false)
    setProductToEdit({})
  }

  const isEditing = productToEdit !== null

  const getProductsList = async () => {
    try {
      const searchParams: ProductQueryParams = { name: productName }
      if (productName === '') delete searchParams.name

      const productResponse = await listProducts(searchParams)
      setProducts(productResponse)
    } catch (error) {
      //alert from search error
      console.log('ERRO')
    }
  }

  const saveProduct = async (product: Product) => {
    console.log('>>>>', product)
    try {
      if (!product) return
      await editProduct(product as Product)
      getProductsList()
      closeDialog()
    } catch (error) {
      //alert from search error
      console.log('ERRO')
    }
  }

  return (
    <main>
      <Container>
        <TextField
          sx={{
            width: 1/1,
            bgcolor: 'white',
            mb: 4,
          }}
          value={productName}
          label="Buscar produto"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon></SearchIcon>
              </InputAdornment>
            )
          }}
          variant="outlined"
          onChange={event => setProductName(event.target.value)}
        />
      <Grid
        container
        columnSpacing={2}
        rowSpacing={1}
      >
        {products.map((product) =>
          <Grid
            key={product.id}
            item
            xs={12}
            md={4}
          >
            <Card
              sx={{
                boxShadow: 3,
                minHeight: 1/1
              }}
            >
              <CardContent>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <Typography
                      color='primary'
                    variant='h5'
                  >
                    { product.name }
                  </Typography>
                  <IconButton
                    onClick={() => openEditProductDialog(product)}
                  >
                    <EditIcon
                      sx={{ height: 20, width: 20 }}
                    />
                  </IconButton>
                </Box>
                <Typography
                  variant='subtitle2'
                  sx={{ mb: 2 }}
                >
                  { product.amount } em estoque
                </Typography>
                <Typography variant='h6'>
                  R$ { new Intl.NumberFormat('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(product.price) }
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
        </Grid>
        <EditProductDialog
          value={editDialog}
          productToEdit={productToEdit}
          onClose={() => setEditDialog(false)}
          onUpdateProduct={saveProduct}
        />
      </Container>
    </main>
  )
}
