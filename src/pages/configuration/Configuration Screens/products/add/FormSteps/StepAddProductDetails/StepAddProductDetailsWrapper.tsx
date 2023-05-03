/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { FormikProps } from "formik";
import { Field } from "src/models/FormField/FormField.model";
import { FormInitialValues } from "../../AddProductWrapper";
import StepAddProductDetails from "./StepAddProductDetails";
import { useGetAllProductCategoryQuery } from "src/services/ProductCategoryServices";
import { useDispatch, useSelector } from "react-redux";
import { setAllProductCategory } from "src/redux/slices/productCategorySlice";
import { RootState } from "src/redux/store";
import { useGetSubCategoryByParentQuery } from "src/services/ProductSubCategoryService";
import { setAllItems } from "src/redux/slices/productSubCategorySlice";
import { useGetAllProductGroupQuery } from "src/services/ProductGroupService";
import { setAllItems as setAllProductGroup } from "src/redux/slices/productGroupSlice";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
};

export type FieldType = Field<
  "productSubCategoryOPtions" | "productCategoryOPtions"
>;
const StepAddProductDetailsWrapper = ({ formikProps }: Props) => {
  const dispatch = useDispatch();
  const { allProductCategory }: any = useSelector(
    (state: RootState) => state?.productCategory
  );
  const { allItems: productSubCategory }: any = useSelector(
    (state: RootState) => state?.productSubCategory
  );
  const { allItems: productGroup }: any = useSelector(
    (state: RootState) => state?.productGroup
  );

  const {
    data: pcData,
    isLoading: pcIsLoading,
    isFetching: pcIsFetching,
  } = useGetAllProductCategoryQuery("");

  const {
    data: pscData,
    isLoading: pscIsLoading,
    isFetching: pscIsFetching,
  } = useGetSubCategoryByParentQuery(formikProps.values.product_category, {
    skip: !formikProps.values.product_category,
  });

  const {
    data: pgData,
    isLoading: pgIsLoading,
    isFetching: pgIsFetching,
  } = useGetAllProductGroupQuery("");

  useEffect(() => {
    dispatch(setAllProductCategory(pcData?.data));
  }, [pcData, pcIsLoading, pcIsFetching]);

  useEffect(() => {
    dispatch(setAllItems(pscData?.data));
  }, [pscData, pscIsLoading, pscIsFetching]);

  useEffect(() => {
    dispatch(setAllProductGroup(pgData?.data));
  }, [pgData, pgIsLoading, pgIsFetching]);

  const productCategoryOPtions = allProductCategory?.map((ele: any) => {
    return { label: ele?.categoryName, value: ele?._id };
  });

  const productSubCategoryOPtions = productSubCategory?.map((ele: any) => {
    return { label: ele?.subCategoryName, value: ele?._id };
  });

  const productGroupOPtions = productGroup?.map((ele: any) => {
    return { label: ele?.groupName, value: ele?._id };
  });

  const dropdownOptions = {
    productSubCategoryOPtions,
    productCategoryOPtions,
    productGroupOPtions,
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
