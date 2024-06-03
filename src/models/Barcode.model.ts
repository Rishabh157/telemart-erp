/// ==============================================
// Filename:Barcode.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|

export type BarcodeListResponseType = {
    _id: string
    productGroupId: string
    productGroupLabel: string
    barcodeNumber: string
    barcodeGroupNumber: string
    lotNumber: string
    isUsed: boolean
    wareHouseId: string
    dealerId: string | null
    status: string
    companyId: string
    isDeleted: boolean
    isActive: boolean
    __v: number
    createdAt: string
    updatedAt: string
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
    lotNumber: string
    quantity: number
    expiryDate: string
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

export type InwardInventoryBarcode = {
    barcodedata: {
        productGroupId: string
        barcodeGroupNumber: string
        lotNumber: string
        isUsed: string
        wareHouseId: string
        dealerId: string
        companyId: string
        cartonBoxId: string
        _id: string
    }[]
}

export type DealersInventoryListResponse = {
    count: number
    firstDocument: {
        _id: string
        productGroupId: string
        barcodeNumber: string
        outerBoxbarCodeNumber: string | null
        cartonBoxId: string | null
        barcodeGroupNumber: string
        lotNumber: string
        isUsed: boolean
        wareHouseId: string
        vendorId: string | null
        dealerId: string
        status: string
        companyId: string
        isDeleted: boolean
        isActive: boolean
        __v: number
        createdAt: string
        updatedAt: string
        productGroupLabel: string
        wareHouseLabel: string
    }
    productGroupId: string
}
