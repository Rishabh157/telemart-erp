// /// ==============================================
// // Filename:channelManagementSlice.ts
// // Type: Slice Component
// // Last Updated: JULY 06, 2023
// // Project: TELIMART - Front End
// // ==============================================

// // |-- External Dependencies --|
// import { Slice, createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

// // |-- Internal Dependencies --|
// import { ChannelManagementListResponse } from 'src/models/Channel.model'

// export interface ChannelManagementSliceStateType {
//     items: ChannelManagementListResponse[] | []
//     selectedItem: ChannelManagementListResponse | null
//     totalItems: number
//     isTableLoading: boolean
//     page: number
//     rowsPerPage: number
//     searchValue: string
//     sortValue: { field: string; value: 'DESC' | 'ASC' }
//     selectedId: string
//     channelMgt: ChannelManagementListResponse[] | null
// }

// const initialState: ChannelManagementSliceStateType = {
//     items: [],
//     selectedItem: null,
//     totalItems: 0,
//     isTableLoading: false,
//     page: 1,
//     rowsPerPage: 10,
//     searchValue: '',
//     sortValue: { field: 'createdAt', value: 'DESC' },
//     selectedId: '',
//     channelMgt: null,
// }

// const channelManagementSlice: Slice<ChannelManagementSliceStateType> =
//     createSlice({
//         name: 'channelManagement',
//         initialState,
//         reducers: {
//             setItems: (
//                 state,
//                 action: PayloadAction<ChannelManagementListResponse[] | []>
//             ) => {
//                 state.items = action.payload
//             },
//             setPage: (state, action: PayloadAction<number>) => {
//                 state.page = action.payload
//                 document.getElementById('scroll-top')?.scrollTo(0, 0)
//             },
//             setRowsPerPage: (state, action: PayloadAction<number>) => {
//                 state.rowsPerPage = action.payload
//                 state.page = 1
//                 document.getElementById('scroll-top')?.scrollTo(0, 0)
//             },
//             setSearchValue: (state, action: PayloadAction<string>) => {
//                 state.searchValue = action.payload
//                 state.page = 1
//             },
//             setSortValue: (
//                 state,
//                 action: PayloadAction<{ field: string; value: 'DESC' | 'ASC' }>
//             ) => {
//                 state.sortValue = action.payload
//                 state.page = 1
//             },
//             setTotalItems: (state, action: PayloadAction<number>) => {
//                 state.totalItems = action.payload
//             },
//             setIsTableLoading: (state, action: PayloadAction<boolean>) => {
//                 state.isTableLoading = action.payload
//             },
//             setSelectedId: (state, action: PayloadAction<string>) => {
//                 state.selectedId = action.payload
//             },
//             setSelectedItem: (
//                 state,
//                 action: PayloadAction<ChannelManagementListResponse | null>
//             ) => {
//                 state.selectedItem = action.payload
//             },
//             setChannelMgt: (
//                 state,
//                 action: PayloadAction<ChannelManagementListResponse[]>
//             ) => {
//                 state.channelMgt = action.payload
//             },
//         },
//     })

// export const {
//     setItems,
//     setPage,
//     setRowsPerPage,
//     setSearchValue,
//     setSortValue,
//     setTotalItems,
//     setIsTableLoading,
//     setSelectedId,
//     setChannelMgt,
//     setSelectedItem,
// } = channelManagementSlice.actions
// export default channelManagementSlice.reducer
export {}
