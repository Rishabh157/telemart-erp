import { apiSlice } from "src/services/ApiSlice";
import { toast } from "react-hot-toast";
import { setAccessToken, setRefreshToken } from "src/redux/slices/authSlice";

type ToastType = "success" | "error";
const apiSliceType: any = apiSlice;

export const singnOut = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userData");
  window.location.replace("/");
};
export interface LocationSelectType {
  value:string;
  label:string
}

export const showToast = (type: ToastType, message: string) => {
  toast[type](message, {
    duration: 3000,
    position: "top-right",
  });
};
export const authMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action);
  const token = localStorage.getItem("authToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const userData = localStorage.getItem("userData");

  if (result.error && result.payload.status === 401) {
    store
      .dispatch(
        apiSliceType.endpoints.refreshToken.initiate({
          refreshToken: localStorage.getItem("refreshToken"),
        })
      )
      .then((res: any) => {
        if (
          res?.error &&
          (res?.error?.status === 401 || res?.error?.status === 500)
        ) {
          singnOut();
        } else {
          store.dispatch(setAccessToken(res?.data?.data?.token));
          store.dispatch(setRefreshToken(res?.data?.data?.refreshToken));
          localStorage.setItem("authToken", res.data?.data?.token);
          localStorage.setItem("refreshToken", res.data?.data?.refreshToken);
        }
      });
  } else if (token && refreshToken && !userData) {
    singnOut();
  }
  return result;
};
