/// ==============================================
// Filename:Order.model.ts
// Type: Model Component
// Last Updated: OCTOBER 18, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type OrderListResponse = {
    _id: string
    orderNumber: number | string
    inquiryNumber: string
    assignDealerId: string | null
    assignWarehouseId: string | null
    assignDealerLabel: string
    assignWarehouseLabel: string
    agentId: string
    agentName: string
    companyId: string
    approved: boolean
    didNo: string
    ageGroup: string
    alternateNo: string
    mobileNo: string
    autoFillingShippingAddress: string
    callType: string
    campaign: string
    customerName: string
    deliveryTimeAndDate: string
    countryId: string | null
    stateId: string
    districtId: string
    tehsilId: string
    schemeId: string
    schemeName: string
    schemeCode: string
    isOrderAssigned: boolean
    pincodeId: string
    pincodeSecondId: string | null
    areaId: string
    emailId: string
    flagStatus: string
    gender: string
    houseNumber: string
    incomingCallerNo: string
    landmark: string
    medicalIssue: string[]
    orderFor: string[]
    orderForOther: string
    orderStatus: string
    paymentMode: string
    productGroupId: string
    remark: string
    shcemeQuantity: number
    firstCallApproval: null | boolean
    firstCallRemark: string
    firstCallState: string
    firstCallCallBackDate: string
    socialMedia: {
        facebook: string
        instagram: string
        _id: string
    }
    channelLabel: string[]
    streetNumber: string
    typeOfAddress: string
    whatsappNo: string
    price: number
    deliveryCharges: number
    totalAmount: number
    dispositionLevelTwoId: string
    dispositionLevelThreeId: string
    preffered_delivery_start_time: string
    preffered_delivery_end_time: string
    preffered_delivery_date: string
    recordingStartTime: string
    recordingEndTime: string
    status: string
    isDeleted: boolean
    isActive: boolean
    createdAt: string
    updatedAt: string
    __v: number
    dispositionLevelTwo: string
    dispositionLevelThree: string
    stateLabel: string
    schemeLabel: string
    districtLabel: string
    tehsilLabel: string
    pincodeLabel: string
    areaLabel: string
    wareHouseLabel: string
    dealerLabel: string
    dealerCode: string
    dealerStatus: string
    callCenterId: string
    callCenterLabel: string
    orderReferenceNumber: string
}
