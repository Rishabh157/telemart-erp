import { createSlice, Slice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { WebsiteBlogListResponse } from '../../../models/website/WebsiteBlog.model'

export interface WebsiteBlogSliceStateType {
    items: WebsiteBlogListResponse[] | []
    allItems: WebsiteBlogListResponse[] | []
    selectedItem: WebsiteBlogListResponse | null
    totalItems: number
    isTableLoading: boolean
    page: number
    rowsPerPage: number
    searchValue: string
    sortValue: { field: string; value: 'DESC' | 'ASC' }
    selecteWebsiteBlog: string
}

const initialState: WebsiteBlogSliceStateType = {
    items: [],
    allItems: [],
    selectedItem: null,
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: '',
    sortValue: { field: 'createdAt', value: 'DESC' },
    selecteWebsiteBlog: '',
}

const websiteBlogSlice: Slice<WebsiteBlogSliceStateType>= createSlice({
    name: 'websiteBlog',
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<WebsiteBlogListResponse[] | []>) => {
            state.items = action.payload
        },
        setAllItems: (
            state,
            action: PayloadAction<WebsiteBlogListResponse[] | []>
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
            state.selecteWebsiteBlog = action.payload
        },
        setSelectedWebsite: (
            state,
            action: PayloadAction<WebsiteBlogListResponse | null>
        ) => {
            state.selectedItem = action.payload
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
} = websiteBlogSlice.actions
export default websiteBlogSlice.reducer
