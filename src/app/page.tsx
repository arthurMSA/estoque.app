'use client'

import {
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Button,
  Box,
  IconButton,
} from '@mui/material'
import { useEffect, useState } from 'react'
import {
  ProductQueryParams,
  listProducts,
  editProduct,
  Product,
  createProduct,
} from './API/product'
import DialogProduct from '@/app/components/DialogProduct'
import SearchIcon from '@mui/icons-material/Search'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [productName, setProductName] = useState<string>('')
  const [editDialog, setEditDialog] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [productToEdit, setProductToEdit] = useState<Partial<Product>>({})

  useEffect(() => {
    const searchDelayTimer = setTimeout(() => {
      getProductsList()
    }, 500)
    return () => clearTimeout(searchDelayTimer)
  }, [productName])


  const openDialogProduct = (product: Partial<Product>) => {
    setIsEditing(Object.keys(product).length !== 0)
    setEditDialog(true)
    setProductToEdit(product)
  }

  const closeDialog = () => {
    setIsEditing(false)
    setEditDialog(false)
    setProductToEdit({})
  }

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
    try {
      if (!product) return
      if (isEditing) 
        await editProduct(product)
      else
        await createProduct(product)
      await getProductsList()
      closeDialog()
    } catch (error) {
      //alert from search error
      console.log('ERRO')
    }
  }

  return (
    <main>
      <Container>
        <Grid
          container
          columnSpacing={1}
          rowSpacing={2}
          justifyContent='space-between'

        >
          <Grid
            item
            xs={12}
            md={9}
            alignSelf='center'
          >
            <TextField
              sx={{
                width: 1/1,
                bgcolor: 'white',
                mb: 4,
              }}
              value={productName}
              label='Buscar produto'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <SearchIcon></SearchIcon>
                  </InputAdornment>
                )
              }}
              variant='outlined'
              onChange={event => setProductName(event.target.value)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
          >
            <Button
              variant='contained'
              size='large'
              startIcon={<AddIcon />}
              onClick={() => openDialogProduct({})}
            >
              NOVO PRODUTO
            </Button>
          </Grid>
      </Grid>
      <Grid
        container
        columnSpacing={1}
        rowSpacing={2}
        sx={{
          mt: 2
        }}
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
                    onClick={() => openDialogProduct(product)}
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
        <DialogProduct
          value={editDialog}
          productToEdit={productToEdit}
          isEditing={isEditing}
          onClose={() => setEditDialog(false)}
          onSaveProduct={saveProduct}
        />
      </Container>
    </main>
  )
}
