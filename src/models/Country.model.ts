/// ==============================================
// Filename:Country.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

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
    companyId: string
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
