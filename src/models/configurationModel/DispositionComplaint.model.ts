/// ==============================================
// Filename:DispositionComplaint.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type DispositionComplaintListResponse = {
    dispositionName: string
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
    personalEmail = 'PERSONAL_EMAIL',
    officialEmail = 'PERSONAL_EMAIL',
    buisnessEmail = 'BUISNESS_EMAIL',
    companyEmail = 'COMPANY_EMAIL',
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

export type AddDispositionComplaint = {
    dispositionName: string
    priority: string
    emailType: string
    smsType: string
    companyId: string
}

export type UpdateDispositionComplaint = {
    body: {
        dispositionName: string
        priority: String
        emailType: string
        smsType: string
        companyId: string
    }
    id: string
}
