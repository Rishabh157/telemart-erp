import React from "react";
import { FormikProps } from "formik";
import { Field, SelectOption } from "src/models/FormField/FormField.model";
import { FormInitialValues } from "../../AddSchemeWrapper";
import StepAddProducts from "./StepAddProducts";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
};

export type  DropdownOptions = {
  productOptions: SelectOption[];
};

export type FieldType = Field<"productOptions">;

const productOptions = [{ label: "Product 1 ", value: "Product1" }];


const StepAddProductsWrapper = ({ formikProps }: Props) => {
  const dropdownOptions : DropdownOptions = {
    productOptions,
  };

  return (
    <>
      <StepAddProducts formikProps={formikProps} dropdownOptions= {dropdownOptions}  />
    </>
  );
};

export default StepAddProductsWrapper;
