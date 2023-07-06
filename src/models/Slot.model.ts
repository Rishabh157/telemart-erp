/// ==============================================
// Filename:Slot.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type SlotManagementListResponse = {
    slotName: string
    channelGroupId: string
    type: string
    tapeNameId: String
    channelNameId: string
    slotStartTime: string
    slotEndTime: string
    channelTrp: string
    remarks: string
    runYoutubeLink: string | ''
    showOk: boolean
    reasonNotShow: string | null
    run: boolean
    slotRunImage: string
    slotRunVideo: string
    runStartTime: string
    runEndTime: string
    runRemark: string
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
// export enum Weeks {
//     MONDAY = 'MONDAY',
//     TUESDAY = 'TUESDAY',
//     WEDNESDAY = 'WEDNESDAY',
//     TRUSDAY = 'TRUSDAY',
//     FRIDAY = 'FRIDAY',
//     SATURDAY = 'SATURDAY',
//     SUNDAY = 'SUNDAY',
// }

// export enum Type{
// FIXED="FIXED",
// FLEXIBLE="FLEXIBLE"
// }

export type AddSlotManagement = {
    slotName: string
    channelGroupId: string
    type: string
    tapeNameId: String
    channelNameId: string
    channelTrp: string
    remarks: string
    channelSlots: {
        date: string
        startTime: string
        endTime: string
    }[]
    runYoutubeLink: string | ''
    run: boolean
    slotRunImage: string
    slotRunVideo: string
    runStartTime: string
    runEndTime: string
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
        slotDate: string
        slotStartTime: string
        slotEndTime: string
        runYoutubeLink: string | ''
        runStatus: boolean
        run: boolean
        slotRunImage: string
        slotRunVideo: string
        showOk: boolean
        reasonNotShow: string | null
        runStartTime: string
        runEndTime: string
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
