import { apiClient } from './ApiClient'

export const retrieveAllCategoriesApi
    = () => apiClient.get(`/categories`)

export const deleteCategoryApi
    = (id) => apiClient.delete(`/categories/${id}`)

export const retrieveCategoryApi
    = (id) => apiClient.get(`/categories/${id}`)

export const updateCategoryApi
    = (id, productCategory) => apiClient.put(`/categories/${id}`, productCategory)

export const createCategoryApi
    = (productCategory) => {apiClient.post(`/categories`, productCategory)}
