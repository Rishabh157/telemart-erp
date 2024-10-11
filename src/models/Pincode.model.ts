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
    preferredCourier: any[]
    isFixed: boolean
    tehsilId: string
    districtId: string
    stateId: string
    countryId: string
}

export type UpdatePincode = {
    body: {
        countryId: string
        stateId: string
        districtId: string
        tehsilId: string
        preferredCourier: any[]
        isFixed: boolean
    }
    id: string
}
