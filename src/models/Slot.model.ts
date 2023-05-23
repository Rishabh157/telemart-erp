export type SlotManagementListResponse = {
    slotName: string
    groupNameLabel: string
    startDateTime: string
    type: string
    days: string[]
    tapeName: string
    tapeLabel: string
    channelLabel: string
    endDateTime: string
    channelTrp: string
    remarks: string
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
    channelGroup: string
    startDateTime: string
    type: string
    days: string[]
    tapeName: String
    channelName: string
    endDateTime: string
    channelTrp: string
    remarks: string
    companyId: string
}

export type UpdateSlotManagement = {
    body: {
        slotName: string
        channelGroup: string
        startDateTime: string
        type: string
        days: string[]
        tapeName: String
        channelName: string
        endDateTime: string
        channelTrp: string
        remarks: string
        companyId: string
    }
    id: string
}
