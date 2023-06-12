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
