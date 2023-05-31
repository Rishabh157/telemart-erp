export type InitialCallerThreeListResponse = {
    initialCallName: string
    initialCallOneLabel: string
    initialCallTwoLabel: string
    initialCallOneId: string
    initialCallTwoId: string
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

enum comapintType {
    complaint = 'COMPLAINT',
    enquiry = 'ENQUIRY',
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
    complaintType: string
    emailType: string
    smsType: string
    returnType: string[]
    companyId: string
}

export type UpdateInitialCallerThree = {
    body: {
        initialCallName: string
        initialCallOneId: string
        initialCallTwoId: string
        complaintType: string
        emailType: string
        smsType: string
        returnType: string[]
        companyId: string
    }
    id: string
}
