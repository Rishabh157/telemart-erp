/// ==============================================
// Filename:vendorWarehouseSlice.ts
// Type: Slice Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- External Dependencies --|
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// |-- Internal Dependencies --|
import { VendorWarehousesListResponse } from 'src/models'

// |-- Types --|
export type InitialStateType = {
    items: VendorWarehousesListResponse[] | []
    allItems: VendorWarehousesListResponse[] | []
    vendorWarehouse: VendorWarehousesListResponse[] | []
    selectedItem: VendorWarehousesListResponse | null
    totalItems: number
    isTableLoading: boolean
    page: number
    rowsPerPage: number
    searchValue: string
    sortValue: { field: string; value: 'DESC' | 'ASC' }
    selectedVendorId: string
}

const initialState: InitialStateType = {
    items: [],
    selectedItem: null,
    allItems: [],
    vendorWarehouse: [],
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: '',
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectedVendorId: '',
}

const VendorWarehouseSlice: any = createSlice({
    name: 'warehouse',
    initialState,
    reducers: {
        setItems: (
            state,
            action: PayloadAction<VendorWarehousesListResponse[] | []>
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
        setSelectedVendorId: (state, action: PayloadAction<string>) => {
            state.selectedVendorId = action.payload
        },
        setSelectedItem: (
            state,
            action: PayloadAction<VendorWarehousesListResponse | null>
        ) => {
            state.selectedItem = action.payload
        },
        setAllItems: (
            state,
            action: PayloadAction<VendorWarehousesListResponse[] | []>
        ) => {
            state.allItems = action.payload
        },
        setVendorWarehouse: (
            state,
            action: PayloadAction<VendorWarehousesListResponse[] | []>
        ) => {
            state.vendorWarehouse = action.payload
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
    setSelectedVendorId,
    setSelectedItem,
    setAllItems,
    setVendorWarehouse,
} = VendorWarehouseSlice.actions
export default VendorWarehouseSlice.reducer
