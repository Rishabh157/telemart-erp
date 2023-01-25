import React from "react";
import { Formik } from "formik";
import { object, string } from "yup";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import AddProductSubCategory from "./AddProductSubCategory";

type Props = {};

export type FormInitialValues = {
  subCategoryCode: string;
  subCategoryName: string;
  parentCategory: string;
  applicableTaxes: string;
  hsnCode: string;
};

const AddProductSubCategoryWrapper = (props: Props) => {
  // Form Initial Values
  const initialValues: FormInitialValues = {
    subCategoryCode: "",
    subCategoryName: "",
    parentCategory: "",
    applicableTaxes:"",
    hsnCode :"",
    
  };

  // Form Validation Schema
  const validationSchema = object({
    subCategoryCode: string().required("Sub Category Code is required"),
    subCategoryName: string().required("Please select a Sub Category Name"),
    parentCategory: string().required("Please select a Parent Category"),
    applicableTaxes : string().required("Please select a Applicable Tax"),
    hsnCode : string().required(" HSN Code is required")

  });

  //    Form Submit Handler
  const onSubmitHandler = (values: FormInitialValues) => {
    console.log("onSubmitHandler", values);
  };

  // const dropdownOptions = {
  //   subCategoryNameOptions: [{ label: "dealer", value: "dealer" }],
  //   parentCategory: [{ label: "dealer", value: "dealer" }],
  //   applicableTaxes: [{ label: "dealer", value: "dealer" }],
  // }

  return (
    <SideNavLayout>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        {(formikProps) => {
          return <AddProductSubCategory formikProps={formikProps}  />;
        }}
      </Formik>
    </SideNavLayout>
  );
};

export default AddProductSubCategoryWrapper;
