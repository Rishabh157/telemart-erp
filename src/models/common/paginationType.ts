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
        startDate?: string | null
        endDate?: string | null
        dateFilterKey?: string
    }
    orderBy: string
    orderByValue: number
    isPrepaid?: boolean
    isPaginationRequired?: boolean
    isOrderOrInquiry?: any
    getBatchData?: boolean
    orderNumber?: number
    barcodeNumber?: string
    callCenterId?: string | null
    callbackDateFilter?: {
        startDate?: string
        endDate?: string
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
