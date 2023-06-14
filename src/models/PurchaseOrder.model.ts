export type PurchaseOrderListResponse = {
    poCode: string
    vendorId: string
    vendorLabel: string
    warehouseLabel: string
    wareHouseId: string
    isEditable: boolean
    purchaseOrder: {
        itemName: string
        itemId: string
        rate: number
        quantity: number
        estReceivingDate: string
    }
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

export type addPurchaseOrder = {
    poCode: string
    vendorId: string
    wareHouseId: string
    isEditable: boolean
    purchaseOrder: {
        itemId: string
        rate: number
        quantity: number
        estReceivingDate: string
    }[]
    companyId: string
}

export type UpdatePurchaseOrder = {
    body: {
        poCode: string
        vendorId: string
        wareHouseId: string
        isEditable: boolean
        purchaseOrder: {
            id: string
            itemId: string
            rate: number
            quantity: number
            estReceivingDate: string
        }[]
        companyId: string
    }
    id: string
}

export type UpdatePOApprovalLevel = {
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
