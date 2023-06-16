export type productSalesOrder = {
    productGroupId: string
    rate: number
    quantity: number
}

export type SaleOrderListResponse = {
    soNumber: string
    dealer: string
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
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type AddSaleOrder = {
    soNumber: string
    dealer: string
    dealerWareHouseId: string
    companyWareHouseId: string
    companyId: string
    productSalesOrder: productSalesOrder[]
}

export type UpdateSaleOrder = {
    body: {
        soNumber: string
        dealer: string
        dealerWareHouseId: string
        companyWareHouseId: string
        companyId: string
        productSalesOrder: productSalesOrder
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
