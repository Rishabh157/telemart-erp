/// ==============================================
// Filename:dispositionComplaintSlice.ts
// Type: Slice Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Internal Dependencies --|
import { DispositionComplaintListResponse } from 'src/models/configurationModel/DispositionComplaint.model'

// |-- External Dependencies --|
import { Slice, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface DispositionCompliantSliceStateType {
    items: DispositionComplaintListResponse[] | []
    selectedDispositionCompalint: DispositionComplaintListResponse | null
    allItems: DispositionComplaintListResponse[] | []
    totalItems: number
    isTableLoading: boolean
    page: number
    rowsPerPage: number
    searchValue: string
    sortValue: { field: string; value: 'DESC' | 'ASC' }
    selectedId: string
}

const initialState: DispositionCompliantSliceStateType = {
    items: [],
    allItems: [],
    selectedDispositionCompalint: null,
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: '',
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectedId: '',
}

const dispositionCompliantSlice: Slice<DispositionCompliantSliceStateType> =
    createSlice({
        name: 'dispositionCompliant',
        initialState,
        reducers: {
            setItems: (
                state,
                action: PayloadAction<DispositionComplaintListResponse[] | []>
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
                action: PayloadAction<DispositionComplaintListResponse[] | []>
            ) => {
                state.allItems = action.payload
            },
            setSelectedDispositionComplaint: (
                state,
                action: PayloadAction<DispositionComplaintListResponse | null>
            ) => {
                state.selectedDispositionCompalint = action.payload
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
    setSelectedDispositionComplaint,
    setAllItems,
} = dispositionCompliantSlice.actions
export default dispositionCompliantSlice.reducer
