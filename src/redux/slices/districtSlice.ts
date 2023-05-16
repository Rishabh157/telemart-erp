import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { DistrictListResponse } from 'src/models/District.model'
import { LocationSelectType } from 'src/utils'

export interface DistrictSliceStateType {
    items: DistrictListResponse[] | []
    allDistricts: DistrictListResponse[] | []
    selectedDistrict: DistrictListResponse | null
    selectedLocationDistrict: LocationSelectType | null
    totalItems: number
    isTableLoading: boolean
    page: number
    rowsPerPage: number
    searchValue: string
    sortValue: { field: string; value: 'DESC' | 'ASC' }
    selectedId: string
    filterValue: string
}

const initialState: DistrictSliceStateType = {
    items: [],
    allDistricts: [],
    selectedDistrict: null,
    selectedLocationDistrict: null,
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: '',
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectedId: '',
    filterValue: '',
}

const districtSlice: any = createSlice({
    name: 'district',
    initialState,
    reducers: {
        setItems: (
            state,
            action: PayloadAction<DistrictListResponse[] | []>
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
        setSelectedDistrict: (
            state,
            action: PayloadAction<DistrictListResponse | null>
        ) => {
            state.selectedDistrict = action.payload
        },
        setSelectedLocationDistrict: (
            state,
            action: PayloadAction<LocationSelectType | null>
        ) => {
            state.selectedLocationDistrict = action.payload
        },
        setFilterValue: (state, action: PayloadAction<string>) => {
            state.filterValue = action.payload
        },
        setAllDistrict: (
            state,
            action: PayloadAction<DistrictListResponse[] | []>
        ) => {
            state.allDistricts = action.payload
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
    setSelectedDistrict,
    setSelectedLocationDistrict,
    setFilterValue,
    setAllDistrict,
} = districtSlice.actions
export default districtSlice.reducer
