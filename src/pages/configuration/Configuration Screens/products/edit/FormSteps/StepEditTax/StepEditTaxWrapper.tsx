/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { FormikProps } from "formik";
import { Field } from "src/models/FormField/FormField.model";
import { FormInitialValues } from "../../EditProductWrapper";
import StepEditTax from "./StepEditTax";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
};

export type FieldType = Field<"companyTypeOptions" | "ownershipTypeOptions">;

const StepEditTaxWrapper = ({ formikProps }: Props) => {
  return (
    <>
      <StepEditTax formikProps={formikProps} />
    </>
  );
};

export default StepEditTaxWrapper;
