import React from "react";
import { Formik } from "formik";
import {  object, string } from "yup";
import AddAttribute from "./AddAttribute";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";

type Props = {};

export type FormInitialValues = {
  attributeType: string;
  attributeName: string;
};

const AddAttributeWrapper = (props: Props) => {
  // Form Initial Values
  const initialValues: FormInitialValues = {
    attributeType: "",
    attributeName: "",
  };

  // Form Validation Schema
  const validationSchema = object({
    attributeType: string().required("Attribute Type is required"),
    attributeName: string().required("Attribute Name is required"),
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
          return <AddAttribute formikProps={formikProps}  />;
        }}
      </Formik>
    </ConfigurationLayout>
  );
};

export default AddAttributeWrapper;
