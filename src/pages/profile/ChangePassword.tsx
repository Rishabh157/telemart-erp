import React, { useState } from "react";
import { useSelector } from "react-redux";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { useChangePasswordMutation } from "src/services/UserServices";

const ChangePassword = () => {
  const { userData } = useSelector((state: any) => state.auth);
  const [currentPass, setCurrentPass] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorInitiate, setErrorInitiate] = useState(false);
  const [apiError, setApiError] = useState("");
  const [changePassWord, changePasswordInfo] = useChangePasswordMutation();
  const handleClick = () => {
    if (currentPass && newPassword) {
      changePassWord({
        currentPassword: currentPass,
        newPassword: newPassword,
        userId: userData.userId,
      })
        .then((res) => {
          if ("data" in res) {
            if (res?.data?.status) {
              localStorage.setItem("authToken", res?.data?.token);
              localStorage.setItem("refreshToken", res?.data?.refreshToken);
              setApiError("");
            } else {
              setApiError(res?.data?.message);
            }
          } else {
            setApiError("Something went wrong");
          }
        })
        .catch((err) => {});
    }
  };
  return (
    <div className="mt-6 flex flex-col w-[40%] h-[75%] gap-7 rounded-xl">
      <div className="rounded-lg">
        <ATMTextField
          name=""
          value={currentPass}
          onChange={(e) => {
            setCurrentPass(e.target.value);
          }}
          label="Current Password"
          className="bg-slate-100 focus:bg-white h-[50px]"
        />
        <span className="text-red-500 ">
          {!currentPass && errorInitiate ? "Please enter current password" : ""}
        </span>
      </div>
      <div className="rounded-lg">
        <ATMTextField
          name=""
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
          label="New Password"
          className="bg-slate-100 focus:bg-white h-[50px]"
        />
        <span className="text-red-500 ">
          {!newPassword && errorInitiate ? "Please enter new password" : ""}
        </span>
      </div>
      <div className="">
        <span className="text-red-500 block mx-auto text-center">
          {apiError}
        </span>
        <button
          onClick={() => {
            handleClick();
            setErrorInitiate(true);
          }}
          disabled={changePasswordInfo?.isLoading}
          type="button"
          className={`w-full ${
            false ? "bg-slate-400" : "bg-primary-main"
          } text-white h-[50px] rounded-lg`}
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
