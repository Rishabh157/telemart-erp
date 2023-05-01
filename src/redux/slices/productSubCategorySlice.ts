import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ProductSubCategoryListResponse } from "src/models/ProductSubCategory.model";

export interface ProductSubCategorySliceStateType {
  items: ProductSubCategoryListResponse[] | [];
  selectedItem: ProductSubCategoryListResponse | null;
  allProductSubCategory: ProductSubCategoryListResponse[] | []
  totalItems: number;
  isTableLoading: boolean;
  page: number;
  rowsPerPage: number;
  searchValue: string;
  sortValue: { field: string; value: "DESC" | "ASC" };
  selectedId: string;
}

const initialState: ProductSubCategorySliceStateType = {
  items: [],
  selectedItem: null,
  totalItems: 0,
  isTableLoading: false,
  page: 1,
  rowsPerPage: 10,
  searchValue: "",
  sortValue: { field: "createdAt", value: "DESC" },
  selectedId: "",
  allProductSubCategory: []
};

const productSubCategorySlice: any = createSlice({
  name: "productSubCategory",
  initialState,
  reducers: {
    setItems: (
      state,
      action: PayloadAction<ProductSubCategoryListResponse[] | []>
    ) => {
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
    setSelectedItem: (
      state,
      action: PayloadAction<ProductSubCategoryListResponse | null>
    ) => {
      state.selectedItem = action.payload;
    },
    setAllProductSubCategory:(
      state,
      action: PayloadAction<ProductSubCategoryListResponse[] | [] >
    ) => {
      state.allProductSubCategory = action.payload;
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
  setSelectedItem,
  setAllProductSubCategory
} = productSubCategorySlice.actions;
export default productSubCategorySlice.reducer;
