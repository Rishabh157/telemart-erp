export type DealersSupervisorListResponse = {
    dealerId: string
    schemeId: string
    schemeName: string
    price: string
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type DealersSupervisorAdd = {
    dealerId: string
    schemeId: string[]
    companyId: string
}

export type UpdateDealersSupervisor = {
    body: {
        SchemeId: string[]
        dealerId: string
        companyId: string
    }
    id: string
}
