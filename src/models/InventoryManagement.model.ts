/// ==============================================
// Filename:InventoryManagement.model.ts
// Type: Model Component
// Last Updated: JULy 10, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type InventoryManagementListResponse = {
    dummy1: string
    dummy2: string
    dummy3: string
    dummy6: string
    dummy5: string
    dummy4: boolean
    dummy: {
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

export type addInventoryManagement = {
    dummy1: string
    dummy2: string
    dummy3: string
    dummy4: boolean
    dummy: {
        itemId: string
        rate: number
        quantity: number
        estReceivingDate: string
    }[]
    companyId: string
}

export type UpdateInventoryManagement = {
    body: {
        dummy1: string
        dummy2: string
        dummy3: string
        dummy4: boolean
        dummy: {
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

// export type UpdatePOApprovalLevel = {
// 	body: {
// 			approval: {
// 					approvalLevel: number
// 					approvalByName: string
// 					approvalById: string
// 					time: string
// 			}
// 	}
// 	id: string
// }
