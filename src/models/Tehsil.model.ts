// |-- Types --|
export type TehsilListResponse = {
    tehsilName: string
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

export type AddTehsil = {
    tehsilName: string
    districtId: string
    preferredCourier: string
    stateId: string
    countryId: string
}

export type UpdateTehsil = {
    body: {
        // tehsilName: string
        // districtId: string
        // stateId: string
        preferredCourier: string
        isFixed: boolean
        // companyId: string
        // countryId: string
    }
    id: string
}
