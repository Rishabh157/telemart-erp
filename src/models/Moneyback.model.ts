// |-- Types --|
export type MoneybackListResponse = {
    _id: string
    orderNumber: string
    complaintNumber: string
    schemeId: string
    schemeLabel: string
    schemePrice: number
    dealerId: string | null
    wareHouseId: string | null
    dateOfDelivery: string
    requestResolveDate: string
    settledAmount: string
    amountInWords: string
    customerName: string
    address: string
    stateId: string
    districtId: string
    tehsilId: string
    pincode: string
    customerNumber: string
    alternateNumber: string
    bankName: string
    accountNumber: string
    ifscCode: string
    ccRemark: string
    ccApproval: boolean
    ccApprovalDate: string
    accountRemark: string
    accountApproval: boolean
    accountApprovalDate: string
    managerFirstRemark: string
    managerFirstApproval: boolean
    managerFirstApprovalDate: string
    managerSecondRemark: string
    managerSecondApproval: boolean
    managerSecondApprovalDate: string
    isDeleted: boolean
    isActive: boolean
    createdAt: string
    updatedAt: string
    __v: number
    schemeData: {
        _id: string
        schemeCode: string
        schemeName: string
        schemePrice: number
    }[]
    dealerData: any[]
    warehouseData: any[]
    StateLable: string
    DistrictLable: string
    tehsilLable: string
    requestCreatedById: string
    requestCreatedByLabel: string
}
