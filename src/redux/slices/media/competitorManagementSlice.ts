/// ==============================================
// Filename:competitorManagementSlice.ts
// Type: Slice Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================


// |-- External Dependencies --|
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// |-- Internal Dependencies --|
import { CompetitorManagementListResponse } from 'src/models/CompetitorManagement.model'

export interface CompetitorManagementSliceStateType {
    items: CompetitorManagementListResponse[] | []
    selectedItem: CompetitorManagementListResponse | null
    totalItems: number
    isTableLoading: boolean
    page: number
    rowsPerPage: number
    searchValue: string
    sortValue: { field: string; value: 'DESC' | 'ASC' }
    selectecompetitor: string
}

const initialState: CompetitorManagementSliceStateType = {
    items: [],
    selectedItem: null,
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: '',
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectecompetitor: '',
}

const competitorManagementSlice: any = createSlice({
    name: 'competitorManagement',
    initialState,
    reducers: {
        setItems: (
            state,
            action: PayloadAction<CompetitorManagementListResponse[] | []>
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
        setSelectecompetitor: (state, action: PayloadAction<string>) => {
            state.selectecompetitor = action.payload
        },
        setSelectedCompetitor: (
            state,
            action: PayloadAction<CompetitorManagementListResponse | null>
        ) => {
            state.selectedItem = action.payload
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
    setSelectecompetitor,
    setSelectedCompetitor,
} = competitorManagementSlice.actions
export default competitorManagementSlice.reducer
