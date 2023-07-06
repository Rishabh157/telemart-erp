/// ==============================================
// Filename:apiSIngleResponseType.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type ApiSingleResponse<T> = {
    message: string
    status: boolean
    issue: string | null
    data: T[] | null
    code: string
}
