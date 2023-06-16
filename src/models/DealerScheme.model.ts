export type DealersSchemeListResponse = {
    dealerId: string
    schemeId: string
    schemeName: string
    pincodes: string[]
    price: string
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type DealerSchemeByIdResponse = {
    _id: string
    dealerId: string
    schemeId: string
    pincodes: string[]
    companyId: string
    isDeleted: boolean
    isActive: boolean
    __v: number
    schemeName: string
    price: number
    updatedAt: string
    createdAt: string
}

export type DealerSchemeDetails = {
    schemeId: string,
    pincodes: string[]
}

export type DealersSchemeAdd = {
    dealerId: string
    details: DealerSchemeDetails[]
    companyId: string
}

export type UpdateDealerSchemeInitialValues={
    dealerId: string
    schemeId: string
    pincodes:string[]
    companyId: string
}

export type UpdateDealersScheme = {
    body: UpdateDealerSchemeInitialValues
    id: string
}

export type AddDealerSchemeFormInitialValues = {
    companyId: string
    dealerId: string
    details: {
        schemeId: string,
        pincodes: string[]
    }[]
}
