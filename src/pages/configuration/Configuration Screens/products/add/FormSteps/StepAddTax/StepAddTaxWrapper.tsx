import React from "react";
import { FormikProps } from "formik";
import { Field } from "src/models/FormField/FormField.model";
import { FormInitialValues } from "../../AddProductWrapper";
import StepAddTax from "./StepAddTax";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
};


export type FieldType = Field<"companyTypeOptions" | "ownershipTypeOptions">;

const StepAddTaxWrapper = ({ formikProps }: Props) => {

  return (
    <>
      <StepAddTax
        formikProps={formikProps}
      />
    </>
  );
};

export default StepAddTaxWrapper;
