export type HouseArrestListResponseType = {
    _id: string
    orderNumber: string
    mbkNumber: number
    complaintNumber: any
    requestCreatedBy: string
    requestCreatedByRemark: string
    schemeId: string
    dealerId: string
    customerName: string
    address: string
    stateId: string
    districtId: string
    tehsilId: string
    pincodeId: string
    areaId: string
    customerNumber: string
    alternateNumber: string
    ccApproval: boolean
    ccInfoAddById: string
    ccApprovalDate: string
    ccRemark: string
    settledAmount: string
    managerFirstApproval: boolean
    managerFirstApprovalDate: string
    managerFirstUserId: string
    managerFirstRemark: string
    dealerApproval: boolean
    dealerApprovalDate: string
    dealerRemark: string
    returnItemBarcode: string[]
    orignalBarcode: string[]
    managerSecondApproval: boolean
    managerSecondApprovalDate: string
    managerSecondUserId: string
    managerSecondRemark: string
    accountApproval: boolean | null
    accountApprovalDate: string
    requestResolveDate: string
    accoutUserId: string | null
    companyId: string
    isDeleted: boolean
    isActive: boolean
    createdAt: string
    updatedAt: string
    __v: number
    requestCreatedByLabel: string
}
