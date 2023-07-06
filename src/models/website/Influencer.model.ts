/// ==============================================
// Filename:Influencer.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type InfluencerListResponse = {
    name: string
    schemeId: string
    startDate: string
    endDate: string
    companyId: string
    count: number
    _id: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    __v: number
}

export type AddInfluencer = {
    name: string
    schemeId: string
    startDate: string
    endDate: string
    companyId: string
}

export type UpdateInfluencer = {
    body: {
        name: string
        schemeId: string
        startDate: string
        endDate: string
        companyId: string
    }
    id: string
}
