import React from "react";
import ATMFilePickerWrapper from "src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";

type Props = {};

const bankDetailInfoList = Array(3).fill(null);

const AccordianBankDetail = (props: Props) => {
  return (
    <div>
      {bankDetailInfoList?.map((bank, bankIndex) => (
        <div
          className={`${
            bankIndex !== bankDetailInfoList.length - 1 && "border-b pb-4"
          } ${bankIndex === 0 ? "pb-4" : "pt-4"}  border-slate-300 `}
        >
          <div className="text-primary-main text-lg pb-2 font-medium">
            Bank Information #{bankIndex + 1}
          </div>
          <div className="grid grid-cols-3 gap-4 gap-y-5">
            <ATMTextField
              name=""
              value={"Bank Name"}
              onChange={(e) => {}}
              label={"Bank Name"}
              placeholder={"Bank Name"}
              className="shadow bg-white rounded"
              disabled={true}
            />

            <ATMTextField
              name=""
              value={"Branch Name"}
              onChange={(e) => {}}
              label={"Branch Name"}
              placeholder={"Branch Name"}
              className="shadow bg-white rounded"
              disabled={true}
            />

            <ATMTextField
              name=""
              value={"Account Holder Name"}
              onChange={(e) => {}}
              label={"Account Holder Name"}
              placeholder={"Account Holder Name"}
              className="shadow bg-white rounded"
              disabled={true}
            />

            <ATMTextField
              name=""
              value={"Account Number"}
              onChange={(e) => {}}
              label={"Account Number"}
              placeholder={"Account Number"}
              className="shadow bg-white rounded"
              disabled={true}
            />
            <ATMTextField
              name=""
              value={"IFSC No."}
              onChange={(e) => {}}
              label={"IFSC No."}
              placeholder={"IFSC No."}
              className="shadow bg-white rounded"
              disabled={true}
            />

            <ATMTextField
              name=""
              value={"Account Type"}
              onChange={(e) => {}}
              label={"Account Type"}
              placeholder={"Account Type"}
              className="shadow bg-white rounded"
              disabled={true}
            />

            <ATMFilePickerWrapper
              name=""
              label="Cancelled Check"
              placeholder="Cancelled Check"
              onSelect={() => {}}
              selectedFile={"https://picsum.photos/200/300"}
              disabled={true}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccordianBankDetail;
