export type SlotManagementListResponse = {
    slotName: string
    channelGroupId: string
    type: string
    days: string[]
    tapeNameId: String
    channelNameId: string
    slotStartTime: string
    slotEndTime: string
    channelTrp: string
    remarks: string
    run: boolean
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
    days: string[]
    tapeNameId: String
    channelNameId: string
    channelTrp: string
    remarks: string
    channelSlots: {
        date: string
        startTime: string
        endTime: string
    }[]
    run: boolean
    runStartTime: string
    runEndTime: string
    runRemark: string
    companyId: string
}

export type UpdateSlotManagement = {
    body: {
        slotName: string
        channelGroupId: string
        type: string
        days: string[]
        tapeNameId: String
        channelNameId: string
        channelTrp: string
        remarks: string
        slotDate: string
        slotStartTime: string
        slotEndTime: string
        runStatus: boolean
        run: boolean
        runStartTime: string
        runEndTime: string
        runRemark: string
        companyId: string
    }
    id: string
}
