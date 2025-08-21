import { apiClient } from './ApiClient'

export const retrieveAllProductsApi
    = () => apiClient.get(`/products`)

export const deleteProductApi
    = (id) => apiClient.delete(`/products/${id}`)

export const retrieveProductApi
    = (id) => apiClient.get(`/products/${id}`)

export const updateProductApi
    = (id, product) => apiClient.put(`/products/${id}`, product)

export const createProductApi
    = (product) => apiClient.post(`/products`, product)

export const retrieveProductsByUsers
    = () => apiClient.get(`/products`)
