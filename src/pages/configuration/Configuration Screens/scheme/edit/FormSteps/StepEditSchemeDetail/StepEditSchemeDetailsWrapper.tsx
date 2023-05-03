import React from "react";
import { FormikProps } from "formik";
import { Field, SelectOption } from "src/models/FormField/FormField.model";
import { FormInitialValues } from "../../EditSchemeWrapper";
import StepEditSchemeDetail from "./StepEditScheme";
//import { useGetAllProductSubCategoryQuery, useGetProductCategoryIdSubCategoryQuery } from "src/services/ProductSubCategoryService";

//import { useGetAllProductSubCategoryQuery } from "src/services/ProductSubCategoryService";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
  dropdownOptions: DropdownOptions;
  productCategoryoption: any;
  productSubCategoryOption: any;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

export type DropdownOptions = {
  productCategoryoption: SelectOption[];
  productSubCategoryOption: SelectOption[];
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

const StepEditSchemeDetailsWrapper = ({
  formikProps,
  productCategoryoption,
  productSubCategoryOption,
  setSelectedCategory,
}: Props) => {
  const dropdownOptions = {
    productCategoryoption,
    productSubCategoryOption,
  };

  return (
    <>
      <StepEditSchemeDetail
        formikProps={formikProps}
        formFields={formFields}
        dropdownOptions={dropdownOptions}
        setSelectedCategory={setSelectedCategory}
      />
    </>
  );
};

export default StepEditSchemeDetailsWrapper;
