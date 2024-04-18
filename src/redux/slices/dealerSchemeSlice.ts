// /// ==============================================
// // Filename:dealerSchemeSlice.ts
// // Type: Slice Component
// // Last Updated: JULY 06, 2023
// // Project: TELIMART - Front End
// // ==============================================

// // |-- External Dependencies --|
// import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

// // |-- Internal Dependencies --|
// import { DealersSchemeListResponse } from 'src/models/DealerScheme.model'

// export type InitialStateType = {
//     items: DealersSchemeListResponse[] | []
//     allItems: DealersSchemeListResponse[] | []
//     selectedItem: DealersSchemeListResponse | null
//     alldealerCategory: DealersSchemeListResponse[] | []
//     totalItems: number
//     isTableLoading: boolean
//     page: number
//     rowsPerPage: number
//     searchValue: string
//     sortValue: { field: string; value: 'DESC' | 'ASC' }
//     selectedDealerId: string
// }

// const initialState: InitialStateType = {
//     items: [],
//     allItems: [],
//     selectedItem: null,
//     alldealerCategory: [],
//     totalItems: 0,
//     isTableLoading: false,
//     page: 1,
//     rowsPerPage: 10,
//     searchValue: '',
//     sortValue: { field: 'createdAt', value: 'DESC' },
//     selectedDealerId: '',
// }

// const dealerSchemeSlice: any = createSlice({
//     name: 'dealersScheme',
//     initialState,
//     reducers: {
//         setItems: (
//             state,
//             action: PayloadAction<DealersSchemeListResponse[] | []>
//         ) => {
//             state.items = action.payload
//         },
//         setAllItems: (
//             state,
//             action: PayloadAction<DealersSchemeListResponse[] | []>
//         ) => {
//             state.allItems = action.payload
//         },
//         setPage: (state, action: PayloadAction<number>) => {
//             state.page = action.payload
//             document.getElementById('scroll-top')?.scrollTo(0, 0)
//         },
//         setRowsPerPage: (state, action: PayloadAction<number>) => {
//             state.rowsPerPage = action.payload
//             state.page = 1
//             document.getElementById('scroll-top')?.scrollTo(0, 0)
//         },
//         setSearchValue: (state, action: PayloadAction<string>) => {
//             state.searchValue = action.payload
//             state.page = 1
//         },
//         setSortValue: (
//             state,
//             action: PayloadAction<{ field: string; value: 'DESC' | 'ASC' }>
//         ) => {
//             state.sortValue = action.payload
//             state.page = 1
//         },
//         setTotalItems: (state, action: PayloadAction<number>) => {
//             state.totalItems = action.payload
//         },
//         setIsTableLoading: (state, action: PayloadAction<boolean>) => {
//             state.isTableLoading = action.payload
//         },
//         setSelectedDealerId: (state, action: PayloadAction<string>) => {
//             state.selectedDealerId = action.payload
//         },
//         setSelectedItem: (
//             state,
//             action: PayloadAction<DealersSchemeListResponse | null>
//         ) => {
//             state.selectedItem = action.payload
//         },
//         setAllDealerCategory: (
//             state,
//             action: PayloadAction<DealersSchemeListResponse[] | []>
//         ) => {
//             state.alldealerCategory = action.payload
//         },
//     },
// })

// export const {
//     setItems,
//     setAllItems,
//     setPage,
//     setRowsPerPage,
//     setSearchValue,
//     setSortValue,
//     setTotalItems,
//     setIsTableLoading,
//     setSelectedDealerId,
//     setSelectedItem,
//     setAllDealerCategory,
// } = dealerSchemeSlice.actions
// export default dealerSchemeSlice.reducer
export {}