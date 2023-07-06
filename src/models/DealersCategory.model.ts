/// ==============================================
// Filename:DealersCategory.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type DealersCategoryListResponse = {
    dealersCategory: string
    investAmount: number
    numberOfOrders: number
    deliveryPercentage: number
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type AddDealersCategory = {
    dealersCategory: string
    investAmount: number
    numberOfOrders: number
    deliveryPercentage: number
    companyId: string
}

export type UpdateDealersCategory = {
    body: {
        dealersCategory: string
        investAmount: number
        numberOfOrders: number
        deliveryPercentage: number
        companyId: string
    }
    id: string
}
