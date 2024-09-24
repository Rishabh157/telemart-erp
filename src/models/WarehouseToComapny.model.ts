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
export type AddWarehouseToComapny = {
    wtcNumber: string
    toCompanyId: string
    fromWarehouseId: string
    toWarehouseId: string
    productSalesOrder: ProductSalesOrder[]
    remark: string
    companyId: string
}

export type UpdateWarehouseToComapny = {
    body: {
        wtcNumber: string
        toCompanyId: string
        fromWarehouseId: string
        toWarehouseId: string
        productSalesOrder: ProductSalesOrder[]
        remark: string
        companyId: string
    }[]
    id: string
}

// export type UpdateWarehouseToComapnyApproval = {
//   body: {
//       type: 'DH' | 'ACC'
//       dhApprovedAt?: string
//       accApprovedAt?: string
//       accApprovedById?: string
//       dhApprovedById?: string
//       dhApprovedActionBy?: string
//       accApprovedActionBy?: string
//       dhApproved?: boolean | null
//       accApproved?: boolean | null
//   }
//   id: string
// }

export type UpdateWarehouseToComapnyApproval = {
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
export type UpdateWTCApprovalLevel = {
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

export type GroupByWarehouseToComapnyResponseTypes = {
    _id: string
    wtcNumber: string
    toCompanyId: string
    toCompanyLabel: string
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
    documents: WarehouseToComapnyListResponse[]
}

export type WarehouseToComapnyListResponse = {
    _id: string
    wtcNumber: string
    toCompanyId: string
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
