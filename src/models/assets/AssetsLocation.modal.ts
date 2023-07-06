/// ==============================================
// Filename:AssetsLocation.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type AssetsLocationListResponse = {
    locationName: string
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type AddAssetsLocation = {
    locationName: string
    companyId: string
}

export type UpdateAssetsLocation = {
    body: {
        locationName: string
        companyId: string
    }
    id: string
}
