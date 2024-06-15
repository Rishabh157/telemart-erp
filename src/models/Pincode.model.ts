/// ==============================================
// Filename:Pincode.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type PincodeListResponse = {
    pincode: string
    tehsilId: string
    districtId: string
    stateId: string
    countryId: string
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type AddPincode = {
    pincode: string
    preferredCourier: string
    isFixed: boolean
    tehsilId: string
    districtId: string
    stateId: string
    countryId: string
}

export type UpdatePincode = {
    body: {
        // pincode: string
        preferredCourier: string
        isFixed: boolean
        // tehsilId: string
        // districtId: string
        // stateId: string
        // companyId: string
        // countryId: string
    }
    id: string
}
