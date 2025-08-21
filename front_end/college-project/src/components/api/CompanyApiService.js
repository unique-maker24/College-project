import { apiClient } from './ApiClient'

export const retrieveAllCompaniesApi
    = () => apiClient.get(`/companies`)

export const deleteCompanyApi
    = (id) => apiClient.delete(`/companies/${id}`)

export const retrieveCompanyApi
    = (id) => apiClient.get(`/companies/${id}`)

export const updateCompanyApi
    = (id, company) => apiClient.put(`/companies/${id}`, company)

export const createCompanyApi
    = (company) => {apiClient.post(`/companies`, company)}
