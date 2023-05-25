import { Slice, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { DispositionThreeListResponse } from 'src/models/configurationModel/DispositionThree.model'

export interface DispositionThreeSliceStateType {
    items: DispositionThreeListResponse[] | []
    selectedDispostionThree: DispositionThreeListResponse | null
    allItems: DispositionThreeListResponse[] | []
    totalItems: number
    isTableLoading: boolean
    page: number
    rowsPerPage: number
    searchValue: string
    sortValue: { field: string; value: 'DESC' | 'ASC' }
    selectedId: string
    filterValue: string,
}

const initialState: DispositionThreeSliceStateType = {
    items: [],
    allItems: [],
    selectedDispostionThree: null,
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: '',
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectedId: '',
    filterValue: "",
}

const dispositionThreeSlice: Slice<DispositionThreeSliceStateType> = createSlice({
    name: 'dispositionThree',
    initialState,
    reducers: {
        setItems: (
            state,
            action: PayloadAction<DispositionThreeListResponse[] | []>
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
        setFilterValue: (state, action: PayloadAction<string>) => {
            state.filterValue = action.payload
        },
        setSelectedId: (state, action: PayloadAction<string>) => {
            state.selectedId = action.payload
        },
        setAllItems: (
            state,
            action: PayloadAction<DispositionThreeListResponse[] | []>
        ) => {
            state.allItems = action.payload
        },
        setSelectedDispostionThree: (
            state,
            action: PayloadAction<DispositionThreeListResponse | null>
        ) => {
            state.selectedDispostionThree = action.payload
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
    setFilterValue,
    setSelectedDispostionThree,
    setAllItems,
} = dispositionThreeSlice.actions
export default dispositionThreeSlice.reducer
