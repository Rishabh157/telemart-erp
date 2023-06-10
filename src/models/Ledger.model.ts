export type LedgerListResponse = {
    noteType: string
    price: number
    remark: string
    dealerId: string
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type LedgerAdd = {
    noteType: string
    price: number
    remark: string
    companyId: string
    dealerId: string
}

export type UpdateLedger = {
    body: {
        noteType: string
        price: number
        remark: string
        companyId: string
        dealerId: string
    }
    id: string
}
