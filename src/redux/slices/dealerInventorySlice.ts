// |-- External Dependencies --|
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// |-- Internal Dependencies --|
import { BarcodeListResponseType } from 'src/models'

export interface DealersInventoryStateType {
    items: BarcodeListResponseType[] | []
    totalItems: number
    isTableLoading: boolean
    page: number
    rowsPerPage: number
    searchValue: string
    sortValue: { field: string; value: 'DESC' | 'ASC' }
    selectedDealer: string
    activeTabIndex: number
    barcodesToPrint: string[]
    cartonBoxBarcode: string | null
}

const initialState: DealersInventoryStateType = {
    items: [],
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: '',
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectedDealer: '',
    activeTabIndex: 0,
    barcodesToPrint: [],
    cartonBoxBarcode: null,
}

const dealerInventorySlice: any = createSlice({
    name: 'dealerInventory',
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
        setSelectedDealerFilter: (state, action: PayloadAction<string>) => {
            state.selectedDealer = action.payload
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
    setSelectedDealerFilter,
    setActiveTabIndex,
    setBarcodesToPrint,
    setCartonBoxBarcode,
} = dealerInventorySlice.actions
export default dealerInventorySlice.reducer
