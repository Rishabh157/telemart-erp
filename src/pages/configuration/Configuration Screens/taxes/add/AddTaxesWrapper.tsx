import React from "react";
import { Formik } from "formik";
import {  object, string } from "yup";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import AddTaxes from "./AddTaxes";

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
    <SideNavLayout>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        {(formikProps) => {
          return <AddTaxes formikProps={formikProps} />;
        }}
      </Formik>
    </SideNavLayout>
  );
};

export default AddTaxesWrapper;
