export type InventoryListResponse = {
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

export type AddInventory = {
    productGroupName: string
    groupBarcodeNumber: string
    productDetail: {
        barcodeNumber: string
        status?: string
        condition?: string
    }[]
    wareHouseId: string
    companyId: string
}

export type UpdateInventory = {
    body: {
        productGroupName: string
        groupBarcodeNumber: string
        productDetail: {
            barcodeNumber: string
            status?: string
            condition?: string
        }[]
        wareHouseId: string
        companyId: string
    }
    id: string
}
