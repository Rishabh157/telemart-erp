/// ==============================================
// Filename:barcodeSlice.ts
// Type: Slice Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- External Dependencies --|
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// |-- Internal Dependencies --|
import { BarcodeListResponseType } from 'src/models'

export interface BarcodeSliceStateType {
    items: BarcodeListResponseType[] | []
    totalItems: number
    isTableLoading: boolean
    page: number
    rowsPerPage: number
    searchValue: string
    sortValue: { field: string; value: 'DESC' | 'ASC' }
    selectedId: string
    activeTabIndex: number
    barcodesToPrint: string[]
    cartonBoxBarcode: string | null
}

const initialState: BarcodeSliceStateType = {
    items: [],
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: '',
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectedId: '',
    activeTabIndex: 0,
    barcodesToPrint: [],
    cartonBoxBarcode: null,
}

const barcodeSlice: any = createSlice({
    name: 'barcode',
    initialState,
    reducers: {
        setItems: (
            state,
            action: PayloadAction<BarcodeListResponseType[] | []>
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
        setActiveTabIndex: (state, action: PayloadAction<number>) => {
            state.activeTabIndex = action.payload
        },
        setBarcodesToPrint: (state, action: PayloadAction<string[]>) => {
            state.barcodesToPrint = action.payload
        },
        setCartonBoxBarcode: (state, action: PayloadAction<string>) => {
            state.cartonBoxBarcode = action.payload
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
    setActiveTabIndex,
    setBarcodesToPrint,
    setCartonBoxBarcode,
} = barcodeSlice.actions
export default barcodeSlice.reducer
