import React from "react";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";

const AccordianGeneralInformation = (data: any) => {
  console.log(data, "data");
  return (
    <div className="grid grid-cols-4 gap-4 gap-y-5">
      <ATMTextField
        name=""
        value={data?.data?.companyName || ""}
        onChange={(e) => {}}
        label={"Company Name"}
        placeholder={"Company Name"}
        className="shadow bg-white rounded"
        disabled={true}
      />

      <ATMTextField
        name=""
        value={data?.data?.companyType || ""}
        onChange={(e) => {}}
        label={"Company Type"}
        placeholder={"Company Type"}
        className="shadow bg-white rounded"
        disabled={true}
      />

      <ATMTextField
        name=""
        value={data?.data?.ownerShipType || ""}
        onChange={(e) => {}}
        label={"Ownership Type"}
        placeholder={"Ownership Type"}
        className="shadow bg-white rounded"
        disabled={true}
      />

      <ATMTextField
        name=""
        value={data?.data?.websiteAddress || ""}
        onChange={(e) => {}}
        label={"Website Address"}
        placeholder={"Website Address"}
        className="shadow bg-white rounded"
        disabled={true}
      />
      <ATMTextField
        name=""
        value={data?.data?.vendorCode || ""}
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
