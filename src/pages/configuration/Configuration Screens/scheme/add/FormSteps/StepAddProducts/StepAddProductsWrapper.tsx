import React, { useEffect } from "react";
import { FormikProps } from "formik";
import { Field, SelectOption } from "src/models/FormField/FormField.model";
import { FormInitialValues } from "../../AddSchemeWrapper";
import StepAddProducts from "./StepAddProducts";
import { useGetAllProductGroupQuery } from "src/services/ProductGroupService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { setAllProductGroup } from "src/redux/slices/productGroupSlice";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
  productGroupOption:any[]
};

export type DropdownOptions = {
  productGroupOptions: SelectOption[];
};

export type FieldType = Field<"productGroupOptions">;


const StepAddProductsWrapper = ({ formikProps }: Props) => {
  const dispatch=useDispatch()
  const {data ,isLoading ,isFetching}=useGetAllProductGroupQuery("")
  const {allProductGroup}:any=useSelector((state:RootState)=>state.productGroup)
  
  const productGroupOptions=allProductGroup.map((ele:any)=>{
    return({
      label:ele.groupName,
      value:ele._id
    })
  })
   
  useEffect(()=>{
    dispatch(setAllProductGroup(data?.data))
  },[data, dispatch ,isLoading ,isFetching])
  
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
