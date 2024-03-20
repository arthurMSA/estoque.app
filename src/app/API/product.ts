import apiClient from './apiClient'

export type Product = {
  id: string
  name: string
  price: number
  amount: number
}

export type ProductQueryParams = {
  name?: string
}

const listProducts = async (params: ProductQueryParams) => {
  const { data } = await apiClient.get('/products', { params })
  return data
}

const editProduct = async (product: Product) => {
  const { data } = await apiClient.patch(`/products/${product.id}`, {
    ...product,
  })
  return data
}

const createProduct = async (product: Product) => {
  const { data } = await apiClient.post('/products', {
    ...product,
  })
  return data
}

export {
  listProducts,
  editProduct,
  createProduct,
}
