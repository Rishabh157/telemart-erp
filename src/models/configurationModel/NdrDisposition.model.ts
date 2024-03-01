/// ==============================================
// Filename:DisposiionOne.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type NdrDispositionListResponse = {
    dispositionName: string
    dispostionOneLabel: string
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type AddNdrDisPosition = {
    ndrDisposition: string
    companyId: string
}

export type UpdateNdrDisposition = {
    body: {
        ndrDisposition: string
        companyId: string
    }
    id: string
}
