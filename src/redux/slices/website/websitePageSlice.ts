import { createSlice, Slice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { WebsitePageListResponse } from 'src/models/website/WebsitePage.model'

export interface WebsitePageSliceStateType {
    items: WebsitePageListResponse[] | []
    allItems: WebsitePageListResponse[] | []
    selectedItem: WebsitePageListResponse | null
    totalItems: number
    isTableLoading: boolean
    page: number
    rowsPerPage: number
    searchValue: string
    sortValue: { field: string; value: 'DESC' | 'ASC' }
    selecteWebsitePage: string
    filterValue: any
}

const initialState: WebsitePageSliceStateType = {
    items: [],
    allItems: [],
    selectedItem: null,
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: '',
    sortValue: { field: 'createdAt', value: 'DESC' },
    selecteWebsitePage: '',
    filterValue: '',
}

const websitePageSlice: Slice<WebsitePageSliceStateType> = createSlice({
    name: 'websitePage',
    initialState,
    reducers: {
        setItems: (
            state,
            action: PayloadAction<WebsitePageListResponse[] | []>
        ) => {
            state.items = action.payload
        },
        setAllItems: (
            state,
            action: PayloadAction<WebsitePageListResponse[] | []>
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
        setSelecteWebsite: (state, action: PayloadAction<string>) => {
            state.selecteWebsitePage = action.payload
        },
        setSelectedWebsite: (
            state,
            action: PayloadAction<WebsitePageListResponse | null>
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
    setSelecteWebsite,
    setSelectedWebsite,
    setFilterValue,
} = websitePageSlice.actions
export default websitePageSlice.reducer
