import React from "react";
import { FormikProps } from "formik";
import { Field } from "src/models/FormField/FormField.model";
import { FormInitialValues } from "../../AddProductWrapper";
import StepAddCallScript from "./StepAddCallScript";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
};

export type FieldType = Field<"">;

const StepAddCallScriptWrapper = ({ formikProps }: Props) => {

  return (
    <>
      <StepAddCallScript
        formikProps={formikProps}
      />
    </>
  );
};

export default StepAddCallScriptWrapper;
