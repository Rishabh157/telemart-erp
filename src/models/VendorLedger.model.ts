/// ==============================================
// Filename:VendorLedger.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export enum NoteType {
    CREDIT_NOTE_CREATED = 'CREDIT_NOTE_CREATED',
    DEBIT_NOTE_CREATED = 'DEBIT_NOTE_CREATED',
    DEALER_AMOUNT_CREDITED = 'DEALER_AMOUNT_CREDITED',
    VENDOR_AMOUNT_CREDITED = 'VENDOR_AMOUNT_CREDITED',
}
export type VendorLedgerListResponse = {
    noteType: keyof typeof NoteType
    creditAmount: number
    debitAmount: number
    balance: number
    remark: string
    vendorId: string
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: Date | number
    updatedAt: Date | number
    _id: string
    __v: number
}

export type VendorLedgerAdd = {
    noteType: keyof typeof NoteType
    creditAmount: number
    debitAmount: number
    // price: number
    remark: string
    companyId: string
    vendorId: string
}

export type UpdateVendorLedger = {
    body: {
        noteType: keyof typeof NoteType
        creditAmount: number
        debitAmount: number
        remark: string
        companyId: string
        vendorId: string
    }
    id: string
}
