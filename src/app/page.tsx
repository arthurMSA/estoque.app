'use client'

import {
  TextField,
  InputAdornment,
  Grid,
  Typography,
  Container,
  Button,
  Snackbar,
  Alert,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { ProductQueryParams } from './API/product'
import API from './API/product'
import { Product } from './entities/product'
import DialogProduct from '@/app/components/product/DialogProduct'
import ListProduct from '@/app/components/product/ListProduct'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [productName, setProductName] = useState<string>('')
  const [editDialog, setEditDialog] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [productToEdit, setProductToEdit] = useState<Partial<Product>>({})
  const [countProducts, setCountProducts] = useState(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    const searchDelayTimer = setTimeout(() => {
      getProductsList()
    }, 500)
    return () => clearTimeout(searchDelayTimer)
  }, [productName])

  const productsIsEmpty = products.length === 0

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

  const onChangeListPagination = (page: number) => {
    setCurrentPage(page)
    getProductsList(page)
  }


  const getProductsList = async (page: number = 1) => {
    try {
      setIsLoading(true)
      const searchParams: ProductQueryParams = {
        name: productName,
        page,
      }
      if (productName === '') delete searchParams.name

      const productResponse = await API.listProducts(searchParams)
      setCountProducts(productResponse.count)
      setProducts(productResponse.products)
    } catch (_) {
      setErrorMessage('Erro ao carregar produtos')
    } finally {
      setIsLoading(false)
    }
  }

  const saveProduct = async (product: Product) => {
    try {
      if (!product) return
      if (isEditing) 
        await API.editProduct(product)
      else
        await API.createProduct(product)
      await getProductsList()
      closeDialog()
    } catch (_) {
      setErrorMessage('Erro ao salvar produto')
    }
  }

  const deleteProduct = async (productId: string) => {
    try {
      await API.deleteProduct(productId)
      getProductsList()
    } catch (error) {
      setErrorMessage('Erro ao excluir produto')
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
          sx={{
            mb: 4,
          }}
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
        { 
          isLoading || productsIsEmpty ?
            (
            <Typography
              variant='h4'
            >
              {
                isLoading
                ? 'Buscando ...'
                : 'Nenhum produto encontrado'
              }
            </Typography>
          ) : (
            <ListProduct
              products={products}
              countProducts={countProducts}
              currentPage={currentPage}
              onDelete={deleteProduct}
              onEdit={openDialogProduct}
              onPageChange={onChangeListPagination}
            />
          )
        }
        <DialogProduct
          value={editDialog}
          productToEdit={productToEdit}
          isEditing={isEditing}
          onClose={() => setEditDialog(false)}
          onSaveProduct={saveProduct}
        />
      </Container>
      <Snackbar
        open={errorMessage !== ''}
        message={errorMessage}
        color='error'
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={() => setErrorMessage('')}
      >
        <Alert
          severity='error'
        >
          { errorMessage }
        </Alert>
      </Snackbar>
    </main>
  )
}
