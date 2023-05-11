import React from "react";
import { useSelector } from "react-redux";

const ProfileDetails = () => {
  const { userData } = useSelector((state: any) => state.auth);
  const { companyId, email, fullName, mobile, userId, userName } = userData;

  return (
    <div className="mt-3 h-100  ">
      <div className=" grid justify-items-start pl-5 p-3 border-2 grid-cols-3">
        <div>User ID </div>
        <div>: </div>
        <div>{userId}</div>
      </div>
      <div className=" grid justify-items-start pl-5 p-3 border-2 grid-cols-3">
        <div>Company ID </div>
        <div>: </div>
        <div>{companyId}</div>
      </div>
      <div className="grid justify-items-start pl-5 p-3 border-2 grid-cols-3">
        <div>Username </div>
        <div>: </div>
        <div>{userName}</div>
      </div>
      <div className="grid justify-items-start pl-5 p-3 border-2 grid-cols-3">
        <div>FullName </div>
        <div>: </div>
        <div>{fullName}</div>
      </div>
      <div className="grid justify-items-start pl-5 p-3 border-2 grid-cols-3">
        <div>Mobile Number </div>
        <div>: </div>
        <div>{mobile}</div>
      </div>
      <div className="grid justify-items-start pl-5 p-3 border-2 grid-cols-3">
        <div>Email </div>
        <div>: </div>
        <div>{email}</div>
      </div>
    </div>
  );
};

export default ProfileDetails;
