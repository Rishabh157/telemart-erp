/// ==============================================
// Filename:Warehouse.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

export type WarehousesListResponse = {
    wareHouseCode: string
    wareHouseName: string
    country: string
    email: string
    registrationAddress: {
        phone: string
        address: string
        countryId: string
        stateId: string
        districtId: string
        pincodeId: string
    }
    billingAddress: {
        gstNumber: string
        gstCertificate: string
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
    companyId: string
    wareHouseCountryName: string
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

export type AddWarehouse = {
    wareHouseName: string
    country: string
    email: string
    isDefault: boolean
    registrationAddress: {
        phone: string
        address: string
        countryId: string
        stateId: string
        districtId: string
        pincodeId: string
    }
    billingAddress: {
        gstNumber: string
        gstCertificate: string
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
    companyId: string
}

export type UpdateWarehouse = {
    body: {
        wareHouseName: string
        country: string
        email: string
        isDefault: boolean
        registrationAddress: {
            phone: string
            address: string
            countryId: string
            stateId: string
            districtId: string
            pincodeId: string
        }
        billingAddress: {
            gstNumber: string
            gstCertificate: string
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
        companyId: string
    }
    id: string
}
