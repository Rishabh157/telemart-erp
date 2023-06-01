export type InbooundCallerListResponse = {
    generalInformation: generalInformation
    addressInformation: addressInformation
    personalInformation: personalInformation
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type generalInformation = {
    didNo: string
    inOutBound: string
    incomingCallerNo: string
    mobileNo: string
}

export type addressInformation = {
    deliveryCharges: number
    discount: number
    total: number
    countryId: string
    stateId: string
    districtId: string
    tehsilId: string
    areaId: string
    pincodeId: string
    expectedDeliveryDate: string
    profileDeliveredBy: string
    complaintDetails: string
    complaintNo: string
}

export type personalInformation = {
    agentName: string
    name: string
    age: string
    address: string
    relation: string
    agentDistrictId: string
    landmark: string
    whatsappNo: string
    gender: string
    prepaid: boolean
    email: string
    channelId: string
    remark: string
}

export interface AddInboundCaller
    extends generalInformation,
        addressInformation,
        generalInformation {
    dispositionLevelTwoId: string
    dispositionLevelThreeId: string
    schemeId: string
    companyId: string
    alternateNo1: string
}

export type UpdateInboundCaller = {
    body: {
        generalInformation: generalInformation
        addressInformation: addressInformation
        personalInformation: personalInformation
        companyId: string
    }
    id: string
}
