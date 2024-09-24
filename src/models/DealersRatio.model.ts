// |-- Types --|
export type DealersRatioListResponse = {
    pincode: string
    dealerCount: number
    companyID: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type registrationAddress = {
    phone: string
    address: string
    countryId: string
    stateId: string
    districtId: string
    pincodeId: string
}
