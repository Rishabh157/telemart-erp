import { TapeManagementListResponse } from '../../../models/tapeManagement.model'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface TapeManagementSliceStateType {
    items: TapeManagementListResponse[] | []
    totalItems: number
    isTableLoading: boolean
    page: number
    rowsPerPage: number
    searchValue: string
    sortValue: { field: string; value: 'DESC' | 'ASC' }
    selectetab: string
    tapeMangement: TapeManagementListResponse[] | null
}

const initialState: TapeManagementSliceStateType = {
    items: [],
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: '',
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectetab: '',
    tapeMangement: null,
}

const TapeManagementSlice: any = createSlice({
    name: 'TapeManagement',
    initialState,
    reducers: {
        setItems: (
            state,
            action: PayloadAction<TapeManagementListResponse[] | []>
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
        setSelectetab: (state, action: PayloadAction<string>) => {
            state.selectetab = action.payload
        },
        setSelectedTapManagement: (
            state,
            action: PayloadAction<TapeManagementListResponse[]>
        ) => {
            state.tapeMangement = action.payload
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
    setSelectetab,
    setSelectedTapManagement,
} = TapeManagementSlice.actions
export default TapeManagementSlice.reducer
