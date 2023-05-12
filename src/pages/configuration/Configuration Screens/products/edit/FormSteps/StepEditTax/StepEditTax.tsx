import React from "react";
import { FormikProps } from "formik";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { FormInitialValues } from "../../EditProductWrapper";
import { FieldArray } from "formik";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
};

const StepEditTax = ({ formikProps }: Props) => {
  const { values, setFieldValue } = formikProps;

  return (

    <>
   <h1>hellpo</h1>
   </> 
   );
};

export default StepEditTax;
