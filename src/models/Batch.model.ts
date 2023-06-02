export type BatchListResponse = {
    batchNo: string
    orderCount: string
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type AddBatch = {}

export type UpdateBarcode = {
    body: {
        batchNo: string
        orderCount: string
        companyId: string
    }
    id: string
}
