/// ==============================================
// Filename:DisposiionOne.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type DispositionOneListResponse = {
    dispositionName: string
    dispostionOneLabel: string
    dispositionDisplayName : string
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type AddDisPositionOne = {
    dispositionName: string
    companyId: string
}

export type UpdateDispositionOne = {
    body: {
        dispositionName: string
        companyId: string
    }
    id: string
}
