// |-- External Dependencies --|
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// |-- Internal Dependencies --|
import { ProductGroupListResponse } from 'src/models/ProductGroup.model'

export interface ProductGroupBarcodeSliceStateType {
    items: ProductGroupListResponse[] | []
    allProductGroupBarcode: ProductGroupListResponse[] | []
    selectedProductGroupBarcode: ProductGroupListResponse | null
    totalItems: number
    isTableLoading: boolean
    page: number
    rowsPerPage: number
    searchValue: string
    sortValue: { field: string; value: 'DESC' | 'ASC' }
    selectedId: string
}

const initialState: ProductGroupBarcodeSliceStateType = {
    items: [],
    allProductGroupBarcode: [],
    selectedProductGroupBarcode: null,
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: '',
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectedId: '',
}

const productGroupBarcodeSlice: any = createSlice({
    name: 'productGroupBarcode',
    initialState,
    reducers: {
        setItems: (
            state,
            action: PayloadAction<ProductGroupListResponse[] | []>
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
        setAllProductGroupBarcode: (
            state,
            action: PayloadAction<ProductGroupListResponse[] | []>
        ) => {
            state.allProductGroupBarcode = action.payload
        },
        setSelectedProductGroupBarcode: (
            state,
            action: PayloadAction<ProductGroupListResponse | null>
        ) => {
            state.selectedProductGroupBarcode = action.payload
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
    setSelectedProductGroupBarcode,
    setAllProductGroupBarcode,
} = productGroupBarcodeSlice.actions
export default productGroupBarcodeSlice.reducer
