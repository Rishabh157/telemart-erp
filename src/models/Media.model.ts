/// ==============================================
// Filename:Media.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type DidManagementListResponse = {
    _id: string
    didNumber: string
    schemeId: string
    channelId: string
    companyId: string
    slotLabel: string
    slotId: string
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
}

export type UpdateDidManagement = {
    body: {
        didNumber: string
        companyId: string
        slotId: string
        schemeId: string
        channelId: string
    }
    id: string
}
