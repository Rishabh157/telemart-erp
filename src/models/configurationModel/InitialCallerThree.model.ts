/// ==============================================
// Filename:InitialCallerThree.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type InitialCallerThreeListResponse = {
    _id: string
    callType: string
    emailType: string
    smsType: string
    returnType: string[]
    isPnd: boolean
    cancelFlag: boolean
    initialCallName: string
    initialCallOneId: string
    initialCallTwoId: string
    initialCallDisplayName: string
    initialCallTwoDisplayLabel: string
    initialCallOneDisplayLabel: string
    companyId: string
    isDeleted: boolean
    isActive: boolean
    createdAt: string
    updatedAt: string
    __v: number
    initialCallTwoLabel: string
    initialCallOneLabel: string
}

enum emailType {
    personalEmail = 'PERSONAL EMAIL',
    officialEmail = 'OFFICIAL EMAIL',
    buisnessEmail = 'BUISNESS EMAIL',
    companyEmail = 'COMPANY EMAIL',
}
enum returnType {
    Escalate = 'ESCALATE',
    Replacement = 'REPLACEMENT',
    Refund = 'REFUND',
}

enum smsType {
    alcobanSms = 'ALCOBAN SMS',
    complaintCCA_CNC = 'CUSTOMER NOT CONTACTABLE',
    complaintCCA_OWEI = 'COMPLAINT CCA-ORDERS WITH EMAIL ID',
    complaintCCA_OWNEI = 'COMPLAINT CCA-ORDERS WITHOUT EMAIL ID',
    complaintORC = 'CREATE ORDER REFUND-CHEQUE',
    complaintORN = 'CREATE ORDER REFUND-NEFT',
    complaintRPIM = 'CREATE RPI-MANUAL',
    complaintRPI = 'CREATE RPI-TV-SHOP COURIER ASSIGNED',
    complaintSCD = 'COMPLAINT SERVICE DETAILS',
    createComplant = 'CREATE COMPLAINT',
    dealerDelivered = 'DEALER DELIVERED',
    dealerDeliveredBI = 'DEALER DELIVERED BOY INTRANSIT',
    initialCallerMsg = 'initialCaller MESSAGE',
    hold = 'HOLD',
    inTransitDB = 'IN-TRANSIT-DELIVERY-BOY',
    invoiceSent = 'INVOICE SENT',
}

export type AddInitialCallerThree = {
    initialCallName: string
    initialCallOneId: string
    initialCallTwoId: string
    callType: string
    emailType: string
    isPnd: boolean
    cancelFlag: boolean
    smsType: string
    returnType: string[]
    companyId: string
}

export type UpdateInitialCallerThree = {
    body: {
        initialCallName: string
        initialCallOneId: string
        initialCallTwoId: string
        callType: string
        isPnd: boolean
        cancelFlag: boolean
        emailType: string
        smsType: string
        returnType: string[]
        companyId: string
    }
    id: string
}
