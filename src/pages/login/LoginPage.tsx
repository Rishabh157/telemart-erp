import React, { useState } from "react";
import ATMInputAdormant from "../../components/UI/atoms/formFields/ATMInputAdormant/ATMInputAdormant";
import ATMTextField from "../../components/UI/atoms/formFields/ATMTextField/ATMTextField";
import loginImg from "src/assets/images/login.jpeg";
import { BiShow, BiHide } from "react-icons/bi";

import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "src/services/UserServices";
import {
  setAccessToken,
  setRefreshToken,
  setUserData,
} from "src/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { showToast } from "src/utils";

const LoginPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [apiError, setApiError] = useState("");
  const [errorInitiate, setErrorInitiate] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, loginInfo] = useLoginMutation();
  const handleLogin = () => {
    if (userName && password) {
      login({
        userName: userName,
        password: password,
      })
        .then((res) => {
          if ("data" in res) {
            if (res?.data?.status) {
              let userData = {
                userId: res?.data?.data?.userId,
                fullName: res?.data?.data?.fullName,
                email: res?.data?.data?.email,
                mobile: res?.data?.data?.mobile,
                userName: res?.data?.data?.userName,
              };
              dispatch(setAccessToken(res?.data?.data?.token));
              dispatch(setRefreshToken(res?.data?.data?.refreshToken));
              dispatch(setUserData(userData));
              localStorage.setItem("userData", JSON.stringify(userData));
              localStorage.setItem("authToken", res?.data?.data?.token);
              localStorage.setItem(
                "refreshToken",
                res?.data?.data?.refreshToken
              );

              navigate("/dashboard");
              showToast("success", "Login successfull");
            } else {
              setApiError(res?.data?.message);
            }
          } else {
            showToast("error", "Something went wrong please try again later");
          }
        })
        .catch((err) => {});
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-100 flex justify-center items-center">
      <div className="w-[50%] h-[75%] bg-white rounded-xl grid grid-cols-2 overflow-hidden">
        <div className="h-full">
          <img src={loginImg} alt="" className="h-full" />
        </div>

        <div className="h-full px-10 py-14">
          <div className="text-2xl font-semibold "> Login </div>

          <div className="mt-6 flex flex-col gap-7">
            <div className="">
              <ATMTextField
                name=""
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                label="User name"
                className="bg-slate-100 focus:bg-white h-[50px]"
              />
              <span className="text-red-500 ">
                {!userName && errorInitiate ? "Please enter username" : ""}
              </span>
            </div>

            <div className="">
              <ATMInputAdormant
                name=""
                type={isShowPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                label="Password"
                className="bg-slate-100 focus:bg-white h-[50px]"
                adormant={
                  isShowPassword ? (
                    <BiHide className="text-xl" />
                  ) : (
                    <BiShow className="text-xl" />
                  )
                }
                adormantProps={{
                  position: "end",
                  extraClasses: "bg-white border-none",
                  onClick: () => {
                    setIsShowPassword((isShowPassword) => !isShowPassword);
                  },
                }}
              />
              <span className="text-red-500 ">
                {!password && errorInitiate ? "Please enter password" : ""}
              </span>
            </div>
            <div className="">
              <span className="text-red-500 block mx-auto text-center">
                {apiError}
              </span>
              <button
                onClick={() => {
                  setErrorInitiate(true);
                  handleLogin();
                }}
                disabled={loginInfo?.isLoading}
                type="button"
                className={`w-full ${
                  loginInfo?.isLoading ? "bg-slate-400" : "bg-primary-main"
                } text-white h-[50px] rounded-lg`}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
