import { createSlice, Slice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { LanguageListResponse } from 'src/models/Language.model'

export type InitialStateType = {
    items: LanguageListResponse[] | []
    allItems: LanguageListResponse[] | []
    selectedItem: LanguageListResponse | null
    totalItems: number
    isTableLoading: boolean
    page: number
    rowsPerPage: number
    searchValue: string
    sortValue: { field: string; value: 'DESC' | 'ASC' }
    selectedDealerId: string
    language: LanguageListResponse[] | []
}

const initialState: InitialStateType = {
    items: [],
    allItems: [],
    selectedItem: null,
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: '',
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectedDealerId: '',
    language: [],
}

const languageSlice: Slice<InitialStateType> = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setItems: (
            state,
            action: PayloadAction<LanguageListResponse[] | []>
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
        setSelectedDealerId: (state, action: PayloadAction<string>) => {
            state.selectedDealerId = action.payload
        },
        setAllItems: (
            state,
            action: PayloadAction<LanguageListResponse[] | []>
        ) => {
            state.allItems = action.payload
        },
        setSelectedItem: (
            state,
            action: PayloadAction<LanguageListResponse | null>
        ) => {
            state.selectedItem = action.payload
        },
        setLanguage: (
            state,
            action: PayloadAction<LanguageListResponse[] | []>
        ) => {
            state.language = action.payload
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
    setSelectedDealerId,
    setSelectedItem,
    setAllItems,
    setLanguage,
} = languageSlice.actions
export default languageSlice.reducer
