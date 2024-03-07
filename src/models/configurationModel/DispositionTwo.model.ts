/// ==============================================
// Filename:DispositionTwo.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type DispositionTwoListResponse = {
    dispositionName: string
    dispostionOneLabel: string
    dispositionDisplayName: string
    dispostionOneDisplayLabel: string
    dispositionOneId: string
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type AddDisPositionTwo = {
    dispositionName: string
    dispositionOneId: string
    companyId: string
}

export type UpdateDispositionTwo = {
    body: {
        dispositionName: string
        dispositionOneId: string
        companyId: string
    }
    id: string
}
