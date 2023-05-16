export type ApiSingleResponse<T> = {
    message: string
    status: boolean
    issue: string | null
    data: T[] | null
    code: string
}
