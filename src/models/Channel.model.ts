export type ChannelManagementListResponse = {
    groupBarcodeNumber: string
    productGroupName: string
    companyId: string
    wareHouse: string
    count: number
    _id: string
    // is_active: boolean;
    // is_deleted: boolean;
    // createdAt: string;
    // updatedAt: string;
    // __v: number;
}

export type AddChannelManagement = {
    productGroupName: string
    groupBarcodeNumber: string
    productDetail: {
        barcodeNumber: string
        status?: string
        condition?: string
    }[]
    wareHouse: string
    companyId: string
}

export type UpdateChannelManagement = {
    body: {
        productGroupName: string
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
