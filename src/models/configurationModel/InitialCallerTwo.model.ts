/// ==============================================
// Filename:InitialCallerTwo.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type InitialCallerTwoListResponse = {
    initialCallName: string
    initailCallNameLabel: string
    initialCallOneLabel: string
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type AddInitialCallerTwo = {
    initialCallName: string
    initialCallOneId: string
    companyId: string
}

export type UpdateInitialCallerTwo = {
    body: {
        initialCallName: string
        initialCallOneId: string
        companyId: string
    }
    id: string
}
