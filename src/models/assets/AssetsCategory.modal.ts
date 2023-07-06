/// ==============================================
// Filename:AssetsCategory.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type AssetsCategoryListResponse = {
    assetCategoryName: string
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type AddAssetsCategory = {
    assetCategoryName: string
    companyId: string
}

export type UpdateAssetsCategory = {
    body: {
        assetCategoryName: string
        companyId: string
    }
    id: string
}
