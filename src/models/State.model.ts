/// ==============================================
// Filename:State.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type StateListResponse = {
    stateName: string
    countryId: string
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type AddState = {
    stateName: string
    companyId: string
    countryId: string
}

export type UpdateState = {
    body: {
        stateName: string
        companyId: string
        countryId: string
    }
    id: string
}
