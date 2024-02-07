/// ==============================================
// Filename:ndrDispositionSlice.ts
// Type: Slice Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- External Dependencies --|
import { Slice, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// |-- Internal Dependencies --|
import { DispositionOneListResponse } from 'src/models/configurationModel/DisposiionOne.model'

export interface NdrDispositionSliceStateType {
    items: DispositionOneListResponse[] | []
    selectedDispositionOne: DispositionOneListResponse | null
    allItems: DispositionOneListResponse[] | []
    totalItems: number
    isTableLoading: boolean
    page: number
    rowsPerPage: number
    searchValue: string
    sortValue: { field: string; value: 'DESC' | 'ASC' }
    selectedId: string
    isActive: string
}

const initialState: NdrDispositionSliceStateType = {
    items: [],
    allItems: [],
    selectedDispositionOne: null,
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: '',
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectedId: '',
    isActive: '',
}

const ndrDispositionSlice: Slice<NdrDispositionSliceStateType> = createSlice({
    name: 'ndrDisposition',
    initialState,
    reducers: {
        setItems: (
            state,
            action: PayloadAction<DispositionOneListResponse[] | []>
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
            action: PayloadAction<DispositionOneListResponse[] | []>
        ) => {
            state.allItems = action.payload
        },
        setSelectedDispositionOne: (
            state,
            action: PayloadAction<DispositionOneListResponse | null>
        ) => {
            state.selectedDispositionOne = action.payload
        },
        setIsActivateUser: (state, action: PayloadAction<string>) => {
            state.isActive = action.payload
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
    setSelectedDispositionOne,
    setAllItems,
    setIsActivateUser,
} = ndrDispositionSlice.actions
export default ndrDispositionSlice.reducer
