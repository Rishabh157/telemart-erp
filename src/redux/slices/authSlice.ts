import { Slice, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { userData } from 'src/models/Users.model '

export interface AuthStateType {
    accessToken: string
    refreshToken: string
    deviceId: string
    userData: userData | null
    formSubmitting: boolean
    customized: boolean
}

const initialState: AuthStateType = {
    customized: false,
    accessToken: '',
    refreshToken: '',
    deviceId: '',
    userData: null,
    formSubmitting: true,
}

const authSlice: Slice<AuthStateType> = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload
        },
        setRefreshToken: (state, action: PayloadAction<string>) => {
            state.refreshToken = action.payload
        },
        setDeviceId: (state, action: PayloadAction<string>) => {
            state.deviceId = action.payload
        },

        setUserData: (state, action: PayloadAction<userData | null>) => {
            state.userData = action.payload
        },
        setFormSubmitting: (state, action: PayloadAction<boolean>) => {
            state.formSubmitting = action.payload
        },
        setFieldCustomized: (state, action: PayloadAction<boolean>) => {
            state.customized = action.payload
        },
    },
})

export const {
    setAccessToken,
    setRefreshToken,
    setDeviceId,
    setUserData,
    setFormSubmitting,
    setFieldCustomized,
} = authSlice.actions
export default authSlice.reducer
