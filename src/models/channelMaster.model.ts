/// ==============================================
// Filename:ChannelMaster.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type ChannelMasterListResponse = {
    channelMaster: string
    _id: string
    is_active: boolean
    is_deleted: boolean
    createdAt: string
    updatedAt: string
    __v: number
}

export type AddChannelMaster = {
    channelMaster: string
    companyId: string
}

export type UpdateChannelMaster = {
    body: {
        channelMaster: string
        companyId: string
    }
    id: string
}
