/// ==============================================
// Filename:OutwardRequest.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type OutwardRequestDealerListResponse = {
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

export type OutwardRequestCustomerListResponse = {
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

export type OutwardRequestRTVListResponse = {
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

export type OutwardRequestWarehouseListResponse = {
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

export type OutwardRequestSampleListResponse = {
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

export type OutwardRequestEcomListResponse = {
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

export type OutwardRequestReplacementListResponse = {
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

export type OutwardRequestCompanyListResponse = {
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
export type AddOutwardRequest = {
    productName: string
    quantity: string
    address: string
    mobile: string
    district: string
    password: string
    confirm_password: string
}

export type UpdateOutwardRequest = {
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
