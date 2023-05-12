import React from "react";
import { FormikProps } from "formik";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { FormInitialValues } from "../../AddProductWrapper";
import { FieldArray } from "formik";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
};

const StepAddTax = ({ formikProps }: Props) => {
  const { values, setFieldValue } = formikProps;

  return (
    <div className="py-6 ">
      <h1>hello</h1>
    </div>
  );
};

export default StepAddTax;
