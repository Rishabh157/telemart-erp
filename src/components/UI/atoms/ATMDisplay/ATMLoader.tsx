import React from "react";
import { CircularProgress } from "@mui/material";

export const ATMFullScreenLoader: React.FC = () => {

  React.useEffect(() => {
    // Prevent scrolling when the loader is active
    document.body.style.overflow = "hidden";

    // Cleanup to allow scrolling after the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      <CircularProgress />
    </div>
  );
};
