import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthStateType {
  accessToken: string;
  refreshToken: string;
  deviceId: string;
  userData: any;
}

const initialState: AuthStateType = {
  accessToken: "",
  refreshToken: "",
  deviceId: "",
  userData: null,
};

const authSlice: any = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    setDeviceId: (state, action: PayloadAction<string>) => {
      state.deviceId = action.payload;
    },
    setUserData: (state, action: PayloadAction<string>) => {
      state.userData = action.payload;
    },
  },
});

export const { setAccessToken, setRefreshToken, setDeviceId, setUserData } =
  authSlice.actions;
export default authSlice.reducer;
