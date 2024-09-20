// |-- Types --|
export type DealersListResponse = {
    dealerCode: string
    firstName: string
    lastName: string
    creditLimit: number
    dealersCategoryName: string
    zonalManagerLabel: string
    zonalExecutiveLabel: string
    openingBalance: number
    isAutoMapping: boolean
    isCheckCreditLimit: boolean
    isCheckAvailableQuotient: boolean
    quantityQuotient: number
    firmName: string
    dealerCategoryId: String
    email: string
    registrationCountryName: string
    registrationStateName: string
    registrationDistrictName: string
    registrationPincodeName: string
    billingAddressCountryName: string
    billingAddressStateName: string
    billingAddressDistrictName: string
    billingAddressPincodeName: string
    registrationAddress: registrationAddress
    billingAddress: billingAddress
    contactInformation: contactInformation[]
    document: document
    otherDocument: otherDocument[]
    otherDocumentAutoMap: otherDocumentAutoMap
    companyID: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type registrationAddress = {
    phone: string
    address: string
    countryId: string
    stateId: string
    districtId: string
    pincodeId: string
    gstNumber: string
    gstCertificate: string
}

export type billingAddress = {
    phone: string
    address: string
    countryId: string
    stateId: string
    districtId: string
    pincodeId: string
    gstNumber: string
    gstCertificate: string
}

export type contactInformation = {
    name: string
    department: string
    designation: string
    email: string
    mobileNumber: string
    landLine: string
}

export type document = {
    gstNumber: string
    gstCertificate: string
    adharCardNumber: string
    adharCard: string
    panNumber: string
    panCard: string
}

export type otherDocument = {
    documentName: string
    documentFile: string
}

export type otherDocumentAutoMap = {
    autoMap: boolean
    creditLimit: boolean
    availableQuantity: boolean
}

export type AddDealer = {
    firstName: string
    lastName: string
    creditLimit: number
    openingBalance: number
    isAutoMapping: boolean
    isCheckCreditLimit?: boolean
    isCheckAvailableQuotient?: boolean
    quantityQuotient: number
    dealerCode: string
    firmName: string
    dealerCategoryId: String
    email: string
    password: string
    registrationAddress: registrationAddress
    billingAddress: billingAddress
    contactInformation: contactInformation[]
    document: document
    otherDocument: otherDocument[]
    companyId: string
    zonalManagerId: string | null
    zonalExecutiveId: string | null
    zonalExecutiveAreaId: string[] | []
}

export type UpdateDealer = {
    body: {
        firstName: string
        lastName: string
        creditLimit: number
        openingBalance: number
        isAutoMapping: boolean
        isCheckCreditLimit: boolean
        isCheckAvailableQuotient: boolean
        quantityQuotient: number
        dealerCode: string
        firmName: string
        dealerCategoryId: String
        email: string
        registrationAddress: registrationAddress
        billingAddress: billingAddress
        contactInformation: contactInformation[]
        document: document
        otherDocument: otherDocument[]
        companyId: string
        zonalManagerId: string | null
        zonalExecutiveId: string | null
        zonalExecutiveAreaId: string[] | []
    }
    id: string
}
