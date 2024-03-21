import defaultApiClient from './defaultApiClient'
import { Product } from '@/app/entities/product'

export type ProductQueryParams = {
  name?: string,
  page: number,
}

const listProducts = async (params: ProductQueryParams) => {
  const { data } = await defaultApiClient.get('/products', { params })
  return data
}

const editProduct = async (product: Product) => {
  const { data } = await defaultApiClient.patch(`/products/${product.id}`, {
    ...product,
  })
  return data
}

const createProduct = async (product: Product) => {
  const { data } = await defaultApiClient.post('/products', {
    ...product,
  })
  return data
}

const deleteProduct = async (productId: string) => {
  const { data } = await defaultApiClient.delete(`/products/${productId}`)
  return data
}

const API = {
  listProducts,
  editProduct,
  createProduct,
  deleteProduct
}

export default API
