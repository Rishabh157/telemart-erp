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
    count: string
    productGroupLabel: string
    wareHouseLabel: string
    totalFreshCount: number
    totalDamageCount: number
    totalRtvCount: number
    expiredCount: number
    closedCount: number
    totalFakeCount: number
    totalMissingCount: number
    firstDocument: {
        barcodeGroupNumber: string
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

export type WareHouseInventoryOfProductSummaryListResponse = {
    _id: string
    companyId: string
    warehouseId: string
    productGroupId: string
    freezeQuantity: number
    avaliableQuantity: number
    avaliableUsedQuantity: number
    damageQuantity: number
    fakeQuantity: number
    lostQuantity: number
    expiredQuantity: number
    closedQuantity: number
    missingQuantity: number
    rtvQuantity: number
    isDeleted: boolean
    isActive: boolean
    createdAt: string
    updatedAt: string
    __v: number
    productGroupLabel: string
}
