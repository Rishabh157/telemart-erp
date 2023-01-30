import React from "react";
import { FormikProps } from "formik";
import { Field } from "src/models/FormField/FormField.model";
import { FormInitialValues } from "../../AddProductWrapper";
import StepAddProductDetails from "./StepAddProductDetails";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
};

export type FieldType = Field<"productSubCategoryOPtions" | "productCategoryOPtions">;

const productSubCategoryOPtions = [{ label: "Public", value: "public" }];
const productCategoryOPtions = [{ label: "Category 1", value: "cat1" }];

const StepAddProductDetailsWrapper = ({ formikProps }: Props) => {
  const dropdownOptions = {
    productSubCategoryOPtions,
    productCategoryOPtions,
  };

  return (
    <>
      <StepAddProductDetails
        formikProps={formikProps}
        dropdownOptions={dropdownOptions}
      />
    </>
  );
};

export default StepAddProductDetailsWrapper;
