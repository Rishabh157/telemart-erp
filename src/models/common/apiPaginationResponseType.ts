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
