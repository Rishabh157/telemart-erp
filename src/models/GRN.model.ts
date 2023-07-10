/// ==============================================
// Filename:GRN.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type GRNListResponse = {
    poCode: string
    itemName: string
    itemId: string
    receivedQuantity: number
    goodQuantity: number
    defectiveQuantity: number
    companyId: string
    is_active: boolean
    is_deleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type AddGRN = {
    poCode: string
    itemId: string
    defectiveQuantity: number
    goodQuantity: number
    receivedQuantity: number
    companyId: string
}

export type UpdateGRN = {
    body: {
        itemCode: string
        itemName: string
        defectiveQuantity: number
        goodQuantity: number
        receivedQuantity: number
        companyId: string
    }
    id: string
}
