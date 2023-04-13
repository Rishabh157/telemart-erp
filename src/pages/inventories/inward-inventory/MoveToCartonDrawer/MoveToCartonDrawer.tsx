import React from "react";
import { BsPrinter } from "react-icons/bs";
import ATMDrawer from "src/components/UI/atoms/ATMDrawer/ATMDrawer";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";

type Props = {
  onClose: () => void;
};

const MoveToCartonDrawer = ({ onClose }: Props) => {
  return (
    <ATMDrawer open={true} onClose={onClose}>
      <div className="w-[300px] p-3">
        <div className="w-full p-2 shadow rounded border">
          <div className="bg-slate-100 h-[120px] flex justify-center items-center">
            <ATMLoadingButton className="w-fit px-6">
              <div className="flex gap-2 items-center justify-center">
                <BsPrinter className="text-xl" /> Print
              </div>
            </ATMLoadingButton>
          </div>
          <div className="py-2"> Harjod Outer (50 pcs.) </div>
        </div>
      </div>
    </ATMDrawer>
  );
};

export default MoveToCartonDrawer;
