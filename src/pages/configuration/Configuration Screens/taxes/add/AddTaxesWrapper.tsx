import React from "react";
import { Formik } from "formik";
import {  object, string } from "yup";
import AddTaxes from "./AddTaxes";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";

type Props = {};
 
export type FormInitialValues = {
  taxName: string;
};

const AddTaxesWrapper = (props: Props) => {
  // Form Initial Values
  const initialValues: FormInitialValues = {
    taxName: "",
  };

  // Form Validation Schema
  const validationSchema = object({
    taxName: string().required("taxName is required"),
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
          return <AddTaxes formikProps={formikProps} />;
        }}
      </Formik>
    </ConfigurationLayout>
  );
};

export default AddTaxesWrapper;
