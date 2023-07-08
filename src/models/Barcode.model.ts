/// ==============================================
// Filename:Barcode.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type BarcodeListResponse = {
    productGroupId: string
    productGroupLabel: string
    wareHouseId: string
    barcodeNumber: string
    barcodeGroupNumber: string
    isUsed: boolean
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type ProductBarcodeGroupResponse = {
    _id: string
    barcodeGroupNumber: string
    companyId: string
    createdAt: string
    productGroupLabel: string
}
export type AddBarcode = {
    productGroupId: string
    barcodeGroupNumber: string
    wareHouseId: string
    lotNumber: string
    quantity: number
    companyId: string
}

export type UpdateBarcode = {
    body: {
        productGroupId: string
        wareHouseId: string
        barcodeGroupNumber: string
        companyId: string
    }
    id: string
}
