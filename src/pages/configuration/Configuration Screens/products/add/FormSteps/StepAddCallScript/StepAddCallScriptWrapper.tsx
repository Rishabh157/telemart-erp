import React from "react";
import { FormikProps } from "formik";
import { SelectOption } from "src/models/FormField/FormField.model";
import { FormInitialValues } from "../../AddProductWrapper";
import StepAddCallScript from "./StepAddCallScript";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
  allLanguages: any;
};
export type DropdownOptions = {
  langaugeOption: SelectOption[];
};

const StepAddCallScriptWrapper = ({ formikProps, allLanguages }: Props) => {
  const langaugeOption = allLanguages?.map((ele: any) => {
    return { label: ele?.languageName, value: ele?._id };
  });
  const dropdownOptions: DropdownOptions = {
    langaugeOption,
  };
  return (
    <>
      <StepAddCallScript
        formikProps={formikProps}
        dropdownOptions={dropdownOptions}
      />
    </>
  );
};

export default StepAddCallScriptWrapper;
