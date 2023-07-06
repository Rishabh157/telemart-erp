/// ==============================================
// Filename:Company.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type CompaniesListResponse = {
    companyName: string
    websiteUrl: string
    address: string
    gstNo: string
    phoneNo: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}
export type bankDetails = {
    bankName: string
    branchName: string
    accountHolderName: string
    accountNumber: string
    ifscNumber: string
    accountType: string
}

export type AddCompany = {
    companyName: string
    websiteUrl: string
    gstNo: string
    address: string
    phoneNo: string
    bankDetails: bankDetails[]
}
export type SelectedCompany = {
    companyName: string
    websiteUrl: string
    gstNo: string
    address: string
    phoneNo: string
    bankDetails: bankDetails[]
}

export type UpdateCompany = {
    body: {
        companyName: string
        websiteUrl: string
        address: string
        gstNo: string
        phoneNo: string
        bankDetails: bankDetails[]
    }
    id: string
}
