/// ==============================================
// Filename:InwardRequest.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
// Warehouse Transfer list
export interface InwardDealerRequstListResponse {
    _id: string
    fromWarehouseLabel: string
    toWarehouseLabel: string
    firstApproved: boolean | null
    firstApprovedActionBy: string
    firstApprovedAt: string
    secondApprovedActionBy: string
    secondApprovedAt: string
    secondApproved: boolean | null
    createdAt: string
    updatedAt: string
    documents: {
        _id: string
        dtwNumber: string
        fromWarehouseId: string
        toWarehouseId: string
        firstApprovedById: string | null
        firstApproved: boolean | null
        firstApprovedActionBy: string
        firstApprovedAt: string
        secondApprovedById: string | null
        secondApproved: boolean | null
        secondApprovedActionBy: string
        secondApprovedAt: string
        productSalesOrder: {
            productGroupId: string
            rate: number
            quantity: number
            _id: string
            groupName: string
        }
        status: string
        remark: string
        companyId: string
        isDeleted: boolean
        isActive: boolean
        __v: number
        createdAt: string
        updatedAt: string
        fromWarehouseLabel: string
        toWarehouseLabel: string
    }[]
}

export type InwardRequestCustomerListResponse = {
    customerName: string
    productName: string
    quantity: string
    address: string
    creationDate: string
    is_active: boolean
    is_deleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type InwardRequestRTVListResponse = {
    vendorName: string
    productName: string
    quantity: string
    address: string
    creationDate: string
    is_active: boolean
    is_deleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type InwardRequestWarehouseListResponse = {
    warehouseName: string
    productName: string
    quantity: string
    address: string
    creationDate: string
    is_active: boolean
    is_deleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type InwardRequestSampleListResponse = {
    requestedBy: string
    productName: string
    quantity: string
    address: string
    creationDate: string
    is_active: boolean
    is_deleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type InwardRequestEcomListResponse = {
    ecomName: string
    productName: string
    quantity: string
    address: string
    creationDate: string
    is_active: boolean
    is_deleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type InwardRequestReplacementListResponse = {
    vendorName: string
    productName: string
    quantity: string
    address: string
    creationDate: string
    is_active: boolean
    is_deleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type InwardRequestCompanyListResponse = {
    companyName: string
    productName: string
    quantity: string
    address: string
    creationDate: string
    is_active: boolean
    is_deleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}
export type AddInwardRequest = {
    productName: string
    quantity: string
    address: string
    mobile: string
    district: string
    password: string
    confirm_password: string
}

export type UpdateInwardRequest = {
    body: {
        productName: string
        quantity: string
        address: string
        mobile: string
        district: string
        password: string
        confirm_password: string
    }
    id: string
}
