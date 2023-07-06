/// ==============================================
// Filename:Website.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type WebsiteListResponse = {
    productName: string
    url: string
    gaTagIp: string | ''
    searchConsoleIp: string | ''
    headerSpace: string | ''
    footerSpace: string | ''
    siteMap: string | ''
    companyId: string
    count: number
    _id: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    __v: number
}

export type AddWebsite = {
    productName: string
    url: string
    gaTagIp: string | ''
    searchConsoleIp: string | ''
    headerSpace: string | ''
    footerSpace: string | ''
    siteMap: string | ''
    companyId: string | ''
}

export type UpdateWebsite = {
    body: {
        productName: string
        url: string
        gaTagIp: string | ''
        searchConsoleIp: string | ''
        headerSpace: string | ''
        footerSpace: string | ''
        siteMap: string | ''
        companyId: string
    }
    id: string
}
