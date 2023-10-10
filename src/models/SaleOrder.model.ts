/// ==============================================
// Filename:SaleOrder.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// import { SaleOrderStatus } from "./OutwardRequest.model"

// |-- Types --|
export type productSalesOrder = {
    productGroupId: string
    rate: number
    quantity: number
}

type GroupBySaleOrderDocumnentObjResponse = {
    _id: string
    soNumber: string
    dealerId: string
    dealerWareHouseId: string
    companyWareHouseId: string
    dhApprovedById: string
    dhApproved: boolean
    dhApprovedActionBy: string
    dhApprovedAt: string
    accApprovedById: string
    accApproved: boolean
    accApprovedActionBy: string
    accApprovedAt: string
    productSalesOrder: {
        productGroupId: string
        rate: number
        quantity: number
        _id: string
        groupName: string
    }
    status: string
    companyId: string
    isDeleted: boolean
    isActive: boolean
    __v: number
    createdAt: string
    updatedAt: string
    dealerLabel: string
    companyWarehouseLabel: string
    warehouseLabel: string
}

export type GroupBySaleOrderResponseTypes = {
    _id: string
    dealerName: string
    dhApproved: boolean
    dhApprovedActionBy: string
    dhApprovedAt: string
    accApprovedActionBy: string
    accApprovedAt: string
    accApproved: boolean
    createdAt: string
    updatedAt: string
    documents: GroupBySaleOrderDocumnentObjResponse[]
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
    }
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
