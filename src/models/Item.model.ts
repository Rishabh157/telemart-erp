/// ==============================================
// Filename:Item.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type ItemListResponse = {
    itemCode: string
    itemName: string
    itemWeight: string
    companyId: string
    iActive: boolean
    iDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type AddItem = {
    itemCode: string
    itemName: string
    itemWeight: string
    companyId: string
}

export type UpdateItem = {
    body: {
        itemCode: string
        itemName: string
        itemWeight: string
        companyId: string
    }
    id: string
}
