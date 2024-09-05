// |-- Types --|
export type EcomMasterListResponse = {
    _id: string
    companyId: string
    ecomName: string
    ecomDisplayName: string
    isDeleted: boolean
    isActive: boolean
    createdAt: string
    updatedAt: string
    __v: number
}

export type AddEcomMaster = {
    ecomDisplayName: string
}

export type UpdateEcomMaster = {
    body: {
        ecomDisplayName: string
    }
    id: string
}
