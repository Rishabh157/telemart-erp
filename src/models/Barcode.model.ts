// |-- Types --|

export type BarcodeListResponseType = {
    _id: string
    productGroupId: string
    barcodeNumber: string
    barcodeGroupNumber: string
    outerBoxbarCodeNumber: string | null
    lotNumber: string
    condition: string
    isUsed: boolean
    wareHouseId: string
    dealerId: string | null
    status: string
    companyId: string
    isDeleted: boolean
    isActive: boolean
    isFreezed: boolean
    __v: number
    createdAt: string
    updatedAt: string
    productGroupLabel: string
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
    id: string
    body: {
        productGroupId: string
        wareHouseId: string
        barcodeGroupNumber: string
        companyId: string
    }
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
