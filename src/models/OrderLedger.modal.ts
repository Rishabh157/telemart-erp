/// ==============================================
// Filename:OrderLedger.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type OrderLedgerResponse = {
    _id: string
    orderNumber: string
    dealerName: string
    schemeName: string
    credit: string
    debit: string
    balance: string
    date: number
    remark: number
    total: number
}
