/// ==============================================
// Filename:CartonBoxBarcode.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type CartonBoxBarcodeListResponseType = {
    cartonBoxId: string
    cartonboxLabel: string
    barcodeNumber: string
    barcodeGroupNumber: string
    isUsed: boolean
    card: string
    count: string
    itemBarcodeNumber: string
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type AddCartonBoxBarcode = {
    cartonBoxId: string
    barcodeGroupNumber: string
    itemBarcodeNumber: string[]
    companyId: string
}

export type UpdateCartonBoxBarcode = {
    body: {
        cartonBoxId: string
        barcodeGroupNumber: string
        itemBarcodeNumber: string
        companyId: string
    }
    id: string
}
