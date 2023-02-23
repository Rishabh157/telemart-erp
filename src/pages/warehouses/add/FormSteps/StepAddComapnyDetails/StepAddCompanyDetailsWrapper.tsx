import { FormikProps } from "formik";
import React from "react";
import { Field, SelectOption } from "src/models/FormField/FormField.model";
import { FormInitialValues } from "../../AddWarehouseWrapper";
import StepAddComapnyDetails from "./StepAddComapnyDetails";

export type DropdownOptions = {
  countryOptions: SelectOption[];
};

type Props = {
  formikProps: FormikProps<FormInitialValues>;
};

export type FieldType = Field<"countryOptions">;

const countryOptions = [
  { label: "India", value: "INDIA" },
  { label: "Nepal", value: "NEPAL" },
];

const formFields: FieldType[] = [
  {
    name: "warehouseCode",
    label: "Warehouse Code",
    placeholder: "Warehouse Code",
  },
  {
    name: "warehouseName",
    label: "Warehouse Name",
    placeholder: "Warehouse Name",
  },
  {
    name: "country",
    label: "Country",
    placeholder: "Country",
    type: "select",
    optionAccessKey: "countryOptions",
  },
  
  {
    name: "email",
    label: "Email",
    placeholder: "Email",
  },
];

const StepAddCompanyDetailsWrapper = ({ formikProps }: Props) => {
  const dropdownOptions: DropdownOptions = {
    countryOptions,
  };

  return (
    <>
      <StepAddComapnyDetails
        formikProps={formikProps}
        dropdownOptions={dropdownOptions}
        formFields={formFields}
      />
    </>
  );
};

export default StepAddCompanyDetailsWrapper;
