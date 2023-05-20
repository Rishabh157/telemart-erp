import { createSlice, Slice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { StateListResponse } from 'src/models/State.model'
import { LocationSelectType } from 'src/utils'

export interface StateSliceStateType {
    items: StateListResponse[] | []
    allStates: StateListResponse[] | []
    selectedState: StateListResponse | null
    selectedLocationState: LocationSelectType | null
    totalItems: number
    isTableLoading: boolean
    page: number
    rowsPerPage: number
    searchValue: string
    sortValue: { field: string; value: 'DESC' | 'ASC' }
    selectedId: string
    filterValue: string
}

const initialState: StateSliceStateType = {
    items: [],
    allStates: [],
    selectedState: null,
    selectedLocationState: null,
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: '',
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectedId: '',
    filterValue: '',
}

const stateSlice: Slice<StateSliceStateType> = createSlice({
    name: 'state',
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<StateListResponse[] | []>) => {
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
        setSelectedState: (
            state,
            action: PayloadAction<StateListResponse | null>
        ) => {
            state.selectedState = action.payload
        },
        setSelctedLocationState: (
            state,
            action: PayloadAction<LocationSelectType | null>
        ) => {
            state.selectedLocationState = action.payload
        },
        setFilterValue: (state, action: PayloadAction<string>) => {
            state.filterValue = action.payload
        },
        setAllStates: (
            state,
            action: PayloadAction<StateListResponse[] | []>
        ) => {
            state.allStates = action.payload
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
    setSelectedState,
    setSelctedLocationState,
    setFilterValue,
    setAllStates,
} = stateSlice.actions
export default stateSlice.reducer
