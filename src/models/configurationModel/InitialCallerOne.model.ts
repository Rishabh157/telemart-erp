/// ==============================================
// Filename:InitialCallerOne.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type InitialCallerOneListResponse = {
    initialCallName: string
    initailCallNameLabel: string
    initialCallDisplayName: string
    callType: string
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type AddInitialCallerOne = {
    initialCallName: string
    callType: string
    companyId: string
}

export type UpdateInitialCallerOne = {
    body: {
        initialCallName: string
        callType: string
        companyId: string
    }
    id: string
}
