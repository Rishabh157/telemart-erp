/// ==============================================
// Filename:initialCallerTwoSlice.ts
// Type: Slice Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- External Dependencies --|
import { Slice, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// |-- Internal Dependencies --|
import { InitialCallerTwoListResponse } from 'src/models/configurationModel/InitialCallerTwo.model'

export interface InitialCallerTwoSliceStateType {
    items: InitialCallerTwoListResponse[] | []
    selectedInitialCallerTwo: InitialCallerTwoListResponse | null
    allItems: InitialCallerTwoListResponse[] | []
    totalItems: number
    isTableLoading: boolean
    page: number
    rowsPerPage: number
    searchValue: string
    sortValue: { field: string; value: 'DESC' | 'ASC' }
    selectedId: string
    filterValue: string
}

const initialState: InitialCallerTwoSliceStateType = {
    items: [],
    allItems: [],
    selectedInitialCallerTwo: null,
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: '',
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectedId: '',
    filterValue: '',
}

const initialCallerTwoSlice: Slice<InitialCallerTwoSliceStateType> =
    createSlice({
        name: 'initialCallerTwo',
        initialState,
        reducers: {
            setItems: (
                state,
                action: PayloadAction<InitialCallerTwoListResponse[] | []>
            ) => {
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
            setSelectedId: (state, action: PayloadAction<string>) => {
                state.selectedId = action.payload
            },
            setAllItems: (
                state,
                action: PayloadAction<InitialCallerTwoListResponse[] | []>
            ) => {
                state.allItems = action.payload
            },
            setFilterValue: (state, action: PayloadAction<string>) => {
                state.filterValue = action.payload
            },
            setSelectedInitialCallerTwo: (
                state,
                action: PayloadAction<InitialCallerTwoListResponse | null>
            ) => {
                state.selectedInitialCallerTwo = action.payload
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
    setSelectedId,
    setSelectedInitialCallerTwo,
    setAllItems,
    setFilterValue,
} = initialCallerTwoSlice.actions
export default initialCallerTwoSlice.reducer
