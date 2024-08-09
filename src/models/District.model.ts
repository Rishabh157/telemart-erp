// |-- Types --|
export type DistrictListResponse = {
    districtName: string
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

export type AddDistrict = {
    districtName: string
    stateId: string
    preferredCourier: any[]
    countryId: string
}

export type UpdateDistrict = {
    body: {
        // districtName: string
        // stateId: string
        preferredCourier: any[]
        isFixed: boolean
        // companyId: string
        // countryId: string
    }
    id: string
}
