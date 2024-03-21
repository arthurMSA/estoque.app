import defaultApiClient from './defaultApiClient'
import { Product } from '../entities/product'

export type ProductQueryParams = {
  name?: string,
  page: number,
}

export const listProducts = async (params: ProductQueryParams) => {
  const { data } = await defaultApiClient.get('/products', { params })
  return data
}

export const editProduct = async (product: Product) => {
  const { data } = await defaultApiClient.patch(`/products/${product.id}`, {
    ...product,
  })
  return data
}

export const createProduct = async (product: Product) => {
  const { data } = await defaultApiClient.post('/products', {
    ...product,
  })
  return data
}

export const deleteProduct = async (productId: string) => {
  const { data } = await defaultApiClient.delete(`/products/${productId}`)
  return data
}
