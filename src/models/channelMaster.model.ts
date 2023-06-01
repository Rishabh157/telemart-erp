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
