import React from "react";
import { FormikProps } from "formik";
import { FormInitialValues } from "../../EditCompanyWrapper";
import StepEditCompanyDetails from "./StepEditCompanyDetails";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
};

const StepEditCompanyDetailsWrapper = ({ formikProps }: Props) => {
  return (
    <>
      <StepEditCompanyDetails formikProps={formikProps} />
    </>
  );
};

export default StepEditCompanyDetailsWrapper;
