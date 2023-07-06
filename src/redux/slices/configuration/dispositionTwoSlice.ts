/// ==============================================
// Filename:dispositionTwoSlice.ts
// Type: Slice Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================


// |-- External Dependencies --|
import { Slice, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// |-- Internal Dependencies --|
import { DispositionTwoListResponse } from 'src/models/configurationModel/DispositionTwo.model'

export interface DispositionTwoSliceStateType {
    items: DispositionTwoListResponse[] | []
    selectedDispostion: DispositionTwoListResponse | null
    allItems: DispositionTwoListResponse[] | []
    totalItems: number
    isTableLoading: boolean
    page: number
    rowsPerPage: number
    searchValue: string
    sortValue: { field: string; value: 'DESC' | 'ASC' }
    selectedId: string
    filterValue: string
}

const initialState: DispositionTwoSliceStateType = {
    items: [],
    allItems: [],
    selectedDispostion: null,
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: '',
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectedId: '',
    filterValue: '',
}

const dispositionTwoSlice: Slice<DispositionTwoSliceStateType> = createSlice({
    name: 'dispositionTwo',
    initialState,
    reducers: {
        setItems: (
            state,
            action: PayloadAction<DispositionTwoListResponse[] | []>
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
        setFilterValue: (state, action: PayloadAction<string>) => {
            state.filterValue = action.payload
        },
        setSelectedId: (state, action: PayloadAction<string>) => {
            state.selectedId = action.payload
        },
        setAllItems: (
            state,
            action: PayloadAction<DispositionTwoListResponse[] | []>
        ) => {
            state.allItems = action.payload
        },
        setSelectedDispostion: (
            state,
            action: PayloadAction<DispositionTwoListResponse | null>
        ) => {
            state.selectedDispostion = action.payload
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
    setFilterValue,
    setSelectedDispostion,
    setAllItems,
} = dispositionTwoSlice.actions
export default dispositionTwoSlice.reducer
