/// ==============================================
// Filename:InwardRequest.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type InwardRequestDealerListResponse = {
    dealerName: string
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
