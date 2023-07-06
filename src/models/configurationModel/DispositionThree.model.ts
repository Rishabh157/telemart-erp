/// ==============================================
// Filename:DispositionThree.model.ts
// Type: Model Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type DispositionThreeListResponse = {
    dispositionName: string
    dispostionOneLabel: string
    dispostionTwoLabel: string
    dispositionOneId: string
    dispositionTwoId: string
    whatsApp: string
    smsType: string
    emailType: string
    priority: string
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type AddDispositionThree = {
    dispositionName: string
    dispositionOneId: string
    dispositionTwoId: string
    smsType: string | null
    emailType: string | null
    whatsApp: string | null
    priority: string
    applicableCriteria: string[]
    companyId: string
}

export type UpdateDispositionThree = {
    body: {
        dispositionName: string
        dispositionOneId: string
        dispositionTwoId: string
        smsType: string | null
        emailType: string | null
        whatsApp: string | null
        priority: string
        applicableCriteria: string[]
        companyId: string
    }
    id: string
}
