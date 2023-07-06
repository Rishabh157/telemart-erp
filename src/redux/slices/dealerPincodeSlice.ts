/// ==============================================
// Filename:dealerPincodeSlice.ts
// Type: Slice Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- External Dependencies --|
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// |-- Internal Dependencies --|
import { DealersPincodeListResponse } from 'src/models/DealerPinCode.model'

export type InitialStateType = {
    items: DealersPincodeListResponse[] | []
    allItems: DealersPincodeListResponse[] | []
    selectedItem: DealersPincodeListResponse | null
    alldealerCategory: DealersPincodeListResponse[] | []
    totalItems: number
    isTableLoading: boolean
    page: number
    rowsPerPage: number
    searchValue: string
    sortValue: { field: string; value: 'DESC' | 'ASC' }
    selectedDealerId: string
}

const initialState: InitialStateType = {
    items: [],
    allItems: [],
    selectedItem: null,
    alldealerCategory: [],
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: '',
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectedDealerId: '',
}

const dealerPincodeSlice: any = createSlice({
    name: 'dealersPincode',
    initialState,
    reducers: {
        setItems: (
            state,
            action: PayloadAction<DealersPincodeListResponse[] | []>
        ) => {
            state.items = action.payload
        },
        setAllItems: (
            state,
            action: PayloadAction<DealersPincodeListResponse[] | []>
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
            action: PayloadAction<DealersPincodeListResponse | null>
        ) => {
            state.selectedItem = action.payload
        },
        setAllDealerCategory: (
            state,
            action: PayloadAction<DealersPincodeListResponse[] | []>
        ) => {
            state.alldealerCategory = action.payload
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
    setAllDealerCategory,
} = dealerPincodeSlice.actions

export default dealerPincodeSlice.reducer
