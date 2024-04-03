// |-- External Dependencies --|
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// |-- Internal Dependencies --|
import { OutwardRequestDealerListResponse } from 'src/models/OutwardRequest.model'

export interface OutwardCustomerSliceStateType {
    items: OutwardRequestDealerListResponse[] | []
    totalItems: number
    isTableLoading: boolean
    page: number
    rowsPerPage: number
    searchValue: string
    sortValue: { field: string; value: 'DESC' | 'ASC' }
    selectedId: string
    courierValue: string
    orderStatus: string
    dateFilter: {
        startDate: string
        endDate: string
    }
}

const initialState: OutwardCustomerSliceStateType = {
    items: [],
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: '',
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectedId: '',
    courierValue: '',
    orderStatus: '',
    dateFilter: {
        startDate: '',
        endDate: '',
    },
}

const outwardCustomerSlice: any = createSlice({
    name: 'outwardRequest',
    initialState,
    reducers: {
        setItems: (
            state,
            action: PayloadAction<OutwardRequestDealerListResponse[] | []>
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
        setCourierFilterValue: (state, action: PayloadAction<string>) => {
            state.courierValue = action.payload
        },
        setOrderStatusFilterValue: (state, action: PayloadAction<string>) => {
            state.orderStatus = action.payload
        },
        setDateFilter: (state, action: PayloadAction<any>) => {
            state.dateFilter = action.payload
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
    setCourierFilterValue,
    setOrderStatusFilterValue,
    setDateFilter,
} = outwardCustomerSlice.actions

export default outwardCustomerSlice.reducer
