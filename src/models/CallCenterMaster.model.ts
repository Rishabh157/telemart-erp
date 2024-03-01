/// ==============================================
// Filename:callCenterMaster.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type CallCenterMasterListResponse = {
    callCenterName: string
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type AddCallCenterMaster = {
    callCenterName: string
    companyId: string
}

export type UpdateCallCenterMaster = {
    body: {
        callCenterName: string
        companyId: string
    }
    id: string
}
