import React from "react";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";

type Props = {};

const contactInfoList = Array(3).fill(null)

const AccordianContact = (props: Props) => {
  return (
    <div>
      {contactInfoList?.map((contact, contactIndex) => (
        <div key={contactIndex} className={`${contactIndex !== contactInfoList.length-1 && "border-b pb-4" } ${contactIndex===0 ? "pb-4" : "pt-4"}  border-slate-300 `}>
          <div className="text-primary-main text-lg pb-2 font-medium">
              Contact Information #{contactIndex+1}
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
      ))}
    </div>
  );
};

export default AccordianContact;
