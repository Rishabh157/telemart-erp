export type DispositionThreeListResponse = {
    dispositionName: string
    dispostionOneLabel: string
    dispostionTwoLabel: string
    dispositionOneId: string
    dispositionTwoId: string
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
    alcobanSms= "ALCOBAN SMS",
    complaintCCA_CNC= "CUSTOMER NOT CONTACTABLE",
    complaintCCA_OWEI= "COMPLAINT CCA-ORDERS WITH EMAIL ID",
    complaintCCA_OWNEI= "COMPLAINT CCA-ORDERS WITHOUT EMAIL ID",
    complaintORC= "CREATE ORDER REFUND-CHEQUE",
    complaintORN= "CREATE ORDER REFUND-NEFT",
    complaintRPIM= "CREATE RPI-MANUAL",
    complaintRPI= "CREATE RPI-TV-SHOP COURIER ASSIGNED",
    complaintSCD= "COMPLAINT SERVICE DETAILS",
    createComplant= "CREATE COMPLAINT",
    dealerDelivered= "DEALER DELIVERED",
    dealerDeliveredBI= "DEALER DELIVERED BOY INTRANSIT",
    dispositionMsg= "DISPOSITION MESSAGE",
    hold= "HOLD",
    inTransitDB= "IN-TRANSIT-DELIVERY-BOY",
    invoiceSent= "INVOICE SENT",
}


export type AddDisPositionThree = {
    dispositionName: string
    dispositionOneId: string
    dispositionTwoId: string
    complaintType: string
    emailType: string
    smsType: string
    returnType: string[]
    companyId: string
}

export type UpdateDispositionThree = {
    body: {
        dispositionName: string
        dispositionOneId: string
        dispositionTwoId: string
        emailType: string
        smsType: string
        returnType: string[]
        companyId: string
    }
    id: string
}
