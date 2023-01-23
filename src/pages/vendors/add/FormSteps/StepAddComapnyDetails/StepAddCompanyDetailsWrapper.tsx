import { FormikProps } from "formik";
import React from "react";
import { Field } from "src/models/FormField/FormField.model";
import { FormInitialValues } from "../../AddVendorWrapper";
import StepAddComapnyDetails from "./StepAddComapnyDetails";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
};

const companyTypeOptions = [{ label: "Public", value: "public" }];
const ownershipTypeOptions = [{ label: "Partnership", value: "partnership" }];

const formFields: Field<"companyTypeOptions" | "ownershipTypeOptions">[] = [
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

const StepAddCompanyDetailsWrapper = ({ formikProps }: Props) => {
  const dropdownOptions = {
    companyTypeOptions,
    ownershipTypeOptions,
  };

  return (
    <>
      <StepAddComapnyDetails formikProps={formikProps} dropdownOptions= {dropdownOptions} formFields={formFields} />
    </>
  );
};

export default StepAddCompanyDetailsWrapper;
