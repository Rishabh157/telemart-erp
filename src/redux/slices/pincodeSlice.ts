import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PincodeListResponse } from "src/models/Pincode.model";
import { LocationSelectType } from "src/utils";

export interface PincodeSliceStateType {
  items: PincodeListResponse[] | [];
  allPincodes: PincodeListResponse[] | [];
  selectedPincode: PincodeListResponse | null;
  selectedLocationPincode: LocationSelectType | null;
  totalItems: number;
  isTableLoading: boolean;
  page: number;
  rowsPerPage: number;
  searchValue: string;
  sortValue: { field: string; value: "DESC" | "ASC" };
  selectedId: string;
  filterValue: string;
}

const initialState: PincodeSliceStateType = {
  items: [],
  allPincodes: [],
  selectedPincode: null,
  selectedLocationPincode: null,
  totalItems: 0,
  isTableLoading: false,
  page: 1,
  rowsPerPage: 10,
  searchValue: "",
  sortValue: { field: "createdAt", value: "DESC" },
  selectedId: "",
  filterValue: "",
};

const pincodeSlice: any = createSlice({
  name: "pincode",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<PincodeListResponse[] | []>) => {
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
    setSelectedId: (state, action: PayloadAction<string>) => {
      state.selectedId = action.payload;
    },
    setSelectedPincode: (
      state,
      action: PayloadAction<PincodeListResponse | null>
    ) => {
      state.selectedPincode = action.payload;
    },
    setSelectedLocationPincode: (
      state,
      action: PayloadAction<LocationSelectType | null>
    ) => {
      state.selectedLocationPincode = action.payload;
    },
    setFilterValue: (state, action: PayloadAction<string>) => {
      state.filterValue = action.payload;
    },
    setAllPincodes: (
      state,
      action: PayloadAction<PincodeListResponse[] | []>
    ) => {
      state.allPincodes = action.payload;
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
  setSelectedId,
  setSelectedPincode,
  setSelectedLocationPincode,
  setFilterValue,
  setAllPincodes,
} = pincodeSlice.actions;
export default pincodeSlice.reducer;
