import { FormikProps } from "formik";
import React from "react";
import { Field, SelectOption } from "src/models/FormField/FormField.model";
import { FormInitialValues } from "../../EditDealerWrapper";
import StepEditComapnyDetails from "./StepEditDealerDetails";


export type DropdownOptions = {
  dealerCategoryOptions: SelectOption[];
};

type Props = {
  formikProps: FormikProps<FormInitialValues>;
  dealerCategoryOptions:any[]
};

export type FieldType = Field<"dealerCategoryOptions">;

//const dealerCategoryOptions = [{ label: "Category 1", value: "category-1" }];

const formFields: FieldType[] = [
  {
    name: "dealerCode",
    label: "Dealer Code",
    placeholder: "Dealer Code",
  },
  {
    name: "dealerCategory",
    label: "Dealer Category",
    placeholder: "Dealer Category",
    type: "select",
    optionAccessKey: "dealerCategoryOptions",
  },
  {
    name: "firmName",
    label: "Firm Name",
    placeholder: "Firm Name",
  },
  {
    name: "firstName",
    label: "First Name",
    placeholder: "First Name",
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "Last Name",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Email",
  },
];

const StepEditCompanyDetailsWrapper = ({ formikProps,dealerCategoryOptions }: Props) => {
 const dropdownOptions: DropdownOptions = {
    dealerCategoryOptions,
  };

  return (
    <>
      <StepEditComapnyDetails
        formikProps={formikProps}
        dropdownOptions={dropdownOptions}
        formFields={formFields}
      />
    </>
  );
};
export default StepEditCompanyDetailsWrapper;
