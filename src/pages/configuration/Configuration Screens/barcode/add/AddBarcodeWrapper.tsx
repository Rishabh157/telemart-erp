import React from "react";
import { Formik } from "formik";
import { object, string } from "yup";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
import AddBarcode from "./AddBarcode";

type Props = {};

export type FormInitialValues = {
  productGroup: string;
  quantity: string;
};

const AddBarcodeWrapper = (props: Props) => {
  // Form Initial Values
  const initialValues: FormInitialValues = {
    productGroup: "",
    quantity: "",
  };

  // Form Validation Schema
  const validationSchema = object({
    productGroup: string().required("Group Name is required"),
    quantity: string().required("Quantity is required"),
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
          return <AddBarcode formikProps={formikProps} />;
        }}
      </Formik>
    </ConfigurationLayout>
  );
};

export default AddBarcodeWrapper;
