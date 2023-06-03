import { createSlice, Slice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { WebsiteTagsListResponse } from 'src/models/website/WebsiteTags.model'

export interface WebsiteTagsSliceStateType {
    items: WebsiteTagsListResponse[] | []
    allItems: WebsiteTagsListResponse[] | []
    selectedItem: WebsiteTagsListResponse | null
    totalItems: number
    isTableLoading: boolean
    page: number
    rowsPerPage: number
    searchValue: string
    sortValue: { field: string; value: 'DESC' | 'ASC' }
    selectTag: string
}

const initialState: WebsiteTagsSliceStateType = {
    items: [],
    allItems: [],
    selectedItem: null,
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: '',
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectTag: '',
}

const websiteTagsSlice: Slice<WebsiteTagsSliceStateType> = createSlice({
    name: 'websiteTags',
    initialState,
    reducers: {
        setItems: (
            state,
            action: PayloadAction<WebsiteTagsListResponse[] | []>
        ) => {
            state.items = action.payload
        },
        setAllItems: (
            state,
            action: PayloadAction<WebsiteTagsListResponse[] | []>
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
        setSelectTag: (state, action: PayloadAction<string>) => {
            state.selectTag = action.payload
        },
        setSelectedTags: (
            state,
            action: PayloadAction<WebsiteTagsListResponse | null>
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
    setSelectTag,
    setSelectedTags,
} = websiteTagsSlice.actions
export default websiteTagsSlice.reducer
