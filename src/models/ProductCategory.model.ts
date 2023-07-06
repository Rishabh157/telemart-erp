/// ==============================================
// Filename:ProductCategory.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Internal Dependencies --|
import { companyApi } from './../services/CompanyServices'

// |-- Types --|
export type ProductCategoryListResponse = {
    categoryCode: string
    categoryName: string
    companyId: string
    district: string
    is_active: boolean
    is_deleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type AddProductCategory = {
    categoryCode: string
    categoryName: string
    companyId: string
}

export type UpdateProductCategory = {
    body: {
        categoryCode: string
        categoryName: string
        companyId: string
    }
    id: string
}
