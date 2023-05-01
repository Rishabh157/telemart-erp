import React from "react";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMPageHeading from "src/components/UI/atoms/ATMPageHeading/ATMPageHeading";
import ATMSelect from "src/components/UI/atoms/formFields/ATMSelect/ATMSelect";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import MoveToCartonDrawer from "./MoveToCartonDrawer/MoveToCartonDrawer";

type Props = {};

const breadcrumbs: BreadcrumbType[] = [
  {
    label: "Inventory",
    path: "/inventory",
  },
  {
    label: "Inward Inventory",
  },
];

const packagingOptions = [
  {
    label: "Carton 30 Pcs. Product 1",
    value: "1",
  },
  {
    label: "Carton 30 Pcs. Product 2",
    value: "2",
  },
];

const InwardInventory = (props: Props) => {
  const [packaging, setPackaging] = React.useState("");
  const [barcode, setBarcode] = React.useState("");
  const [isOpenMoveToCartonDrawer, setIsOpenMoveToCartonDrawer] =
    React.useState(false);

  return (
    <div className="p-2">
      <ATMBreadCrumbs breadcrumbs={breadcrumbs} />

      {/* Page Header */}
      <div className="flex justify-between items-center h-[55px]">
        <ATMPageHeading> Inventories </ATMPageHeading>
        <button
          type="button"
          onClick={() => {
            setIsOpenMoveToCartonDrawer(true);
          }}
          className="bg-primary-main text-white rounded py-1 px-3"
        >
          + Move to Carton
        </button>
      </div>

      <div className="border flex flex-col h-[calc(100%-55px)] rounded bg-white p-2">
        <div className="grid grid-cols-4 gap-5 ">
          <ATMSelect
            name=""
            value={packaging}
            onChange={(e) => {
              setPackaging(e.target.value);
            }}
            options={packagingOptions}
            label="Packaging"
          />

          <ATMTextField
            name=""
            value={barcode}
            onChange={(e) => {
              setBarcode(e.target.value);
            }}
            label="Barcode"
          />
        </div>

        <div className="mt-5 py-3 grid grid-cols-6 gap-4 border-t border-slate-300 ">
          {Array(6)
            .fill(null)
            .map((_, index) => {
              return (
                <div
                  key={index}
                  className={`flex flex-col gap-2 shadow rounded-lg border-[1.5px] relative p-2 cursor-pointer`}
                >
                  <div className="flex justify-between">
                    <div>
                      <div className="text-[12px] text-slate-500">
                        Barcode No.
                      </div>
                      <div> 123456789 </div>
                    </div>
                  </div>

                  <div className="text-primary-main font-medium grow flex items-end">
                    Product Name
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {isOpenMoveToCartonDrawer && (
        <MoveToCartonDrawer
          onClose={() => setIsOpenMoveToCartonDrawer(false)}
        />
      )}
    </div>
  );
};

export default InwardInventory;
