import { Slice, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { InitialCallerThreeListResponse } from 'src/models/configurationModel/InitialCallerThree.model'

export interface InitialCallerThreeSliceStateType {
    items: InitialCallerThreeListResponse[] | []
    selectedInitialCallerThree: InitialCallerThreeListResponse | null
    allItems: InitialCallerThreeListResponse[] | []
    totalItems: number
    isTableLoading: boolean
    page: number
    rowsPerPage: number
    searchValue: string
    sortValue: { field: string; value: 'DESC' | 'ASC' }
    selectedId: string
    filterValue:string
}

const initialState: InitialCallerThreeSliceStateType = {
    items: [],
    allItems: [],
    selectedInitialCallerThree: null,
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: '',
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectedId: '',
    filterValue:"",
}

const initialCallerThreeSlice: Slice<InitialCallerThreeSliceStateType> = createSlice({
    name: 'initialCallerThree',
    initialState,
    reducers: {
        setItems: (
            state,
            action: PayloadAction<InitialCallerThreeListResponse[] | []>
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
        setSelectedId: (state, action: PayloadAction<string>) => {
            state.selectedId = action.payload
        },
        setAllItems: (
            state,
            action: PayloadAction<InitialCallerThreeListResponse[] | []>
        ) => {
            state.allItems = action.payload
        },
        setFilterValue: (state, action: PayloadAction<string>) => {
            state.filterValue = action.payload
        },
        setSelectedInitialCallerThree: (
            state,
            action: PayloadAction<InitialCallerThreeListResponse | null>
        ) => {
            state.selectedInitialCallerThree = action.payload
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
    setSelectedInitialCallerThree,
    setAllItems,
    setFilterValue,
} = initialCallerThreeSlice.actions
export default initialCallerThreeSlice.reducer
