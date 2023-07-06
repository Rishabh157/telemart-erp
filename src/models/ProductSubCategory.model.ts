/// ==============================================
// Filename:ProductSubCAtegory.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type ProductSubCategoryListResponse = {
    subCategoryCode: string
    subCategoryName: string
    parentCategoryId: string
    parentCategoryLabel: string
    applicableTaxesLabel: string
    hsnCode: string
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type AddProductSubCategory = {
    subCategoryCode: string
    subCategoryName: string
    parentCategoryId: string
    hsnCode: string
    companyId: string
}

export type UpdateProductSubCategory = {
    body: {
        subCategoryCode: string
        subCategoryName: string
        parentCategoryId: string
        hsnCode: string
        companyId: string
    }
    id: string
}
