import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction, Slice } from '@reduxjs/toolkit'

export interface ListingPaginationSliceStateType {
    items: any
    totalItems: number
    isTableLoading: boolean
    page: number
    rowsPerPage: number
    searchValue: string
    sortValue: { field: string; value: 'DESC' | 'ASC' }
    selectedId: string
    filterValue: string
    dateFilter: {
        startDate: string
        endDate: string
    }
    filterBy: any
    filterkeysValue: any
    isActive: string | boolean
    selectedItem: null | any
    orderNumberSearch: any
    complaintNumberSearch: any
    selectedDealer: string
}

const initialState: ListingPaginationSliceStateType = {
    items: [],
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: '',
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectedId: '',
    filterValue: '',
    filterBy: {},
    selectedItem: null,
    isActive: '',
    dateFilter: {
        startDate: '',
        endDate: '',
    },
    orderNumberSearch: '',
    complaintNumberSearch: '',
    filterkeysValue: {
        schemeId: '',
        orderStatus: '',
        deliveryBoyId: '',
        dispositionId: '',
        districtId: '',
        tehsilId: '',
        startDate: '',
        endDate: '',
        orderStatusFrom: '',
        orderStatusTo: '',
        folloUpDateFrom: '',
        folloUpDateTo: '',
    },
    selectedDealer: '',
}

const ListingPaginationSlice: Slice<ListingPaginationSliceStateType> =
    createSlice({
        name: 'deliveryBoy',
        initialState,
        reducers: {
            setItems: (state, action: PayloadAction<any[] | []>) => {
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

            setFilterValue: (state, action: PayloadAction<string>) => {
                state.filterValue = action.payload
            },
            setFilterBy: (state, action: PayloadAction<[]>) => {
                state.filterBy = action.payload
            },
            setSelectedItem: (state, action: PayloadAction<any | null>) => {
                state.selectedItem = action.payload
            },
            setIsActivate: (state, action: PayloadAction<string>) => {
                state.isActive = action.payload
            },
            setOrdersFilterKeysValue: (
                state,
                action: PayloadAction<string>
            ) => {
                state.filterkeysValue = action.payload
            },
            setDateFilter: (state, action: PayloadAction<any>) => {
                state.dateFilter = action.payload
            },
            setOrderNumberSearch: (state, action: PayloadAction<any>) => {
                state.orderNumberSearch = action.payload
            },
            setComplaintNumberSearch: (state, action: PayloadAction<any>) => {
                state.complaintNumberSearch = action.payload
            },
            setSelectedDealerFilter: (state, action: PayloadAction<string>) => {
                state.selectedDealer = action.payload
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
    setFilterValue,
    setFilterBy,
    setOrdersFilterKeysValue,
    setIsActivate,
    setSelectedItem,
    setOrderNumberSearch,
    setComplaintNumberSearch,
    setDateFilter,
    setSelectedDealerFilter,
} = ListingPaginationSlice.actions

export default ListingPaginationSlice.reducer
