import React from "react";
import { FormikProps } from "formik";
import { Field } from "src/models/FormField/FormField.model";
import { FormInitialValues } from "../../EditProductWrapper";
import StepEditVideo from "./StepEditVideo";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
};

export type FieldType = Field<"">;

const StepEditVideoWrapper = ({ formikProps }: Props) => {
  return (
    <>
      <StepEditVideo formikProps={formikProps} />
    </>
  );
};

export default StepEditVideoWrapper;
