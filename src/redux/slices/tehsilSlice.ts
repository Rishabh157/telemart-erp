/// ==============================================
// Filename:tehsilSlice.ts
// Type: Slice Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- External Dependencies --|
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// |-- Internal Dependencies --|
import { TehsilListResponse } from 'src/models/Tehsil.model'
import { LocationSelectType } from 'src/utils'

export interface TehsilSliceStateType {
    items: TehsilListResponse[] | []
    allTehsils: TehsilListResponse[] | []
    selectedTehsil: TehsilListResponse | null
    selectedLocationTehsil: LocationSelectType | null
    totalItems: number
    isTableLoading: boolean
    page: number
    rowsPerPage: number
    searchValue: string
    sortValue: { field: string; value: 'DESC' | 'ASC' }
    selectedId: string
    filterValue: string
}

const initialState: TehsilSliceStateType = {
    items: [],
    selectedTehsil: null,
    selectedLocationTehsil: null,
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: '',
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectedId: '',
    filterValue: '',
    allTehsils: [],
}

const tehsilSlice: any = createSlice({
    name: 'tehsil',
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<TehsilListResponse[] | []>) => {
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
        setSelectedTehsil: (
            state,
            action: PayloadAction<TehsilListResponse | null>
        ) => {
            state.selectedTehsil = action.payload
        },
        setSelectedLocationTehsil: (
            state,
            action: PayloadAction<LocationSelectType | null>
        ) => {
            state.selectedLocationTehsil = action.payload
        },
        setFilterValue: (state, action: PayloadAction<string>) => {
            state.filterValue = action.payload
        },
        setAllTehsils: (state, action: PayloadAction<TehsilListResponse[]>) => {
            state.allTehsils = action.payload
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
    setSelectedTehsil,
    setSelectedLocationTehsil,
    setFilterValue,
    setAllTehsils,
} = tehsilSlice.actions
export default tehsilSlice.reducer
