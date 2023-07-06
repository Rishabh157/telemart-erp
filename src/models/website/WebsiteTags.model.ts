/// ==============================================
// Filename:WebsiteTags.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type WebsiteTagsListResponse = {
    websitPageId: string
    websiteMasterId: string
    metaDescription: string
    metaKeyword: string
    metaOgTitle: string
    metaOgUrl: string
    metaOgImage: string
    metaOgDescription: string
    metaOgType: string
    metaTwitterTitle: string
    metaTwitterCard: string
    metaTwitterImage: string
    companyId: string
    _id: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    __v: number
}

export type AddWebsiteTags = {
    websitPageId: string
    websiteMasterId: string
    metaDescription: string
    metaKeyword: string
    metaOgTitle: string
    metaOgUrl: string
    metaOgImage: string
    metaOgDescription: string
    metaOgType: string
    metaTwitterTitle: string
    metaTwitterCard: string
    metaTwitterImage: string
    companyId: string
}

export type UpdateWebsiteTags = {
    body: {
        websitPageId: string
        websiteMasterId: string
        metaDescription: string
        metaKeyword: string
        metaOgTitle: string
        metaOgUrl: string
        metaOgImage: string
        metaOgDescription: string
        metaOgType: string
        metaTwitterTitle: string
        metaTwitterCard: string
        metaTwitterImage: string
        companyId: string
    }
    id: string
}
