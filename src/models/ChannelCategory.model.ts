/// ==============================================
// Filename:ChannelCategory.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type ChannelCategoryListResponse = {
    channelCategory: string
    _id: string
    is_active: boolean
    is_deleted: boolean
    createdAt: string
    updatedAt: string
    __v: number
}

export type AddChannelCategory = {
    channelCategory: string
    companyId: string
}

export type UpdateChannelCategory = {
    body: {
        channelCategory: string
        companyId: string
    }
    id: string
}
