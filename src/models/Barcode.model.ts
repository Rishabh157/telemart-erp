export type BarcodeListResponse = {
    productGroupId: string
    productGroupLabel: string
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
    lotNumber: string
    quantity: number
    companyId: string
}

export type UpdateBarcode = {
    body: {
        productGroupId: string
        barcodeGroupNumber: string
        companyId: string
    }
    id: string
}
