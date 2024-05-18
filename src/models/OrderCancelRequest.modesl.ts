// |-- Types --|
export type OrderCancelRequestListResponse = {
    _id: string
    orderNumber: string
    cancelReason: string
    remark: string
    requestCreatedBy: string
    cancelDate: string
    status: string
    companyId: string
    isDeleted: boolean
    isActive: boolean
    createdAt: string
    updatedAt: string
    __v: number
    requestCreatedByLabel: string
}

export type AddProductSubCategory = {
    subCategoryCode: string
    subCategoryName: string
    parentCategoryId: string
    hsnCode: string
    companyId: string
}

export type UpdateProductSubCategory = {
    body: {
        subCategoryCode: string
        subCategoryName: string
        parentCategoryId: string
        hsnCode: string
        companyId: string
    }
    id: string
}
