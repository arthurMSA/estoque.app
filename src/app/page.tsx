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
  createProduct,
  deleteProduct,
} from './API/product'
import { Product } from './entities/product'
import DialogProduct from '@/app/components/DialogProduct'
import ListProduct from '@/app/components/ListProduct'
import SearchIcon from '@mui/icons-material/Search'
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

  const removeProduct = async (productId: string) => {
    try {
      await deleteProduct(productId)
      getProductsList()
    } catch (error) {
      console.log('ERRO')
    }
  }
  return (
    <main>
      <Container>
        <Typography
          variant='h3'
          color='primary'
          sx={{
            my: 4,
          }}
        >
          Gerenciar Produtos
        </Typography>
        <Grid
          container
          columnSpacing={1}
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
            alignSelf='center'
          >
            <Button
              variant='contained'
              size='large'
              startIcon={<AddIcon />}
              sx={{
                width: 1/1,
                '@media (max-width: 600px)': {
                  mt: 3,
                },
              }}
              onClick={() => openDialogProduct({})}
            >
              NOVO PRODUTO
            </Button>
          </Grid>
        </Grid>
        <ListProduct
          products={products}
          onDelete={removeProduct}
          onEdit={openDialogProduct}
        />
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
