/// ==============================================
// Filename:DispositionThree.model.ts
// Type: Model Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type DispositionThreeListResponse = {
    _id: string
    dispositionName: string
    dispositionDisplayName: string
    dispostionOneDisplayLabel: string
    dispostionTwoDisplayLabel: string
    dispositionOneId: string
    dispositionTwoId: string
    companyId: string
    priority: string
    smsType: string
    emailType: string
    whatsApp: string
    applicableCriteria: string[]
    isDeleted: boolean
    isActive: boolean
    createdAt: string
    updatedAt: string
    __v: number
    dispostionOneLabel: string
    dispostionTwoLabel: string
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
