/// ==============================================
// Filename:PaginationType.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
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
    isOrderOrInquiry?: any
    getBatchData?: boolean
    callCenterId?: string
    callbackDateFilter?: {
        start_date?: string
        end_date?: string
        dateFilterKey?: string
    }
}

// |-- Types --|
export type Tabs = {
    label: string
    icon: IconType
    path?: string
    name?: string
}
