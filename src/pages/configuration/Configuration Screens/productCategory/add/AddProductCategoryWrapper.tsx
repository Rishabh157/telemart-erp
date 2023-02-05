import React from "react";
import { Formik } from "formik";
import {  object, string } from "yup";
import AddProductCategory from "./AddProductCategory";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";

type Props = {};

export type FormInitialValues = {
  categoryCode: string;
  categoryName: string;
};

const AddProductCategoryWrapper = (props: Props) => {
  // Form Initial Values
  const initialValues: FormInitialValues = {
    categoryCode: "",
    categoryName: "",
  };

  // Form Validation Schema
  const validationSchema = object({
    categoryCode: string().required("Category Type is required"),
    categoryName: string().required("Category Name is required"),
  });

  //    Form Submit Handler
  const onSubmitHandler = (values: FormInitialValues) => {
    console.log("onSubmitHandler", values);
  };
  return (
    <ConfigurationLayout>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        {(formikProps) => {
          return <AddProductCategory formikProps={formikProps}  />;
        }}
      </Formik>
    </ConfigurationLayout>
  );
};

export default AddProductCategoryWrapper
