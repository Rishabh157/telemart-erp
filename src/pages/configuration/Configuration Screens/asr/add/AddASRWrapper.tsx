import React from "react";
import { Formik } from "formik";
import { array, object, string } from "yup";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import AddASR from "./AddASR";

type Props = {};

export type FormInitialValues = {
  asr_details: {
    product_name: string;
    quantity: string;
  }[];
};

const AddASRWrapper = (props: Props) => {
    
  // Form Initial Values
  const initialValues: FormInitialValues = {
    asr_details: [
      {
        product_name: "",
        quantity: "",
      },
    ],
  };

  // Form Validation Schema
  const validationSchema = object({
    asr_details: array().of(
      object().shape({
        product_name: string().required("Product name is required"),
        quantity: string().required("Quantity is required"),
      })
    ),
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
          return <AddASR formikProps={formikProps} />;
        }}
      </Formik>
    </SideNavLayout>
  );
};

export default AddASRWrapper;
