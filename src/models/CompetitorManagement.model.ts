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
    competitorName: string
    productName: string
    websiteLink: string
    ytLink: string
    productCategory: string
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
    image: string[]

    __v: number
}

export type AddCompetitorManagement = {
    competitorName: string
    companyId: string
    productName: string
    channelNameId: string
    schemePrice: string
    websiteLink: string
    ytLink: string
    productCategory: string
    mobileNumber: string
    date: string
    startTime: string
    endTime: string
    languageId: string
    image: string[]
}

export type UpdateCompetitorManagement = {
    body: {
        date: string
        competitorName: string
        productName: string
        websiteLink: string
        ytLink: string
        productCategory: string
        mobileNumber: string
        schemePrice: string
        companyId: string
        channelNameId: string
        startTime: string
        endTime: string
        languageId: string
        image: string[]
    }
    id: string
}
