export type DidManagementListResponse = {
    _id: string
    didNumber: string
    schemeId: string
    channelId: string
    companyId: string
    isDeleted: boolean
    isActive: boolean
    createdAt: string
    updatedAt: string
    __v: number
    schemeLabel: string
    schemeCode: string
    channelLabel: string
}

export type AddDidManagement = {
    didNumber: string
    companyId: string
    schemeId: string
    channelId: string
}

export type UpdateDidManagement = {
    body: {
        didNumber: string
        companyId: string
        schemeId: string
        channelId: string
    }
    id: string
}
