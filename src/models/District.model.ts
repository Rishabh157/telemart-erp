/// ==============================================
// Filename:District.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type DistrictListResponse = {
    districtName: string
    stateId: string
    countryId: string
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type AddDistrict = {
    districtName: string
    stateId: string
    companyId: string
    countryId: string
}

export type UpdateDistrict = {
    body: {
        districtName: string
        stateId: string
        companyId: string
        countryId: string
    }
    id: string
}
