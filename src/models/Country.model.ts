// |-- Types --|
export type CountryListResponse = {
    countryName: string
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type AddCountry = {
    countryName: string
}

export type UpdateCountry = {
    body: {
        countryName: string
        companyId: string
    }
    id: string
}

export type countrydetail = {
    countryId: string
}
