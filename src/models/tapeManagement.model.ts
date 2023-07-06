/// ==============================================
// Filename:tapeManagement.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type TapeManagementListResponse = {
    _id: string
    tapeName: string
    tapeType: string
    scheme: string
    languageId: string[]
    duration: string
    artistId: string[]
    phone: string[]
    webSiteLink: string
    youtubeLink: string
    companyId: string
    remarks: string
    isDeleted: boolean
    isActive: boolean
    createdAt: string
    updatedAt: string
    __v: number
    schemeLabel: string
    channelGroupLabel: string
    languageLabel: string
}

export type AddTapeManagement = {
    tapeName: string
    tapeType: string
    schemeId: string | null
    languageId: string[]
    duration: string
    artistId: string[]
    remarks: string | ''
    phone: string[]
    webSiteLink: string
    youtubeLink: string
    companyId: string
}

export type UpdateTapeManagement = {
    body: {
        tapeName: string
        tapeType: string
        schemeId: string | null
        languageId: string[]
        duration: string
        artistId: string[]
        remarks: string | ''
        phone: string[]
        webSiteLink: string
        youtubeLink: string
        companyId: string
    }
    id: string
}
