// |-- External Dependencies --|
import { createSlice, Slice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// |-- Internal Dependencies --|
import { OrderListResponse } from 'src/models'

// |-- Types --|
export type InitialStateType = {
    items: OrderListResponse[] | []
    allItems: OrderListResponse[] | []
    selectedItem: OrderListResponse | null
    totalItems: number
    isTableLoading: boolean
    page: number
    rowsPerPage: number
    searchValue: string
    mobileNumberSearchValue: string
    complaintNumberSearchValue: string
    sortValue: { field: string; value: 'DESC' | 'ASC' }
    selectedDealerId: string
    filterValue: string
    // filters
    schemeValueFilter: string
    orderStatusValueFilter: string
    deliveryBoyValueFilter: string
    dispositionValueFilter: string
    districtValueFilter: string
    tehsilValueFilter: string
    // date from
    dateFilter: {
        startDate: string
        endDate: string
    }
    // order status date from
    orderStatusdateFilter: {
        startDate: string
        endDate: string
    }
    // follo up date from
    folloUpTodateFilter: {
        startDate: string
        endDate: string
    }
}

const initialState: InitialStateType = {
    items: [],
    allItems: [],
    selectedItem: null,
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: '',
    mobileNumberSearchValue: '',
    complaintNumberSearchValue: '',
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectedDealerId: '',
    filterValue: '',
    // filter values
    schemeValueFilter: '',
    orderStatusValueFilter: '',
    deliveryBoyValueFilter: '',
    dispositionValueFilter: '',
    districtValueFilter: '',
    tehsilValueFilter: '',

    // date from
    dateFilter: {
        startDate: '',
        endDate: '',
    },
    // order status date from
    orderStatusdateFilter: {
        startDate: '',
        endDate: '',
    },
    // follo up date from
    folloUpTodateFilter: {
        startDate: '',
        endDate: '',
    },
}

const orderSlice: Slice<InitialStateType> = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<OrderListResponse[] | []>) => {
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
        setMobileNumberSearchValue: (state, action: PayloadAction<string>) => {
            state.mobileNumberSearchValue = action.payload
            state.page = 1
        },
        setComplaintNumberSearchValue: (
            state,
            action: PayloadAction<string>
        ) => {
            state.complaintNumberSearchValue = action.payload
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
        setSelectedDealerId: (state, action: PayloadAction<string>) => {
            state.selectedDealerId = action.payload
        },
        setAllItems: (
            state,
            action: PayloadAction<OrderListResponse[] | []>
        ) => {
            state.allItems = action.payload
        },
        setSelectedItem: (
            state,
            action: PayloadAction<OrderListResponse | null>
        ) => {
            state.selectedItem = action.payload
        },
        setFilterValue: (state, action: PayloadAction<string>) => {
            state.filterValue = action.payload
        },

        // Filters
        setSchemeFilterValue: (state, action: PayloadAction<string>) => {
            state.schemeValueFilter = action.payload
        },
        setOrderStatusFilterValue: (state, action: PayloadAction<string>) => {
            state.orderStatusValueFilter = action.payload
        },
        setDeliveryBoyFilterValue: (state, action: PayloadAction<string>) => {
            state.deliveryBoyValueFilter = action.payload
        },
        setDispositionFilterValue: (state, action: PayloadAction<string>) => {
            state.dispositionValueFilter = action.payload
        },
        setDistrictFilterValue: (state, action: PayloadAction<string>) => {
            state.districtValueFilter = action.payload
        },
        setTehsilFilterValue: (state, action: PayloadAction<string>) => {
            state.tehsilValueFilter = action.payload
        },
        setDateFilter: (state, action: PayloadAction<any>) => {
            state.dateFilter = action.payload
        },
        setOrderStatusDateFilter: (state, action: PayloadAction<any>) => {
            state.orderStatusdateFilter = action.payload
        },
        setFolloUpToDateFilter: (state, action: PayloadAction<any>) => {
            state.folloUpTodateFilter = action.payload
        },
    },
})

export const {
    setItems,
    setPage,
    setRowsPerPage,
    setSearchValue,
    setMobileNumberSearchValue,
    setComplaintNumberSearchValue,
    setSortValue,
    setTotalItems,
    setIsTableLoading,
    setSelectedDealerId,
    setSelectedItem,
    setAllItems,
    setFilterValue,
    // filters
    setSchemeFilterValue,
    setOrderStatusFilterValue,
    setDeliveryBoyFilterValue,
    setDispositionFilterValue,
    setDistrictFilterValue,
    setTehsilFilterValue,
    setDateFilter,
    setOrderStatusDateFilter,
    setFolloUpToDateFilter,
} = orderSlice.actions
export default orderSlice.reducer
