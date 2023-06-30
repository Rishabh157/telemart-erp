import { IconType } from 'react-icons'

export type PaginationType = {
    limit: number
    searchValue: string
    params: string[]
    page: number
    filterBy: {
        fieldName: string
        value: any
    }[]
    dateFilter: {
        start_date?: string
        end_date?: string
        dateFilterKey?: string
    }
    orderBy: string
    orderByValue: number
    isPaginationRequired?: boolean
}

// |-- Types --|
export type Tabs = {
    label: string
    icon: IconType
    path?: string
}
