/// ==============================================
// Filename:orderSlice.ts
// Type: Slice Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- External Dependencies --|
import { createSlice, Slice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// |-- Internal Dependencies --|
import { OrderListResponse } from 'src/models'

// |-- Types --|
export type InitialStateType = {
    items: OrderListResponse[] | []
    allItems: OrderListResponse[] | []
    selectedItem: OrderListResponse | null
    totalItems: number
    isTableLoading: boolean
    page: number
    rowsPerPage: number
    searchValue: string
    sortValue: { field: string; value: 'DESC' | 'ASC' }
    selectedDealerId: string
    filterValue: string
    schemeValueFilter: string
    orderTypeValueFilter: string
    stateValueFilter: string
    districtValueFilter: string
    callCenterManagerValueFilter: string
    langBarrierValueFilter: boolean
    pndOrderValueFilter: boolean
    dateFilter: {
        startDate: string
        endDate: string
    }
    callbackDateFilter: {
        startDate: string
        endDate: string
        dateFilterKey?: string
    }
}

const initialState: InitialStateType = {
    items: [],
    allItems: [],
    selectedItem: null,
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: '',
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectedDealerId: '',
    filterValue: '',
    schemeValueFilter: '',
    orderTypeValueFilter: '',
    stateValueFilter: '',
    districtValueFilter: '',
    callCenterManagerValueFilter : '',
    langBarrierValueFilter: false,
    pndOrderValueFilter: false,
    dateFilter: {
        startDate: '',
        endDate: '',
    },
    callbackDateFilter: {
        startDate: '',
        endDate: '',
        dateFilterKey: 'firstCallCallBackDate',
    },
}

const warehouseAssignedOrderSlice: Slice<InitialStateType> = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<OrderListResponse[] | []>) => {
            state.items = action.payload
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
            document.getElementById('scroll-top')?.scrollTo(0, 0)
        },
        setRowsPerPage: (state, action: PayloadAction<number>) => {
            state.rowsPerPage = action.payload
            state.page = 1
            document.getElementById('scroll-top')?.scrollTo(0, 0)
        },
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload
            state.page = 1
        },
        setSortValue: (
            state,
            action: PayloadAction<{ field: string; value: 'DESC' | 'ASC' }>
        ) => {
            state.sortValue = action.payload
            state.page = 1
        },
        setTotalItems: (state, action: PayloadAction<number>) => {
            state.totalItems = action.payload
        },
        setIsTableLoading: (state, action: PayloadAction<boolean>) => {
            state.isTableLoading = action.payload
        },
        setSelectedDealerId: (state, action: PayloadAction<string>) => {
            state.selectedDealerId = action.payload
        },
        setAllItems: (
            state,
            action: PayloadAction<OrderListResponse[] | []>
        ) => {
            state.allItems = action.payload
        },
        setSelectedItem: (
            state,
            action: PayloadAction<OrderListResponse | null>
        ) => {
            state.selectedItem = action.payload
        },
        setFilterValue: (state, action: PayloadAction<string>) => {
            state.filterValue = action.payload
        },
        setSchemeFilterValue: (state, action: PayloadAction<string>) => {
            state.schemeValueFilter = action.payload
        },
        setOrderTypeFilterValue: (state, action: PayloadAction<string>) => {
            state.orderTypeValueFilter = action.payload
        },
        setStateFilterValue: (state, action: PayloadAction<string>) => {
            state.stateValueFilter = action.payload
        },
        setDistrictFilterValue: (state, action: PayloadAction<string>) => {
            state.districtValueFilter = action.payload
        },
        setCallCenterManagerFilterValue: (state, action: PayloadAction<string>) => {
            state.callCenterManagerValueFilter = action.payload
        },
        setLanguageBarrierFilterValue: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.langBarrierValueFilter = action.payload
        },
        setPndOrderFilterValue: (state, action: PayloadAction<boolean>) => {
            state.pndOrderValueFilter = action.payload
        },
        setDateFilter: (state, action: PayloadAction<any>) => {
            state.dateFilter = action.payload
        },
        setCallbackDateFilter: (state, action: PayloadAction<any>) => {
            state.callbackDateFilter = action.payload
        },
    },
})

export const {
    setItems,
    setPage,
    setRowsPerPage,
    setSearchValue,
    setSortValue,
    setTotalItems,
    setIsTableLoading,
    setSelectedDealerId,
    setSelectedItem,
    setAllItems,
    setFilterValue,
    // filter value
    setSchemeFilterValue,
    setOrderTypeFilterValue,
    setStateFilterValue,
    setDistrictFilterValue,
    setCallCenterManagerFilterValue,
    setLanguageBarrierFilterValue,
    setPndOrderFilterValue,
    setDateFilter,
    setCallbackDateFilter,
} = warehouseAssignedOrderSlice.actions
export default warehouseAssignedOrderSlice.reducer
