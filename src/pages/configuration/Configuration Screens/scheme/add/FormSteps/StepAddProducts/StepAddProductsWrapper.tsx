import React from "react";
import { FormikProps } from "formik";
import { Field, SelectOption } from "src/models/FormField/FormField.model";
import { FormInitialValues } from "../../AddSchemeWrapper";
import StepAddProducts from "./StepAddProducts";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
};

export type DropdownOptions = {
  productGroupOptions: SelectOption[];
};

export type FieldType = Field<"productGroupOptions">;

const productGroupOptions = [
  { label: "Product Group 1 ", value: "grp1" },
  { label: "Product Group 2 ", value: "grp2" },
];

const StepAddProductsWrapper = ({ formikProps }: Props) => {
  const dropdownOptions: DropdownOptions = {
    productGroupOptions,
  };

  return (
    <>
      <StepAddProducts
        formikProps={formikProps}
        dropdownOptions={dropdownOptions}
      />
    </>
  );
};

export default StepAddProductsWrapper;
