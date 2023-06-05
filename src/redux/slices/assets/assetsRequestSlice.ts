import { createSlice, Slice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AssetsRequestListResponse } from 'src/models/assets/AssetsRequest.model'

export interface AssetsRequestSliceStateType {
    items: AssetsRequestListResponse[] | []
    allItems: AssetsRequestListResponse[] | []
    selectedItem: AssetsRequestListResponse | null
    totalItems: number
    isTableLoading: boolean
    page: number
    rowsPerPage: number
    searchValue: string
    sortValue: { field: string; value: 'DESC' | 'ASC' }
    selectinfluencer: string
    filterValue: string
}

const initialState: AssetsRequestSliceStateType = {
    items: [],
    allItems: [],
    selectedItem: null,
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: '',
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectinfluencer: '',
    filterValue: '',
}

const assetsRequestSlice: Slice<AssetsRequestSliceStateType> = createSlice({
    name: 'assetsRequest',
    initialState,
    reducers: {
        setItems: (
            state,
            action: PayloadAction<AssetsRequestListResponse[] | []>
        ) => {
            state.items = action.payload
        },
        setAllItems: (
            state,
            action: PayloadAction<AssetsRequestListResponse[] | []>
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
        setSelectinfluencer: (state, action: PayloadAction<string>) => {
            state.selectinfluencer = action.payload
        },
        setSelectedinfluencer: (
            state,
            action: PayloadAction<AssetsRequestListResponse | null>
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
    setSelectinfluencer,
    setSelectedinfluencer,
    setFilterValue,
} = assetsRequestSlice.actions

export default assetsRequestSlice.reducer
