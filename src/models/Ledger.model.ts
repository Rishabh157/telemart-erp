export type LedgerListResponse = {
    noteType: string
    price: number
    remark: string    
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
}

export type UpdateLedger = {
    body: {
        noteType: string
        price: number
        remark: string 
        companyId: string
    }
    id: string
}
