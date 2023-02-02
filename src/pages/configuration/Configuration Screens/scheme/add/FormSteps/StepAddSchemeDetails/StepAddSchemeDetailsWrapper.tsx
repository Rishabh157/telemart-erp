import React from "react";
import { FormikProps } from "formik";
import { Field, SelectOption } from "src/models/FormField/FormField.model";
import { FormInitialValues } from "../../AddSchemeWrapper";
import StepAddSchemeDetails from "./StepAddSchemeDetails";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
};

export type  DropdownOptions = {
  categoryOptions: SelectOption[];
};

export type FieldType = Field<"categoryOptions" | "ownershipTypeOptions">;

const categoryOptions = [{ label: "Public", value: "public" }];

const StepAddSchemeDetailsWrapper = ({ formikProps }: Props) => {
  const dropdownOptions:DropdownOptions = {
    categoryOptions,
  };

  return (
    <>
      <StepAddSchemeDetails formikProps={formikProps} dropdownOptions= {dropdownOptions}  />
    </>
  );
};

export default StepAddSchemeDetailsWrapper;
