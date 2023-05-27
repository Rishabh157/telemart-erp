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
    country: string
    state: string
    city: string
    tehsil: string
    pincode: string
    area: string
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
    realtion: string
    city: string
    landmark: string
    alternateNo1: string
    gender: string
    prepaid: string
    email: string
    channel: string
    otherRemarks: string
}

export type AddInboundCaller = {
    generalInformation: generalInformation
    addressInformation: addressInformation
    personalInformation: personalInformation
    dispositionLevelOne:string
    dispositionLevelTwo:string


    companyId: string
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
