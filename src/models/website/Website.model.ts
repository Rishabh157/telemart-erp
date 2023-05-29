export type WebsiteListResponse = {
    websiteName: string
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
    websiteName: string
    companyId: string
}

export type UpdateWebsite = {
    body: {
        websiteName: string
        companyId: string
    }
    id: string
}
