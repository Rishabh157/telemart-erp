import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { WarehousesListResponse } from "src/models";

export type InitialStateType = {
  items: WarehousesListResponse[] | [];
  allItems:WarehousesListResponse[] | [];
  selectedItem: WarehousesListResponse | null;
  totalItems: number;
  isTableLoading: boolean;
  page: number;
  rowsPerPage: number;
  searchValue: string;
  sortValue: { field: string; value: "DESC" | "ASC" };
  selectedDealerId: string;
};

const initialState: InitialStateType = {
  items: [],
  selectedItem: null,
  allItems:[],
  totalItems: 0,
  isTableLoading: false,
  page: 1,
  rowsPerPage: 10,
  searchValue: "",
  sortValue: { field: "createdAt", value: "DESC" },
  selectedDealerId: "",
};

const warehouseSlice: any = createSlice({
  name: "warehouse",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<WarehousesListResponse[] | []>) => {
      state.items = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
      document.getElementById("scroll-top")?.scrollTo(0, 0);
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
      state.page = 1;
      document.getElementById("scroll-top")?.scrollTo(0, 0);
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
      state.page = 1;
    },
    setSortValue: (
      state,
      action: PayloadAction<{ field: string; value: "DESC" | "ASC" }>
    ) => {
      state.sortValue = action.payload;
      state.page = 1;
    },
    setTotalItems: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
    },
    setIsTableLoading: (state, action: PayloadAction<boolean>) => {
      state.isTableLoading = action.payload;
    },
    setSelectedDealerId: (state, action: PayloadAction<string>) => {
      state.selectedDealerId = action.payload;
    },
    setSelectedItem: (
      state,
      action: PayloadAction<WarehousesListResponse | null>
    ) => {
      state.selectedItem = action.payload;
    },
    setAllItems: (
      state,
      action: PayloadAction<WarehousesListResponse[]| []>
    ) => {
      state.allItems = action.payload;
    },
  },
});

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
  setAllItems

} = warehouseSlice.actions;
export default warehouseSlice.reducer;
