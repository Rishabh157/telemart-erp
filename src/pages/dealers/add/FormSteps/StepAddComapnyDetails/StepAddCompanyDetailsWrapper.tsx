import { FormikProps } from "formik";
import React from "react";
import { Field, SelectOption } from "src/models/FormField/FormField.model";
import { FormInitialValues } from "../../AddDealerWrapper";
import StepAddComapnyDetails from "./StepAddComapnyDetails";

export type DropdownOptions = {
  dealerCategoryOptions: SelectOption[],
}

type Props = {
  formikProps: FormikProps<FormInitialValues>;
};

export type FieldType = Field<"dealerCategoryOptions">

const dealerCategoryOptions = [{ label: "Category 1", value: "category-1" }];

const formFields: FieldType[] = [
  {
    name: "dealer_code",
    label: "Dealer Code",
    placeholder: "Dealer Code",
  },
  {
    name: "dealer_category",
    label: "Dealer Category",
    placeholder: "Dealer Category",
    type: "select",
    optionAccessKey: "dealerCategoryOptions",
  },
  {
    name: "firm_name",
    label: "Firm Name",
    placeholder: "Firm Name",
  },
  {
    name: "first_name",
    label: "First Name",
    placeholder: "First Name",
  },
  {
    name: "last_name",
    label: "Last Name",
    placeholder: "Last Name",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Email",
  },
];

const StepAddCompanyDetailsWrapper = ({ formikProps }: Props) => {
  const dropdownOptions: DropdownOptions = {
    dealerCategoryOptions,
  };

  return (
    <>
      <StepAddComapnyDetails formikProps={formikProps} dropdownOptions= {dropdownOptions} formFields={formFields} />
    </>
  );
};

export default StepAddCompanyDetailsWrapper;
