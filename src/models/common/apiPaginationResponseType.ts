/// ==============================================
// Filename:apiPaginationResponseTypes.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type ApiPaginationResponse<T> = {
    data: T[] | null
    totalPage: number
    status: boolean
    issue: string | null
    currentPage: number
    totalItem: number
    pageSize: number
    message: string
    code: string
}
