// |-- Types --|
export type DidManagementListResponse = {
    _id: string
    didNumber: string
    schemeId: string
    channelId: string
    companyId: string
    slotLabel: string
    slotId: string
    didType: string
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
    slotId: string
    schemeId: string
    channelId: string
    didType: string
}

export type UpdateDidManagement = {
    body: {
        didNumber: string
        companyId: string
        slotId: string
        schemeId: string
        channelId: string
        didType: string
    }
    id: string
}
