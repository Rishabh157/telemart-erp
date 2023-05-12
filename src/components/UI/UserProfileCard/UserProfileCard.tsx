import { ClickAwayListener } from "@mui/material";
import React from "react";
import { BsPerson } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useLogoutFromAllMutation,
  useLogoutMutation,
} from "src/services/UserServices";
import { singnOut } from "src/utils";

type UserProfileCardPropTypes = {
  onClickAway: () => void;
};

const UserProfileCard = ({ onClickAway }: UserProfileCardPropTypes) => {
  // Options
  const [logout] = useLogoutMutation();
  const [logoutFromAll] = useLogoutFromAllMutation();
  const { userData } = useSelector((state: any) => state.auth);
  const { email, fullName } = userData;
  const profileOptions = [
    {
      path: "/profile",
      label: "View Profile",
      icon: BsPerson,
    },
    {
      path: "/account-setting",
      label: "Account Settings",
      icon: IoSettingsOutline,
    },
  ];

  const navigate = useNavigate();

  const handleSignOut = () => {
    logout({});
    singnOut();
  };
  const signOutFromAllDevices = () => {
    logoutFromAll({});
    singnOut();
  };
  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <div className="absolute top-[70px] rigth-[20px] w-[290px] shadow-lg rounded animate-[fade_0.5s_ease-in-out] z-50  ">
        <div className="flex gap-5 items-center  bg-slate-50 h-[70px] px-8 border-b border-slate-300">
        <div className="h-[35px]  flex justify-center items-center font-bold bg-primary-main text-white  rounded-full">
          {fullName[0].toUpperCase()}
          </div>
          <div className="">
            <div className="text-slate-700 capitalize  "> {fullName} </div>
            <div className="text-sm text-slate-500"> {email} </div>
          </div>
        </div>

        <div className=" flex flex-col gap-3 px-7 py-5 bg-white ">
          {profileOptions.map((option, index) => {
            return (
              <div
                onClick={() => {
                  navigate(option.path);
                }}
                key={index}
                className="flex gap-3  text-slate-500 hover:text-primary-main cursor-pointer items-center"
              >
                <option.icon className="text-xl" />
                <div className=""> {option.label} </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-slate-300 px-7 py-3 bg-white">
          <div className="flex gap-3  text-slate-500 items-center hover:text-primary-main cursor-pointer">
            <MdOutlineLogout className="text-xl" />
            <div
              className=""
              onClick={() => {
                handleSignOut();
              }}
            >
              {" "}
              Sign out{" "}
            </div>
          </div>
        </div>
        <div className="border-t border-slate-300 px-7 py-3 bg-white">
          <div className="flex gap-3  text-slate-500 items-center hover:text-primary-main cursor-pointer">
            <MdOutlineLogout className="text-xl" />
            <div
              className=""
              onClick={() => {
                signOutFromAllDevices();
              }}
            >
              {" "}
              Sign out From All Devices{" "}
            </div>
          </div>
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default UserProfileCard;
