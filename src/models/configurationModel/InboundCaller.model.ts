export type InbooundCallerListResponse = {
    didNo: string
    inOutBound: string
    incomingCallerNo: string
    mobileNo: string
    deliveryCharges: number
    discount: number
    total: number
    countryId: string | null
    stateId: string | null
    districtId: string | null
    tehsilId: string | null
    areaId: string | null
    pincodeId: string | null
    expectedDeliveryDate: string
    profileDeliveredBy: string
    complaintDetails: string
    complaintNo: string
    agentName: string
    name: string
    age: number
    address: string
    relation: string
    agentDistrictId: string | null
    landmark: string
    whatsappNo: string
    gender: string
    prepaid: boolean
    emailId: string
    channel: string
    remark: string
    dispositionTwoLabel: string | null
    dispositionThreeLabel: string | null
    schemeLabel: string | null
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
    countryId: string | null
    stateId: string | null
    districtId: string | null
    tehsilId: string | null
    areaId: string | null
    pincodeId: string | null
    expectedDeliveryDate: string
    profileDeliveredBy: string
    complaintDetails: string
    complaintNo: string
}

export type personalInformation = {
    agentName: string
    name: string
    age: number
    address: string
    relation: string
    agentDistrictId: string | null
    landmark: string
    whatsappNo: string
    gender: string
    prepaid: boolean
    emailId: string
    channel: string
    remark: string
}

export interface AddInboundCaller
    extends personalInformation,
        addressInformation,
        generalInformation {
    dispositionLevelTwoId: string | null
    dispositionLevelThreeId: string | null
    schemeId: string | null
    alternateNo1: string | null
}

export interface UpdateInboundCaller {
    body: AddInboundCaller
    id: string
}
