// |-- Types --|
export type productSalesOrder = {
    productGroupId: string
    rate: number
    quantity: number
}

interface ProductSalesOrder {
    productGroupId: string
    rate: number
    quantity: number
}
export type AddWarehouseTransfer = {
    wtNumber: string
    fromWarehouseId: string
    toWarehouseId: string
    productSalesOrder: ProductSalesOrder[]
    remark: string
    companyId: string
}

export type UpdateWarehouseTransfer = {
    body: {
        wtNumber: string
        fromWarehouseId: string
        toWarehouseId: string
        productSalesOrder: ProductSalesOrder[]
        remark: string
        companyId: string
    }[]
    id: string
}

export type UpdateWarehouseTransferApproval = {
    body: {
        type: 'FIRST' | 'SECOND'
        firstApprovedAt?: string
        secondApprovedAt?: string
        secondApprovedById?: string
        firstApprovedById?: string
        firstApprovedActionBy?: string
        secondApprovedActionBy?: string
        firstApproved?: boolean | null
        secondApproved?: boolean | null
    }
    id: string
}
export type UpdateWTApprovalLevel = {
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

export type GroupByWarehouseTransferResponseTypes = {
    _id: string
    wtNumber: string
    fromWarehouseId: string
    toWarehouseId: string
    firstApproved: boolean | null
    fromWarehouseLabel: string
    toWarehouseLabel: string
    firstApprovedActionBy: string
    firstApprovedAt: string
    secondApprovedActionBy: string
    secondApprovedAt: string
    secondApproved: boolean | null
    createdAt: string
    updatedAt: string
    documents: WarehouseTransferListResponse[]
}

export type WarehouseTransferListResponse = {
    _id: string
    wtNumber: string
    fromWarehouseId: string
    toWarehouseId: string
    firstApprovedById: string | null
    firstApproved: boolean | null
    firstApprovedActionBy: string
    firstApprovedAt: string
    secondApprovedById: string | null
    secondApproved: boolean | null
    secondApprovedActionBy: string
    secondApprovedAt: string
    productSalesOrder: {
        productGroupId: string
        rate: number
        quantity: number
        _id: string
        groupName: string
    }
    status: string
    remark: string
    companyId: string
    isDeleted: boolean
    isActive: boolean
    __v: number
    createdAt: string
    updatedAt: string
    fromWarehouseLabel: string
    toWarehouseLabel: string
}
