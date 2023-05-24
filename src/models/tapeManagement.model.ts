export type TapeManagementListResponse = {
    _id: string
    tapeName: string
    channelGroupId: string
    tapeType: string
    scheme: string
    languageId: string
    duration: string
    artistId: string[]
    companyId: string
    remarks: string
    isDeleted: boolean
    isActive: boolean
    createdAt: string
    updatedAt: string
    __v: number
    schemeLabel: string
    languageLabel: string
   
}

export type AddTapeManagement = {
    tapeName: string
    channelGroupId: string | null
    tapeType: string
    schemeId: string | null
    languageId: string
    duration: string
    artistId: string[]
    remarks: string | ''
    companyId: string
}

export type UpdateTapeManagement = {
    body: {
        tapeName: string
        channelGroupId: string | null
        tapeType: string
        schemeId: string | null
        languageId: string
        duration: string
        artistId: string[]
        remarks: string | ''
        companyId: string        
    }
    id: string
}
