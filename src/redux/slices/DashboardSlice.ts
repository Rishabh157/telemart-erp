import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction, Slice } from '@reduxjs/toolkit'
import moment from 'moment'

export interface DashboardSliceStateType {
    items: any[] | []
    totalItems: number
    searchValue: string
    currentPage: number
    rowsPerPage: number
    isTableLoading: boolean
    sortBy: string
    filterBy: { fieldName: string; value: string[] }[]
    selectedId: string
    dateFilter: {
        start_date: string | null
        end_date: string | null
        dateFilterKey: string
    }
    rangeFilterBy: {
        rangeFilterKey: string
        rangeInitial: string
        rangeEnd: string
    }
    isVisibleFilterDialog: boolean
}

const initialState: DashboardSliceStateType = {
    items: [],
    totalItems: 0,
    searchValue: '',
    currentPage: 0,
    rowsPerPage: 10,
    isTableLoading: false,
    sortBy: '',
    filterBy: [
        {
            fieldName: '',
            value: [],
        },
    ],
    rangeFilterBy: {
        rangeFilterKey: '',
        rangeInitial: '',
        rangeEnd: '',
    },
    selectedId: '',
    dateFilter: {
        start_date: `${moment().format('YYYY-MM-DD')}`,
        end_date: `${moment().format('YYYY-MM-DD')}`,
        dateFilterKey: '',
    },
    isVisibleFilterDialog: false,
}

const dashboardSlice: Slice<DashboardSliceStateType> = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload
            state.currentPage = 0
        },

        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setRowsPerPage: (state, action: PayloadAction<number>) => {
            state.rowsPerPage = action.payload
            state.currentPage = 0
        },
        setIsTableLoading: (state, action: PayloadAction<boolean>) => {
            state.isTableLoading = action.payload
        },
        setSortBy: (state, action: PayloadAction<string>) => {
            state.sortBy = action.payload
        },
        setFilterBy: (
            state,
            action: PayloadAction<{ fieldName: string; value: string[] }[]>
        ) => {
            state.filterBy = action.payload
        },
        setSelectedId: (state, action: PayloadAction<string>) => {
            state.selectedId = action.payload
        },
        setItems: (state, action: PayloadAction<any[] | []>) => {
            state.items = action.payload
        },
        setTotalItems: (state, action: PayloadAction<number>) => {
            state.totalItems = action.payload
        },
        setDateFilter: (state, action: PayloadAction<any>) => {
            state.dateFilter = action.payload
        },
        setRangeFilterBy: (
            state,
            action: PayloadAction<{
                rangeEnd: string
                rangeInitial: string
                rangeFilterKey: string
            }>
        ) => {
            state.rangeFilterBy = action.payload
        },
        setIsVisibleFilterDialog: (state, action: PayloadAction<boolean>) => {
            state.isVisibleFilterDialog = action.payload
        },
    },
})

export const {
    setSearchValue,
    setCurrentPage,
    setRowsPerPage,
    setIsTableLoading,
    setSortBy,
    setFilterBy,
    setSelectedId,
    setItems,
    setTotalItems,
    setDateFilter,
    setIsVisibleFilterDialog,
    setRangeFilterBy,
} = dashboardSlice.actions

export default dashboardSlice.reducer
