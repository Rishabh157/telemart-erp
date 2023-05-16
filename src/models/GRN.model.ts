export type GRNListResponse = {
    poCode: string
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
        recievedQuantity: number
        companyId: string
    }
    id: string
}
