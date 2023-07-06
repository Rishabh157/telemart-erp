/// ==============================================
// Filename:DealerLedgerSlice.ts
// Type: Slice Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- External Dependencies --|
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// |-- Internal Dependencies --|
import { LedgerListResponse } from 'src/models/Ledger.model'

export type InitialStateType = {
    items: LedgerListResponse[] | []
    allItems: LedgerListResponse[] | []
    selectedItem: LedgerListResponse | null
    alldealerLedger: LedgerListResponse[] | []
    totalItems: number
    isTableLoading: boolean
    page: number
    rowsPerPage: number
    searchValue: string
    sortValue: { field: string; value: 'DESC' | 'ASC' }
    selectedDealerId: string
    filterBy: any
}
const initialState: InitialStateType = {
    items: [],
    allItems: [],
    selectedItem: null,
    alldealerLedger: [],
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: '',
    sortValue: { field: 'createdAt', value: 'DESC' },
    filterBy: {},
    selectedDealerId: '',
}

const dealerLedgerSlice: any = createSlice({
    name: 'dealersLedger',
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<LedgerListResponse[] | []>) => {
            state.items = action.payload
        },
        setAllItems: (
            state,
            action: PayloadAction<LedgerListResponse[] | []>
        ) => {
            state.allItems = action.payload
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
        setSelectedItem: (
            state,
            action: PayloadAction<LedgerListResponse | null>
        ) => {
            state.selectedItem = action.payload
        },
        setAllDealerCategory: (
            state,
            action: PayloadAction<LedgerListResponse[] | []>
        ) => {
            state.alldealerLedger = action.payload
        },

        setFilterBy: (state, action: PayloadAction<[]>) => {
            state.filterBy = action.payload
        },
    },
})

export const {
    setItems,
    setAllItems,
    setPage,
    setRowsPerPage,
    setSearchValue,
    setSortValue,
    setTotalItems,
    setIsTableLoading,
    setSelectedDealerId,
    setSelectedItem,
    setAllDealerLedger,
    setFilterBy,
} = dealerLedgerSlice.actions
export default dealerLedgerSlice.reducer
