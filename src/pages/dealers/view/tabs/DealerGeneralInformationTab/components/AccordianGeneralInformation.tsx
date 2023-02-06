import React from "react";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";

type Props = {};

const AccordianGeneralInformation = (props: Props) => {
  return (
    <div className="grid grid-cols-3 gap-4 gap-y-5">
      <ATMTextField
        name=""
        value={"Dealer Code"}
        onChange={(e) => {}}
        label={"Dealer Code"}
        placeholder={"Dealer Code"}
        className="shadow bg-white rounded"
        disabled={true}
      />

      <ATMTextField
        name=""
        value={"Dealer Category"}
        onChange={(e) => {}}
        label={"Dealer Category"}
        placeholder={"Dealer Category"}
        className="shadow bg-white rounded"
        disabled={true}
      />

      <ATMTextField
        name=""
        value={"Firm Name"}
        onChange={(e) => {}}
        label={"Firm Name"}
        placeholder={"Firm Name"}
        className="shadow bg-white rounded"
        disabled={true}
      />

      <ATMTextField
        name=""
        value={"First Name"}
        onChange={(e) => {}}
        label={"First Name"}
        placeholder={"First Name"}
        className="shadow bg-white rounded"
        disabled={true}
      />
      <ATMTextField
        name=""
        value={"Last Name"}
        onChange={(e) => {}}
        label={"Last Name"}
        placeholder={"Last Name"}
        className="shadow bg-white rounded"
        disabled={true}
      />

      <ATMTextField
        name=""
        value={"Email"}
        onChange={(e) => {}}
        label={"Email"}
        placeholder={"Email"}
        className="shadow bg-white rounded"
        disabled={true}
      />
    </div>
  );
};

export default AccordianGeneralInformation;
