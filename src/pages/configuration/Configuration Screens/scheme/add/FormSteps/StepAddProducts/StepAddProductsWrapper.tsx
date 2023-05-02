import React, { useEffect } from "react";
import { FormikProps } from "formik";
import { Field, SelectOption } from "src/models/FormField/FormField.model";
import { FormInitialValues } from "../../AddSchemeWrapper";
import StepAddProducts from "./StepAddProducts";
import { useGetAllProductGroupQuery } from "src/services/ProductGroupService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { setAllItems } from "src/redux/slices/productGroupSlice";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
  dropdownOptions: DropdownOptions;
  productGroupOptions:any

  
};

export type DropdownOptions = {
  productGroupOptions: SelectOption[];
};

export type FieldType = Field<"productGroupOptions">;


const StepAddProductsWrapper = ({ formikProps ,productGroupOptions}: Props) => {
  const dispatch=useDispatch()
   const dropdownOptions: DropdownOptions = {
    productGroupOptions
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
