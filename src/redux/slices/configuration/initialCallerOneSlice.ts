import { Slice, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { InitialCallerOneListResponse } from 'src/models/configurationModel/InitialCallerOne.model'


export interface InitialCallerOneSliceStateType {
    items: InitialCallerOneListResponse[] | []
    selectedInitialOne: InitialCallerOneListResponse | null
    allItems: InitialCallerOneListResponse[] | []
    totalItems: number
    isTableLoading: boolean
    page: number
    rowsPerPage: number
    searchValue: string
    sortValue: { field: string; value: 'DESC' | 'ASC' }
    selectedId: string
}

const initialState: InitialCallerOneSliceStateType = {
    items: [],
    allItems: [],
    selectedInitialOne: null,
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: '',
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectedId: '',
}

const initialCallerOneSlice: Slice<InitialCallerOneSliceStateType> = createSlice({
    name: 'initialcallerOne',
    initialState,
    reducers: {
        setItems: (
            state,
            action: PayloadAction<InitialCallerOneListResponse[] | []>
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
            action: PayloadAction<InitialCallerOneListResponse[] | []>
        ) => {
            state.allItems = action.payload
        },
        setSelectedInitialOne: (
            state,
            action: PayloadAction<InitialCallerOneListResponse | null>
        ) => {
            state.selectedInitialOne = action.payload
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
    setSelectedInitialOne,
    setAllItems,
} = initialCallerOneSlice.actions
export default initialCallerOneSlice.reducer
