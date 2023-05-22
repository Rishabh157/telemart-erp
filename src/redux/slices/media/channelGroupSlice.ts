import { createSlice, Slice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {
    ChannelGroupListResponse,
    GetAllChannelGroupResponse,
} from 'src/models/ChannelGroup.model'

export interface ChannelGroupSliceStateType {
    items: ChannelGroupListResponse[] | []
    selectedItem: ChannelGroupListResponse | null
    totalItems: number
    isTableLoading: boolean
    page: number
    rowsPerPage: number
    searchValue: string
    sortValue: { field: string; value: 'DESC' | 'ASC' }
    selectedId: string
    channelgroup: GetAllChannelGroupResponse[] | null
}

const initialState: ChannelGroupSliceStateType = {
    items: [],
    selectedItem: null,
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: '',
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectedId: '',
    channelgroup: null,
}

const channelGroupSlice: Slice<ChannelGroupSliceStateType> = createSlice({
    name: 'channelGroup',
    initialState,
    reducers: {
        setItems: (
            state,
            action: PayloadAction<ChannelGroupListResponse[] | []>
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
        setChannelGroups: (
            state,
            action: PayloadAction<GetAllChannelGroupResponse[]>
        ) => {
            state.channelgroup = action.payload
        },
        setSelectedItem: (
            state,
            action: PayloadAction<GetAllChannelGroupResponse | null>
        ) => {
            state.selectedItem = action.payload
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
    setChannelGroups,
    setSelectedItem,
} = channelGroupSlice.actions
export default channelGroupSlice.reducer
