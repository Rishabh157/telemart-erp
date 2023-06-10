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
