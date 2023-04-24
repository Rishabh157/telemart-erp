import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TaxesListResponse } from "src/models/taxes.model";

export type InitialStateType = {
  items: TaxesListResponse[] | [];
  allTaxes: TaxesListResponse[] | [];
  selectedTaxes: TaxesListResponse | null;
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
  allTaxes: [],
  selectedTaxes: null,
  totalItems: 0,
  isTableLoading: false,
  page: 1,
  rowsPerPage: 10,
  searchValue: "",
  sortValue: { field: "createdAt", value: "DESC" },
  selectedDealerId: "",
};

const taxesSlice: any = createSlice({
  name: "taxes",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<TaxesListResponse[] | []>) => {
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
    setAllTaxes: (state, action: PayloadAction<TaxesListResponse[] | []>) => {
      state.allTaxes = action.payload;
    },
    setSelectedTaxes: (
      state,
      action: PayloadAction<TaxesListResponse | null>
    ) => {
      state.selectedTaxes = action.payload;
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
  setSelectedTaxes,
  setAllTaxes,
} = taxesSlice.actions;
export default taxesSlice.reducer;
