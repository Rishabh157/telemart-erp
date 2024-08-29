// |-- Types --|
export type VendorsListResponse = {
    companyName: string
    vendorCode: string
    companyType: string
    ownerShipType: string
    websiteAddress: string
    registrationAddress: {
        phone: string
        address: string
        countryId: string
        stateId: string
        districtId: string
        pincodeId: string
    }
    billingAddress: {
        phone: string
        address: string
        countryId: string
        stateId: string
        districtId: string
        pincodeId: string
    }
    contactInformation: {
        name: string
        department: string
        designation: string
        email: string
        mobileNumber: string
        landLine: string
    }[]
    document: {
        gstNumber: string
        gstCertificate: string
        declarationForm: string
    }
    bankInformation: {
        bankName: string
        bankBranchName: string
        accountHolderName: string
        ifscNumber: string
        accountType: string
        accountNumber: string
        cancelledCheque: string
    }[]
    companyId: string
    registrationCountryName: string
    registrationStateName: string
    registrationDistrictName: string
    registrationPincodeName: string
    billingAddressCountryName: string
    billingAddressStateName: string
    billingAddressDistrictName: string
    billingAddressPincodeName: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type AddVendor = {
    companyName: string
    // vendorCode: string
    companyType: string
    ownerShipType: string
    websiteAddress: string
    registrationAddress: {
        phone: string
        address: string
        countryId: string
        stateId: string
        districtId: string
        pincodeId: string
    }
    billingAddress: {
        phone: string
        address: string
        countryId: string
        stateId: string
        districtId: string
        pincodeId: string
    }
    contactInformation: {
        name: string
        department: string
        designation: string
        email: string
        mobileNumber: string
        landLine: string
    }[]

    document: {
        gstNumber: string
        gstCertificate: string
        declarationForm: string
    }
    bankInformation: {
        bankName: string
        bankBranchName: string
        accountHolderName: string
        ifscNumber: string
        accountType: string
        accountNumber: string
        cancelledCheque: string
    }[]
    companyId: string
}

export type UpdateVendor = {
    body: {
        companyName: string
        // vendorCode: string
        companyType: string
        ownerShipType: string
        websiteAddress: string
        registrationAddress: {
            phone: string
            address: string
            countryId: string
            stateId: string
            districtId: string
            pincodeId: string
        }
        billingAddress: {
            phone: string
            address: string
            countryId: string
            stateId: string
            districtId: string
            pincodeId: string
        }
        contactInformation: {
            name: string
            department: string
            designation: string
            email: string
            mobileNumber: string
            landLine: string
        }[]

        document: {
            gstNumber: string
            gstCertificate: string
            declarationForm: string
        }
        bankInformation: {
            bankName: string
            bankBranchName: string
            accountHolderName: string
            ifscNumber: string
            accountType: string
            accountNumber: string
            cancelledCheque: string
        }[]
        companyId: string
    }
    id: string
}

interface ProductSalesOrder {
    productGroupId: string
    rate: number
    quantity: number
    _id: string
    groupName: string
}

interface ReturnToVendorDocument {
    _id: string
    rtvNumber: string
    vendorId: string
    warehouseId: string
    firstApprovedById: string | null
    firstApproved: boolean | null
    firstApprovedActionBy: string
    firstApprovedAt: string
    secondApprovedById: string | null
    secondApproved: boolean | null
    secondApprovedActionBy: string
    secondApprovedAt: string
    productSalesOrder: ProductSalesOrder
    remark: string
    status: string
    companyId: string
    isDeleted: boolean
    isActive: boolean
    __v: number
    createdAt: string
    updatedAt: string
    vendorLabel: string
    warehouseLabel: string
}

export type ReturnToVendorListResponse = {
    _id: string
    warehouseLabel: string
    vendorLabel: string
    firstApproved: boolean | null
    firstApprovedActionBy: string
    firstApprovedAt: string
    secondApprovedActionBy: string
    secondApprovedAt: string
    secondApproved: boolean | null
    createdAt: string
    updatedAt: string
    documents: ReturnToVendorDocument[]
}
