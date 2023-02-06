import React from "react";
import ATMBreadCrumbs from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMPageHeading from "src/components/UI/atoms/ATMPageHeading/ATMPageHeading";
import ATMTimeLine from "src/components/UI/atoms/ATMTimeLine/ATMTimeLine";

type Props = {};

const timeLineItems = Array(50).fill({
  content: (
    <div className="flex gap-3">
      <div> 06 Feb 2023 </div>
      <div className="bg-slate-100 rounded-full text-[13px] px-2 flex justify-center items-center">
        {" "}
        10:00 AM{" "}
      </div>

      <div className="text-primary-main font-medium">Applied to the box</div>
    </div>
  ),
});

const ViewBarcode = (props: Props) => {
  return (
    <div className="h-full px-2 py-2 flex flex-col">
      {/* BreadCrumbs */}
      <div>
        <ATMBreadCrumbs
          breadcrumbs={[
            {
              label: "Barcodes",
              path: "/bacode",
            },
            {
              label: "Single Barcode",
            },
          ]}
        />
      </div>

      <div className="py-2">
        <ATMPageHeading> Barcode </ATMPageHeading>
      </div>

      <div className="bg-white shadow rounded border grow overflow-auto border-slate-300 relative">
        {/* Barcode Info */}
        <div className="px-3 py-3 border-b border-slate-300 sticky top-0 bg-white z-50 shadow">
          <div className="flex gap-2">
            <div className="text-primary-main font-bold">
              {" "}
              Barcode Number :{" "}
            </div>
            <div className="font-medium text-blue-900"> 123456789 </div>
          </div>

          <div className="flex gap-2">
            <div className="text-primary-main font-bold"> Product Name : </div>
            <div className="font-medium text-blue-900"> Slim24 </div>
          </div>
        </div>

        {/* Barcode Time Track */}
        <div className="py-3 ">
          <ATMTimeLine timeLineItems={timeLineItems} />
        </div>
      </div>
    </div>
  );
};

export default ViewBarcode;
