import React from "react";
import { Formik } from "formik";
import {  object, string } from "yup";
import AddDealersCategory from "./AddDealersCategory";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";

type Props = {};

export type FormInitialValues = {
  dealersCategory: string;
  investAmount: string;
  noOfOrders: string;
  deliveryPercantage : string;
};

const AddDealersCategoryWrapper = (props: Props) => {
  // Form Initial Values
  const initialValues: FormInitialValues = {
    dealersCategory: "",
    investAmount: "",
    noOfOrders: "",
    deliveryPercantage :"",
  };

  // Form Validation Schema
  const validationSchema = object({
    dealersCategory: string().required("Dealers Category is required"),
    investAmount: string().required(" Invest Amount is required"),
    noOfOrders: string().required("No Of Orders is required"),
    deliveryPercantage: string().required("No Of Orders is required"),

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
          return <AddDealersCategory formikProps={formikProps}  />;
        }}
      </Formik>
    </ConfigurationLayout>
  );
};

export default AddDealersCategoryWrapper;
