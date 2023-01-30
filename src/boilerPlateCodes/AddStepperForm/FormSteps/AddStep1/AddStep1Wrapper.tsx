import React from "react";
import { FormikProps } from "formik";
import { Field } from "src/models/FormField/FormField.model";
import { FormInitialValues } from "../../AddStepperFormWrapper";
import AddStep1 from "./AddStep1";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
};

export type FieldType = Field<"companyTypeOptions" | "ownershipTypeOptions">;

const companyTypeOptions = [{ label: "Public", value: "public" }];
const ownershipTypeOptions = [{ label: "Partnership", value: "partnership" }];

const formFields: FieldType[] = [
  {
    name: "company_name",
    label: "Company Name",
    placeholder: "Company Name",
  },
  {
    name: "company_type",
    label: "Company Type",
    placeholder: "Company Type",
    type: "select",
    optionAccessKey: "companyTypeOptions",
  },
  {
    name: "ownership_type",
    label: "Ownership Type",
    placeholder: "Ownership Type",
    type: "select",
    optionAccessKey: "ownershipTypeOptions",
  },
  {
    name: "website_address",
    label: "Website Address",
    placeholder: "Website Address",
  },
  {
    name: "vendor_code",
    label: "Vendor Code",
    placeholder: "Vendor Code",
  },
];

const AddStep1Wrapper = ({ formikProps }: Props) => {
  const dropdownOptions = {
    companyTypeOptions,
    ownershipTypeOptions,
  };

  return (
    <>
      <AddStep1 formikProps={formikProps} dropdownOptions= {dropdownOptions} formFields={formFields} />
    </>
  );
};

export default AddStep1Wrapper;
