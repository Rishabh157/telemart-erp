/// ==============================================
// Filename:CompetitorManagement.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type CompetitorManagementListResponse = {
    _id: string
    date: string
    artist: string
    productName: string
    websiteLink: string
    video: string
    mobileNumber: string
    maskedPhoneNo: string
    schemePrice: number
    companyId: string
    channelNameId: string
    startTime: string
    endTime: string
    isDeleted: false
    isActive: true
    createdAt: string
    updatedAt: string
    __v: number
}

export type AddCompetitorManagement = {
    artist: string
    companyId: string
    productName: string
    channelNameId: string
    schemePrice: string
    websiteLink: string
    video: string
    mobileNumber: string
    date: string
    startTime: string
    endTime: string
}

export type UpdateCompetitorManagement = {
    body: {
        // competitorName: string
        // companyName: string
        // productName: string
        // websiteLink: string
        // youtubeLink: string
        // schemePrice: string
        // whatsappNumber: string
        // channelNameId: string
        // startTime: string
        // endTime: string
        // companyId: string
        date: string
        artist: string
        productName: string
        websiteLink: string
        companyName: string
        // whatsappNumber : string
        // maskedPhoneNo?: string
        video: string
        mobileNumber: string
        schemePrice: string
        companyId: string
        channelNameId: string
        startTime: string
        endTime: string
    }
    id: string
}
