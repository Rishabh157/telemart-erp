/// ==============================================
// Filename:CompetitorManagement.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type CompetitorManagementListResponse = {
    competitorName: string
    companyName: string
    productName: string
    websiteLink: string
    youtubeLink: string
    schemePrice: string
    whatsappNo: string
    companyId: string
    count: number
    _id: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    __v: number
}

export type AddCompetitorManagement = {
    competitorName: string
    companyName: string
    productName: string
    websiteLink: string
    youtubeLink: string
    schemePrice: string
    whatsappNumber: string
    channelNameId: string
    startTime: string
    endTime: string
    companyId: string
}

export type UpdateCompetitorManagement = {
    body: {
        competitorName: string
        companyName: string
        productName: string
        websiteLink: string
        youtubeLink: string
        schemePrice: string
        whatsappNumber: string
        channelNameId: string
        startTime: string
        endTime: string
        companyId: string
    }
    id: string
}
