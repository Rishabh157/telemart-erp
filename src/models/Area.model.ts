// |-- Types --|
export type AreaListResponse = {
    area: string
    pincodeId: string
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

export type AddArea = {
    area: string
    pincodeId: string
    tehsilId: string
    districtId: string
    stateId: string
    countryId: string
}

export type AddMultipleArea = {
    area: string[]
    pincodeId: string
    tehsilId: string
    districtId: string
    stateId: string
    countryId: string
}

export type UpdateArea = {
    body: {
        // area: string
        pincodeId: string
        tehsilId: string
        districtId: string
        stateId: string
        countryId: string
        // companyId: string
    }
    id: string
}
