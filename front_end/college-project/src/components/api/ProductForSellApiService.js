import { apiClient } from './ApiClient'

export const retrieveAllProductsForSellApi
    = (username) => apiClient.get(`/${username}/products-for-sell`)

export const deleteProductForSellApi
    = (id) => apiClient.delete(`/product-for-sale/${id}`)

export const retrieveProductForSellApi
    = (id) => apiClient.get(`/product-for-sale/${id}`)

export const updateProductForSellApi
    = (id, product) => apiClient.put(`/product-for-sale/${id}`, product)

export const createProductForSellApi
    = (username,product) => apiClient.post(`/${username}/product-for-sale`, product)

export const searchProduct
    = (searchParam) => apiClient.get(`/product-for-sale/search?param=${searchParam}`)
