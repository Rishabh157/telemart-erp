export type BarcodeListResponse = {
    productGroup: string
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
    productGroup: string
    barcodeGroupNumber: string
    barcodeNumber: string
    companyId: string
}

export type UpdateBarcode = {
    body: {
        productGroup: string
        barcodeGroupNumber: string
        barcodeNumber: string
        companyId: string
    }
    id: string
}
