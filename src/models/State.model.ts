// |-- Types --|
export type StateListResponse = {
    stateName: string
    countryId: string
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type AddState = {
    stateName: string
    preferredCourier: any[]
    isUnion: boolean
    isFixed: boolean
    countryId: string
}

export type UpdateState = {
    body: {
        // stateName: string
        preferredCourier: any[]
        isUnion: boolean
        isFixed: boolean
        // companyId: string
        // countryId: string
    }
    id: string
}
