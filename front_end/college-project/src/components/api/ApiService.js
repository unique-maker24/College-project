import { apiClient } from './ApiClient'

export const registerUserApi
    = (user) => apiClient.post(`/register`,user)

export const getAllUsersApi
    = () => apiClient.get(`/users`)

export const deleteUsersApi
    = (id) => apiClient.delete(`/users/${id}`)

export const getUserApi
    = (id) => apiClient.get(`/users/${id}`)

export const updateUserApi
    = (id, user) => apiClient.put(`/users/${id}`, user)
