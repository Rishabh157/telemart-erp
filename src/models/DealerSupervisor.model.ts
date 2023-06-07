export type DealersSupervisorListResponse = {
    dealerId: string
    supervisorName: string
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
    supervisorName: string
    companyId: string
}

export type UpdateDealersSupervisor = {
    body: {
        supervisorName: string
        dealerId: string
        companyId: string
    }
    id: string
}
