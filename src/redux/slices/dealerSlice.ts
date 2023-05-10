import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { DealersListResponse } from "src/models";

export interface DealerSliceStateType {
    items: DealersListResponse[] | [],
    allItems: DealersListResponse[] | [];
    totalItems: number,
    selectedItem:DealersListResponse | null
    isTableLoading: boolean,
    page: number;
    rowsPerPage: number;
    searchValue: string;
    sortValue: { field: string; value: 'DESC' | 'ASC' },
    selectedDealerId: string;
    filterValue:string;

}

const initialState: DealerSliceStateType = {
    items: [],
    allItems: [],
    totalItems: 0,
    selectedItem: null,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: "",
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectedDealerId: "",
    filterValue:""
}

const dealerSlice: any = createSlice({
    name: 'dealer',
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<DealersListResponse[] | []>) => {
            state.items = action.payload
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
            document.getElementById('scroll-top')?.scrollTo(0, 0)
        },
        setRowsPerPage: (state, action: PayloadAction<number>) => {
            state.rowsPerPage = action.payload;
            state.page = 1;
            document.getElementById('scroll-top')?.scrollTo(0, 0)
        },
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload
            state.page = 1;
        },
        setSortValue: (state, action: PayloadAction<{ field: string; value: 'DESC' | 'ASC' }>) => {
            state.sortValue = action.payload;
            state.page = 1;
        },
        setTotalItems: (state, action: PayloadAction<number>) => {
            state.totalItems = action.payload
        },
        setIsTableLoading: (state, action: PayloadAction<boolean>) => {
            state.isTableLoading = action.payload
        },
        setAllItems: (state, action: PayloadAction<DealersListResponse[] | []>) => {
            state.allItems = action.payload;
          },
        setSelectedDealerId: (state, action: PayloadAction<string>) => {
            state.selectedDealerId = action.payload
        },
        setSelectedItem: (state, action: PayloadAction<DealersListResponse | null>) => {
            state.selectedItem= action.payload
        },
        setFilterValue: (state, action: PayloadAction<string>) => {
            state.filterValue= action.payload
        },


    }
})

export const {
    setItems,
    setPage,
    setRowsPerPage,
    setSearchValue,
    setSortValue,
    setTotalItems,
    setIsTableLoading,
    setSelectedDealerId,
    setSelectedItem,
    setAllItems,
    setFilterValue
} = dealerSlice.actions
export default dealerSlice.reducer
