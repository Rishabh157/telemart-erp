/// ==============================================
// Filename:assetsLocationSlice.ts
// Type: Slice Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- External Dependencies --|
import { createSlice, Slice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// |-- Internal Dependencies --|
import { AssetsLocationListResponse } from 'src/models/assets/AssetsLocation.modal'

export interface AssetsLocationSliceStateType {
    items: AssetsLocationListResponse[] | []
    allItems: AssetsLocationListResponse[] | []
    selectedItem: AssetsLocationListResponse | null
    totalItems: number
    isTableLoading: boolean
    page: number
    rowsPerPage: number
    searchValue: string
    sortValue: { field: string; value: 'DESC' | 'ASC' }
    selectLocation: string
    filterValue: string
}

const initialState: AssetsLocationSliceStateType = {
    items: [],
    allItems: [],
    selectedItem: null,
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: '',
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectLocation: '',
    filterValue: '',
}

const assetsLocationSlice: Slice<AssetsLocationSliceStateType> = createSlice({
    name: 'assetsLocation',
    initialState,
    reducers: {
        setItems: (
            state,
            action: PayloadAction<AssetsLocationListResponse[] | []>
        ) => {
            state.items = action.payload
        },
        setAllItems: (
            state,
            action: PayloadAction<AssetsLocationListResponse[] | []>
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
        setSelectLocation: (state, action: PayloadAction<string>) => {
            state.selectLocation = action.payload
        },
        setSelectedLocation: (
            state,
            action: PayloadAction<AssetsLocationListResponse | null>
        ) => {
            state.selectedItem = action.payload
        },
        setFilterValue: (state, action: PayloadAction<string>) => {
            state.filterValue = action.payload
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
    setSelectLocation,
    setSelectedLocation,
    setFilterValue,
} = assetsLocationSlice.actions

export default assetsLocationSlice.reducer
