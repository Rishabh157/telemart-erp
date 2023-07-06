/// ==============================================
// Filename:WebsiteBlog.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type WebsiteBlogListResponse = {
    blogName: string
    blogTitle: string
    blogSubtitle: string | ''
    image: string | ''
    blogDescription: string | ''
    companyId: string
    count: number
    _id: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    __v: number
}

export type AddWebsiteBlog = {
    blogName: string
    blogTitle: string
    blogSubtitle: string | ''
    image: string | ''
    blogDescription: string | ''
    companyId: string
    websiteId: string
}

export type UpdateWebsiteBlog = {
    body: {
        blogName: string
        blogTitle: string
        blogSubtitle: string | ''
        image: string | ''
        blogDescription: string | '' | ''
        companyId: string
        websiteId: string
    }
    id: string
}
