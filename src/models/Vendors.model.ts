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
}

export type UpdateVendor = {
    body: {
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
    }
    id: string
}
