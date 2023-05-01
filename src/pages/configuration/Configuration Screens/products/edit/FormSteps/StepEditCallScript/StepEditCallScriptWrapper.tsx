import React from "react";
import { FormikProps } from "formik";
import { FormInitialValues } from "../../EditProductWrapper";
import StepEditCallScript from "./StepEditCallScript";
import { SelectOption } from "src/models/FormField/FormField.model";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
  allLanguages: any;
};

export type DropdownOptions = {
  langaugeOption: SelectOption[];
};

const StepEditCallScriptWrapper = ({ formikProps, allLanguages }: Props) => {
  const langaugeOption = allLanguages?.map((ele: any) => {
    return { label: ele?.languageName, value: ele?._id };
  });
  const dropdownOptions: DropdownOptions = {
    langaugeOption,
  };
  return (
    <>
      <StepEditCallScript
        formikProps={formikProps}
        dropdownOptions={dropdownOptions}
      />
    </>
  );
};

export default StepEditCallScriptWrapper;
