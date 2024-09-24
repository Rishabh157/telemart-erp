// |-- Types --|
export type ChannelGroupListResponse = {
    companyId: string
    groupName: string
    _id: string
    // is_active: boolean;
    // is_deleted: boolean;
    // createdAt: string;
    // updatedAt: string;
    // __v: number;
}

export type AddChannelGroup = {
    groupName: string
    companyId: string
}

export type UpdateChannelGroup = {
    body: {
        groupName: string
        companyId: string
    }
    id: string
}

export type GetAllChannelGroupResponse = {
    companyId: string
    createdAt: string
    groupName: string
    isActive: boolean
    isDeleted: boolean
    updatedAt: string
    __v: number
    _id: string
}
