/// ==============================================
// Filename:DisposiionOne.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type NdrDispositionListResponseType = {
    _id: string
    ndrDisposition: string
    priority: string
    smsType: string
    emailType: string
    rtoAttempt: string
    isDeleted: boolean
    isActive: boolean
    createdAt: string
    updatedAt: string
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
