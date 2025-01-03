// |-- Types --|
export type BarcodeFlowDataListResponsee = {
    _id: string
    productGroupId: string
    barcodeLog: string
    barcodeNumber: string
    outerBoxbarCodeNumber: string | null
    cartonBoxId: string | null
    barcodeGroupNumber: string
    lotNumber: string
    isUsed: boolean
    wareHouseId: string | null
    vendorId: string | null
    dealerId: string | null
    status: string
    companyId: string
    isDeleted: boolean
    isActive: boolean
    __v: number
    createdAt: string
    updatedAt: string
    productGroupLabel: string
    wareHouseLabel: string | null
    companyLabel: string
}

export type BarcodeFlowListResponse = {
    _id: string
    barcodeNumber: string
    productGroupLabel: string
    data: BarcodeFlowDataListResponsee[]
}
