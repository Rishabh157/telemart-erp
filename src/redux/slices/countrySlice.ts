/// ==============================================
// Filename:countrySlice.ts
// Type: Slice Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- External Dependencies --|
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// |-- Internal Dependencies --|
import { CountryListResponse } from 'src/models/Country.model'
import { LocationSelectType } from 'src/utils'

export interface CountrySliceStateType {
    items: CountryListResponse[] | []
    allCountry: CountryListResponse[] | []
    selectedCountry: CountryListResponse | null
    selectedLocationCountries: LocationSelectType | null
    selectedCountryId: string
    totalItems: number
    isTableLoading: boolean
    page: number
    rowsPerPage: number
    searchValue: string
    sortValue: { field: string; value: 'DESC' | 'ASC' }
    selectedId: string
    filterValue: string
}

const initialState: CountrySliceStateType = {
    items: [],
    allCountry: [],
    selectedCountry: null,
    selectedCountryId: '',
    selectedLocationCountries: null,
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: '',
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectedId: '',
    filterValue: '',
}

const countrySlice: any = createSlice({
    name: 'country',
    initialState,
    reducers: {
        setItems: (
            state,
            action: PayloadAction<CountryListResponse[] | []>
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
        setSelectedCountry: (
            state,
            action: PayloadAction<CountryListResponse | null>
        ) => {
            state.selectedCountry = action.payload
        },
        setSelectedCountryId: (state, action: PayloadAction<string>) => {
            state.selectedCountryId = action.payload
        },
        setSelectedLocationCountry: (
            state,
            action: PayloadAction<LocationSelectType | null>
        ) => {
            state.selectedLocationCountries = action.payload
        },
        setFilterValue: (state, action: PayloadAction<string>) => {
            state.filterValue = action.payload
        },
        setAllCountry: (
            state,
            action: PayloadAction<CountryListResponse[] | []>
        ) => {
            state.allCountry = action.payload
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
    setSelectedCountry,
    setSelectedLocationCountry,
    setFilterValue,
    setAllCountry,
} = countrySlice.actions
export default countrySlice.reducer
