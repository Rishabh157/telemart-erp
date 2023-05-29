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
    companyId: string | ''
}

export type UpdateWebsiteBlog = {
    body: {
        blogName: string
        blogTitle: string
        blogSubtitle: string | ''
        image: string | ''
        blogDescription: string | '' | ''
        companyId: string
    }
    id: string
}
