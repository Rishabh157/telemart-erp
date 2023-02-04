import React from "react";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";

type Props = {};

const AccordianGeneralInformation = (props: Props) => {
  return (
      <div className="grid grid-cols-4 gap-4 gap-y-5">
        <ATMTextField
          name=""
          value={"Company Name"}
          onChange={(e) => {}}
          label={"Company Name"}
          placeholder={"Company Name"}
          className="shadow bg-white rounded"
          disabled={true}
        />

        <ATMTextField
          name=""
          value={"Company Type"}
          onChange={(e) => {}}
          label={"Company Type"}
          placeholder={"Company Type"}
          className="shadow bg-white rounded"
          disabled={true}
        />

        <ATMTextField
          name=""
          value={"Ownership Type"}
          onChange={(e) => {}}
          label={"Ownership Type"}
          placeholder={"Ownership Type"}
          className="shadow bg-white rounded"
          disabled={true}
        />

        <ATMTextField
          name=""
          value={"Website Address"}
          onChange={(e) => {}}
          label={"Website Address"}
          placeholder={"Website Address"}
          className="shadow bg-white rounded"
          disabled={true}
        />
        <ATMTextField
          name=""
          value={"Vendor Code"}
          onChange={(e) => {}}
          label={"Vendor Code"}
          placeholder={"Vendor Code"}
          className="shadow bg-white rounded"
          disabled={true}
        />

      </div>
  );
};

export default AccordianGeneralInformation;
