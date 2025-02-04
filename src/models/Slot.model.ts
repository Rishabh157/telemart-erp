// |-- Types --|
export type SlotManagementListResponse = {
    slotName: string
    channelGroupId: string
    type: string
    tapeNameId: string
    channelNameId: string
    slotPrice: number
    slotDay: string[]
    slotStartTime: string
    slotEndTime: string
    slotContinueStatus: boolean
    channelTrp: string
    remarks: string
    runYoutubeLink: string | ''
    showOk: boolean
    reasonNotShow: string | null
    run: boolean
    slotRunImage: string
    slotRenewal: string
    slotRunVideo: string
    runStatus: boolean | null
    runStartTime: string
    runEndTime: string
    runRemark: string
    slotStartDate: string
    groupNameLabel: string
    tapeLabel: string
    channelLabel: string
    companyId: string
    _id: string
    is_active: boolean
    is_deleted: boolean
    createdAt: string
    updatedAt: string
    __v: number
}

export type AddSlotDefinition = {
    slotName: string
    channelGroupId: string
    type: string
    tapeNameId: String
    channelNameId: string
    channelTrp: string
    remarks: string
    slotPrice: number
    slotDay: string[]
    slotRenewal: string
    slotStartTime: string
    slotEndTime: string
    slotContinueStatus: boolean
    slotStartDate: string
    companyId: string
}

export type UpdateSlotDefinition = {
    body: {
        slotName: string
        channelGroupId: string
        type: string
        tapeNameId: String
        channelNameId: string
        channelTrp: string
        remarks: string
        slotPrice: number
        slotRenewal: string
        slotDay: string[]
        slotStartTime: string
        slotStartDate: string
        slotEndTime: string
        slotContinueStatus: boolean

        companyId: string
    }
    id: string
}

export type AddSlotManagement = {
    slotName: string
    channelGroupId: string
    type: string
    tapeNameId: String
    channelNameId: string
    channelTrp: string
    remarks: string
    slotPrice: number
    slotDay: string[]
    slotStartTime: string
    slotEndTime: string
    slotContinueStatus: boolean
    runYoutubeLink: string | ''
    run: boolean
    slotRunImage: string
    showOk: boolean
    reasonNotShow: string | null
    runRemark: string
    companyId: string
}

export type UpdateSlotManagement = {
    body: {
        slotName: string
        channelGroupId: string
        type: string
        tapeNameId: String
        channelNameId: string
        channelTrp: string
        remarks: string
        slotPrice: number
        slotDay: string[]
        slotStartTime: string
        slotEndTime: string
        slotContinueStatus: boolean
        // slotStartDate: string
        runYoutubeLink: string | ''
        runStatus: boolean
        run: boolean
        slotRunImage: string
        // slotRunVideo: string
        showOk: boolean
        reasonNotShow: string | null
        // runStartTime: string
        // runEndTime: string
        runRemark: string
        companyId: string
    }
    id: string
}

export type FileMangerType = {
    fileType: string
    category: string
    fileUrl: any
}
