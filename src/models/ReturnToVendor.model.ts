// |-- Types --|
export type productSalesOrder = {
    productGroupId: string
    rate: number
    quantity: number
}

export type SaleOrderListResponse = {
    soNumber: string
    dealerId: string
    wareHouse: string
    dealerLabel: string
    warehouseLabel: string
    productSalesOrder: productSalesOrder[]
    approval: {
        approvalLevel: number
        approvalByName: string
        approvalById: string
        time: string
    }[]
    dhApproved: boolean | null
    dhApprovedActionBy: string
    dhApprovedAt: string
    accApproved: boolean | null
    accApprovedActionBy: string
    accApprovedAt: string
    status: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type AddSaleOrder = {
    soNumber: string
    dealerId: string
    dealerWareHouseId: string
    companyWareHouseId: string
    companyId: string
    productSalesOrder: productSalesOrder[]
}

export type UpdateSaleOrder = {
    body: {
        soNumber: string
        dealerId: string
        dealerWareHouseId: string
        companyWareHouseId: string
        companyId: string
        productSalesOrder: productSalesOrder
        dhApproved?: boolean | null
        dhApprovedById?: string
        dhApprovedAt?: string
        accApproved?: boolean | null
        accApprovedById?: string
        accApprovedAt?: string
        dhApprovedActionBy?: string
        accApprovedActionBy?: string
    }[]
    id: string
}

export type UpdateSaleOrderApproval = {
    body: {
        type: 'DH' | 'ACC'
        dhApprovedAt?: string
        accApprovedAt?: string
        accApprovedById?: string
        dhApprovedById?: string
        dhApprovedActionBy?: string
        accApprovedActionBy?: string
        dhApproved?: boolean | null
        accApproved?: boolean | null
    }
    id: string
}
export type UpdateSOApprovalLevel = {
    body: {
        approval: {
            approvalLevel: number
            approvalByName: string
            approvalById: string
            time: string
        }
    }
    id: string
}
