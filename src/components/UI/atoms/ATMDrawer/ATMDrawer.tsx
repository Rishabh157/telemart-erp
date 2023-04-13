import * as React from "react";
import Drawer from "@mui/material/Drawer";

type Props = {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
};

const ATMDrawer = ({ children, open = false, onClose }: Props) => {
  return (
      <Drawer anchor={"right"} open={open} onClose={onClose} >
        {children}
      </Drawer>
  );
};

export default ATMDrawer;
