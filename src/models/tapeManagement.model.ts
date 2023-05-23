export type TapeManagementListResponse = {
    _id: string
    tapeName: string
    channelGroup: string
    tapeType: string
    schemeId: string
    languageId: string
    duration: string
    artistId: string
    companyId: string
    remarks: string
    isDeleted: boolean
    isActive: boolean
    createdAt: string
    updatedAt: string
    __v: number
    schemeLabel: string
    languageLabel: string
    youtubeLink: string
}

export type AddTapeManagement = {
    tapeName: string
    channelGroup: string
    tapeType: string
    scheme: string
    language: string
    duration: string
    artist: string
    remarks: string
    companyId: string
    youtubeLink: string
}

export type UpdateTapeManagement = {
    body: {
        tapeName: string
        channelGroup: string
        tapeType: string
        scheme: string
        language: string
        duration: string
        artist: string
        remarks: string
        companyId: string
        youtubeLink: string
    }
    id: string
}
