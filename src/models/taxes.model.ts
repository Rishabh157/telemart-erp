export type TaxesListResponse = {
    taxName: string
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type AddTaxes = {
    taxName: string
    companyId: string
}

export type UpdateTaxes = {
    body: {
        taxName: string
        companyId: string
    }
    id: string
}
