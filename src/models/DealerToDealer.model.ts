// |-- Types --|
export type DealerToDealerListResponseTypes = {
    _id: string
    fromDealerId: string
    toDealerId: string
    remark: string
    requestCreatedByLabel: string
    requestApprovedByLabel: string | null
    firstApprovedActionBy: string | null
    requestApproved: boolean
    companyId: string
    createdAt: string
    updatedAt: string
    documents: {
        _id: string
        dtdNumber: string
        fromDealerId: string
        toDealerId: string
        remark: string
        productDetails: {
            productGroupId: string
            rate: number
            quantity: number
            _id: string
            groupName: string
        }
        status: string
        requestCreatedBy: string
        requestApprovedBy: string | null
        requestApproved: boolean
        companyId: string
        isDeleted: boolean
        isActive: boolean
        __v: number
        createdAt: string
        updatedAt: string
        requestCreatedByLabel: string
        requestApprovedByLabel: string | null
        fromDealerLabelLabel: string
        toDealerLabelLabel: string
    }[]
}
