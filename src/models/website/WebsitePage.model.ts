export type WebsitePageListResponse = {
    pageName: string
    pageUrl: string
    headerSpace: string
    footerSpace: string
    companyId: string
    count: number
    _id: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    __v: number
}

export type AddWebsitePage = {
    pageName: string
    pageUrl: string
    headerSpace: string
    footerSpace: string
    companyId: string
    websiteId: string
}

export type UpdateWebsitePage = {
    body: {
        pageName: string
        pageUrl: string
        headerSpace: string
        footerSpace: string
        companyId: string
        websiteId: string
    }
    id: string
}
