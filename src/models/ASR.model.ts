/// ==============================================
// Filename:ASR.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type ASRListResponse = {
    asrDetails: AsrDetailsType[] 
    companyId: string
    completed: boolean
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}
export type AsrDetailsType = {
    productName: string
    productId: string
    quantity: number
}
export type AddASR = {
    asrDetails: AsrDetailsType[]
    companyId: string
}

export type UpdateASR = {
    body: {
        asrDetails: AsrDetailsType[]
        companyId: string
    }
    id: string
}
