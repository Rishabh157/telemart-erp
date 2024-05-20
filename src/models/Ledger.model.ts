/// ==============================================
// Filename:Ledger.model.ts
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
export type LedgerListResponse = {
    noteType: keyof typeof NoteType
    creditAmount: number
    debitAmount: number
    balance: number
    remark: string
    dealerId: string
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    taxAmount: number
    _id: string
    __v: number
}

export type LedgerAdd = {
    noteType: keyof typeof NoteType
    creditAmount: number
    debitAmount: number
    // price: number
    remark: string
    companyId: string
    dealerId: string
    taxAmount: number
}

export type UpdateLedger = {
    body: {
        noteType: keyof typeof NoteType
        creditAmount: number
        debitAmount: number
        remark: string
        companyId: string
        dealerId: string
    }
    id: string
}
