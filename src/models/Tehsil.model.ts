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
    preferredCourier: any[]
    stateId: string
    countryId: string
}

export type UpdateTehsil = {
    body: {
        countryId: string
        stateId: string
        districtId: string
        preferredCourier: any[]
        isFixed: boolean
    }
    id: string
}
