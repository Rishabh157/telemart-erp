/// ==============================================
// Filename:SideNavLayout.ts
// Type: Layout Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================


// |-- External Dependencies --|
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// |-- Types --|
export type InitialStateType = {
    isCollapsed: boolean
}

const initialState: InitialStateType = {
    isCollapsed: false,
}

const sideNavLayoutSlice: any = createSlice({
    name: 'sideNavLayout',
    initialState,
    reducers: {
        setIsCollapsed: (state, action: PayloadAction<boolean>) => {
            state.isCollapsed = action.payload
        },
    },
})

export const { setIsCollapsed } = sideNavLayoutSlice.actions
export default sideNavLayoutSlice.reducer
