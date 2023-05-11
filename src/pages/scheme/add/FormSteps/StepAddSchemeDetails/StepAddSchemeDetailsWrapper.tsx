import React, { useEffect } from "react";
import { FormikProps } from "formik";
import { Field } from "src/models/FormField/FormField.model";
import { FormInitialValues } from "../../AddSchemeWrapper";
import StepAddSchemeDetails from "./StepAddSchemeDetails";
//import { useGetAllProductSubCategoryQuery, useGetProductCategoryIdSubCategoryQuery } from "src/services/ProductSubCategoryService";
import { useGetAllProductCategoryQuery } from "src/services/ProductCategoryServices";
import { setAllProductCategory } from "src/redux/slices/productCategorySlice";
//import { useGetAllProductSubCategoryQuery } from "src/services/ProductSubCategoryService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { useGetSubCategoryByParentQuery } from "src/services/ProductSubCategoryService";
import { setAllItems } from "src/redux/slices/productSubCategorySlice";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
};

const formFields: {
  sectionName: string;
  fields: Field<"productCategoryoption" | "productSubCategoryOption">[];
}[] = [
  {
    sectionName: "Scheme Code",
    fields: [
      {
        name: "SchemeCode",
        label: "Scheme code",
        placeholder: "Scheme code",
      },
      {
        name: "Category",
        label: "Category",
        placeholder: "Category",
        type: "select",
        optionAccessKey: "productCategoryoption",
      },
      {
        name: "subCategory",
        label: "Sub Category",
        placeholder: "subCategory",
        type: "select",
        optionAccessKey: "productSubCategoryOption",
      },
      {
        name: "schemeName",
        label: "schemeName",
        placeholder: "Scheme Name",
      },
      {
        name: "schemePrice",
        label: "schemePrice",
        placeholder: "Scheme Price",
      },
      {
        name: "dimension.height",
        label: "Dimensions",
        placeholder: "H",
      },
      {
        name: "dimension.width",
        label: "Dimensions",
        placeholder: "W",
      },
      {
        name: "dimension.depth",
        label: "Dimensions",
        placeholder: "D",
      },
      {
        name: "weight",
        label: "weight",
        placeholder: "weight",
      },
      {
        name: "deliveryCharges",
        label: "deliveryCharges",
        placeholder: "deliveryCharges",
      },
      {
        name: "comboPacking",
        label: "comboPacking",
        placeholder: "comboPacking",
      },
      {
        name: "startDate",
        label: "startDate",
        placeholder: "startDate",
      },
      {
        name: "endDate",
        label: "endDate",
        placeholder: "endDate",
      },
      {
        name: "schemeDescription",
        label: "schemeDescription",
        placeholder: "schemeDescription",
      },
    ],
  },
];

const StepAddSchemeDetailsWrapper = ({ formikProps }: Props) => {
  const dispatch = useDispatch();
  const { allProductCategory }: any = useSelector(
    (state: RootState) => state.productCategory
  );

  const {
    data: dataPC,
    isLoading: isLoadingPC,
    isFetching: isFetchingPC,
  } = useGetAllProductCategoryQuery("");

  useEffect(() => {
    dispatch(setAllProductCategory(dataPC?.data));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingPC, isFetchingPC, dataPC]);

  const productCategoryoption: any = allProductCategory?.map((ele: any) => {
    return {
      label: ele.categoryName,
      value: ele._id,
    };
  });

  const {
    data: ProductScData,
    isLoading: ProductScIsLoading,
    isFetching: ProductScIsFetching,
  } = useGetSubCategoryByParentQuery(formikProps.values.category, {
    skip: !formikProps.values.category,
  });
  useEffect(() => {
    dispatch(setAllItems(ProductScData?.data));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ProductScData, ProductScIsLoading, ProductScIsFetching]);

  const { allItems: productSubCategory }: any = useSelector(
    (state: RootState) => state.productSubCategory
  );

  const productSubCategoryOption: any = productSubCategory?.map((ele: any) => {
    return {
      label: ele.subCategoryName,
      value: ele._id,
    };
  });

  const dropdownOptions = {
    productCategoryoption,
    productSubCategoryOption,
  };

  return (
    <>
      <StepAddSchemeDetails
        formikProps={formikProps}
        formFields={formFields}
        dropdownOptions={dropdownOptions}
      />
    </>
  );
};

export default StepAddSchemeDetailsWrapper;
