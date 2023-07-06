/// ==============================================
// Filename:OutwardRequest.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type OutwardRequestListResponse = {
    productName: string
    quantity: string
    address: string
    mobile: string
    district: string
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
