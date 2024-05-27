// |-- Types --|
export type CourierReturnListResponse = {
    _id: string
    shippingProvider: string
    requestStatus: string
    orderNumber: number
    warehouseId: string
    companyId: string
    comment: string
    isDeleted: boolean
    isActive: boolean
    createdAt: string
    updatedAt: string
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
