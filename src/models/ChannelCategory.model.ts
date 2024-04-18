// |-- Types --|
export type ChannelCategoryListResponse = {
    channelCategory: string
    companyId: string
    createdAt: string
    isActive: boolean
    isDeleted: boolean
    updatedAt: string
    __v: number
    _id: string
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
