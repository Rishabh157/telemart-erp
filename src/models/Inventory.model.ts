/// ==============================================
// Filename:Inventory.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
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


export type WareHouseInventory = {
    count: string;
    firstDocument: {
        barcodeGroupNumber: string;
        barcodeNumber: string
        cartonBoxId: string
        companyId: string
        createdAt: string
        dealerId: string
        isActive: string
        isDeleted: string
        isUsed: string
        lotNumber: string
        outerBoxbarCodeNumber: string
        productGroupId: string
        productGroupLabel: string
        status: string
        updatedAt: string
        wareHouseId: string
        wareHouseLabel: string
        __v: string
        _id: string
    }
    productGroupId: string
}