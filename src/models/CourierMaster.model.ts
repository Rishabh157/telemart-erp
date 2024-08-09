// |-- Types --|
export type CourierMasterListResponse = {
    _id: string
    courierName: string
    courierCode: string
    courierType: string
    transportType: string
    isApiAvailable: boolean
    companyId: string
    isDeleted: boolean
    isActive: string
    createdAt: string
    updatedAt: string
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
