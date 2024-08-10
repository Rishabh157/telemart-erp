// |-- Types --|
export type ConfigurationCompanyListResponse = {
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

export type AddConfigurationCompany = {
    companyName: string
    websiteUrl: string
    gstNo: string
    address: string
    phoneNo: string
    bankDetails: [
        {
            bankName: string
            branchName: string
            accountHolderName: string
            accountNumber: number
            ifscNumber: string
            accountType: string
        }
    ]
}

export type UpdateConfigurationCompany = {
    body: {
        companyName: string
        websiteUrl: string
        address: string
        gstNo: string
        phoneNo: string
    }
    id: string
}
