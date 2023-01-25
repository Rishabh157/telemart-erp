import React from "react";
import { Formik } from "formik";
import {  object, string } from "yup";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import AddCartonBox from "./AddCartonBox";

type Props = {};

export type FormInitialValues = {
  boxName: string;
  innerItemsCount: string;
  boxWeight: string;
};

const AddCartonBoxWrapper = (props: Props) => {
  // Form Initial Values
  const initialValues: FormInitialValues = {
    boxName: "",
    innerItemsCount: "",
    boxWeight: "",
  };

  // Form Validation Schema
  const validationSchema = object({
    boxName: string().required("boxName is required"),
    innerItemsCount: string().required("Please select a innerItemsCount"),
    boxWeight: string().required("boxWeight is required"),
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
          return <AddCartonBox formikProps={formikProps}/>;
        }}
      </Formik>
    </SideNavLayout>
  );
};

export default AddCartonBoxWrapper;
