import React from "react";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";

type Props = {};

const AccordianAddress = (props: Props) => {
  return (
    <div>
      {/* Regd. Address */}
      <div className="border-b border-slate-300 pb-4">
        <div className="text-primary-main text-lg pb-2 font-medium">
          Regd Address
        </div>
        <div className="grid grid-cols-3 gap-4 gap-y-5">
          <ATMTextField
            name=""
            value={"Phone"}
            onChange={(e) => {}}
            label={"Phone"}
            placeholder={"Phone"}
            className="shadow bg-white rounded"
            disabled={true}
          />

          <ATMTextField
            name=""
            value={"Address"}
            onChange={(e) => {}}
            label={"Address"}
            placeholder={"Address"}
            className="shadow bg-white rounded"
            disabled={true}
          />

          <ATMTextField
            name=""
            value={"Country"}
            onChange={(e) => {}}
            label={"Country"}
            placeholder={"Country"}
            className="shadow bg-white rounded"
            disabled={true}
          />

          <ATMTextField
            name=""
            value={"State"}
            onChange={(e) => {}}
            label={"State"}
            placeholder={"State"}
            className="shadow bg-white rounded"
            disabled={true}
          />
          <ATMTextField
            name=""
            value={"District"}
            onChange={(e) => {}}
            label={"District"}
            placeholder={"District"}
            className="shadow bg-white rounded"
            disabled={true}
          />

          <ATMTextField
            name=""
            value={"Pincode"}
            onChange={(e) => {}}
            label={"Pincode"}
            placeholder={"Pincode"}
            className="shadow bg-white rounded"
            disabled={true}
          />
        </div>
      </div>

      {/* Biiling Address  */}
      <div className=" pt-4">
        <div className="text-primary-main text-lg pb-2 font-medium">
          Billing Address
        </div>
        <div className="grid grid-cols-3 gap-4 gap-y-5">
          <ATMTextField
            name=""
            value={"Phone"}
            onChange={(e) => {}}
            label={"Phone"}
            placeholder={"Phone"}
            className="shadow bg-white rounded"
            disabled={true}
          />

          <ATMTextField
            name=""
            value={"Address"}
            onChange={(e) => {}}
            label={"Address"}
            placeholder={"Address"}
            className="shadow bg-white rounded"
            disabled={true}
          />

          <ATMTextField
            name=""
            value={"Country"}
            onChange={(e) => {}}
            label={"Country"}
            placeholder={"Country"}
            className="shadow bg-white rounded"
            disabled={true}
          />

          <ATMTextField
            name=""
            value={"State"}
            onChange={(e) => {}}
            label={"State"}
            placeholder={"State"}
            className="shadow bg-white rounded"
            disabled={true}
          />
          <ATMTextField
            name=""
            value={"District"}
            onChange={(e) => {}}
            label={"District"}
            placeholder={"District"}
            className="shadow bg-white rounded"
            disabled={true}
          />

          <ATMTextField
            name=""
            value={"Pincode"}
            onChange={(e) => {}}
            label={"Pincode"}
            placeholder={"Pincode"}
            className="shadow bg-white rounded"
            disabled={true}
          />
        </div>
      </div>
    </div>
  );
};

export default AccordianAddress;
