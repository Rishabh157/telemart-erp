// |-- Types --|
export type DealersSupervisorListResponse = {
    dealerId: string
    zonalManagerName: string
    zonalDistribution?: string
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
    zonalManagerName: string
    zonalDistribution?: string
    companyId: string
}

export type UpdateDealersSupervisor = {
    body: {
        zonalManagerName: string
        zonalDistribution?: string
        dealerId: string
        companyId: string
    }
    id: string
}
