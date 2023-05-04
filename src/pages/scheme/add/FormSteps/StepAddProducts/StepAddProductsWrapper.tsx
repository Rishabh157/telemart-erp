import React from "react";
import { FormikProps } from "formik";
import { Field, SelectOption } from "src/models/FormField/FormField.model";
import { FormInitialValues } from "../../AddSchemeWrapper";
import StepAddProducts from "./StepAddProducts";


type Props = {
  formikProps: FormikProps<FormInitialValues>;
  dropdownOptions: DropdownOptions;
  productGroupOptions: any;
};

export type DropdownOptions = {
  productGroupOptions: SelectOption[];
};

export type FieldType = Field<"productGroupOptions">;

const StepAddProductsWrapper = ({
  formikProps,
  productGroupOptions,
}: Props) => {

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
