import React from "react";
import { Link } from "react-router-dom";

const AccessDenied = () => {
  return (
    <>
      <link
        rel="stylesheet"
        type="text/css"
        href={`/assets/css/bootstrap.min.css`}
      ></link>
      <div className="flex justify-center mt-5 pt-5">
        <div className="w-1/3 text-center">
          <h2>Access Denied (IP Restriction)</h2>
          <p className="mb-5">
            You don't have permission to access this page. Contact an
            administrator to get permissions or go to the home page and browse
            other pages
          </p>
          <Link to={"/dashboard"} className="px-3 py-1 rounded bg-green-600 text-white mt-5 shadow">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </>
  );
};

export default AccessDenied;
