export type DidManagementListResponse = {
    didNumber: string
    _id: string
    is_active: boolean
    is_deleted: boolean
    createdAt: string
    updatedAt: string
    __v: number
}

export type AddDidManagement = {
    didNumber: string
    companyId: string
}

export type UpdateDidManagement = {
    body: {
        didNumber: string
        companyId: string
    }
    id: string
}
