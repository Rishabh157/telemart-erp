export type CallerResponse = {
    didNo: string
    ageGroup: string
    alternateNo: string
    mobileNo: string
    autoFillingShippingAddress: string
    callType: string
    campaign: string
    customerName: string
    deliveryTimeAndDate: string
    countryId: string
    stateId: string
    districtId: string
    tehsilId: string
    schemeId: string
    schemeName: string
    pincodeId: string
    pincodeSecondId: string
    areaId: null
    emailId: string
    flagStatus: string
    gender: string
    houseNumber: string
    incomingCallerNo: string
    landmark: string
    medicalIssue: string[]
    orderFor: string
    paymentMode: string
    productGroupId: string
    reciversName: string
    remark: string
    shcemeQuantity: number
    socialMedia: {
        facebook: string
        instagram: string
        _id: string
    }
    streetNumber: string
    typeOfAddress: string
    whatsappNo: string
    price: number
    deliveryCharges: number
    totalAmount: number
    dispositionLevelTwoId: string
    dispositionLevelThreeId: string
    isDeleted: boolean
    isActive: boolean
    _id: string
    createdAt: string
    updatedAt: string
    __v: number
}

export type CallerFormBody = {
    didNo: string
    ageGroup: string
    mobileNo: string
    alternateNo: string
    autoFillingShippingAddress: string
    callType: string
    campaign: string
    customerName: string
    deliveryTimeAndDate: string
    countryId: string
    stateId: string
    districtId: string
    tehsilId: string
    schemeId: string
    schemeName: string
    pincodeId: string
    pincodeSecondId: string
    villageId : null
    areaId: null
    emailId: string
    flagStatus: string
    gender: string
    houseNumber: string
    incomingCallerNo: string
    landmark: string
    medicalIssue: string[]
    orderFor: string
    paymentMode: string
    productGroupId: string
    isRecording? : boolean
    reciversName: string
    remark: string
    shcemeQuantity: number
    socialMedia: {
        facebook: string
        instagram: string
    }
    streetNumber: string
    typeOfAddress: string
    whatsappNo: string
    price: number
    deliveryCharges: number
    totalAmount: number
    dispositionLevelTwoId: string
    dispositionLevelThreeId: string
}
