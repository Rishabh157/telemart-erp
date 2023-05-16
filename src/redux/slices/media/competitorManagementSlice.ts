import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CompetitorManagementListResponse } from 'src/models/CompetitorManagement.model'


export interface CompetitorManagementSliceStateType {
    items: CompetitorManagementListResponse[] | []
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
} = competitorManagementSlice.actions
export default competitorManagementSlice.reducer
