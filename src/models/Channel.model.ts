export type ChannelManagementListResponse = {

    // is_active: boolean;
    // is_deleted: boolean;
    // createdAt: string;
    // updatedAt: string;
    // __v: number;
    ChannelGroupLabel: string
    channelGroupId: string
    channelName: string
    companyId: string
    createdAt: string
    didLabel: string
    didNumber: number
    scheme: string
    schemeLabel: string
    updatedAt: string
    _id: string
}

export type AddChannelManagement = {
    didNumber: string;
    scheme: string;
    channelGroupId: string
    channelName: string;
    companyId: string
}

export type UpdateChannelManagement = {
    body: {
        groupName: string
        groupBarcodeNumber: string
        productDetail: {
            barcodeNumber: string
            status?: string
            condition?: string
        }[]
        wareHouse: string
        companyId: string
    }
    id: string
}
