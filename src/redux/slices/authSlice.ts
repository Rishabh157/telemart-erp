import { Slice, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { userData } from "src/models/Users.model ";

export interface AuthStateType {
  accessToken: string;
  refreshToken: string;
  deviceId: string;
  userData: userData | null;
}

const initialState: AuthStateType = {
  accessToken: "",
  refreshToken: "",
  deviceId: "",
  userData: null,
};

const authSlice: Slice<AuthStateType> = createSlice({
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
    setUserData: (state, action: PayloadAction<userData | null>) => {
      state.userData = action.payload;
    },
  },
});

export const { setAccessToken, setRefreshToken, setDeviceId, setUserData } =
  authSlice.actions;
export default authSlice.reducer;
