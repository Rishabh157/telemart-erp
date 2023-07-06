/// ==============================================
// Filename:Tehsil.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type TehsilListResponse = {
    tehsilName: string
    districtId: string
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

export type AddTehsil = {
    tehsilName: string
    districtId: string
    stateId: string
    companyId: string
    countryId: string
}

export type UpdateTehsil = {
    body: {
        tehsilName: string
        districtId: string
        stateId: string
        companyId: string
        countryId: string
    }
    id: string
}
