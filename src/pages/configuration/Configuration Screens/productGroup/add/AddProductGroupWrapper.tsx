import React from "react";
import { Formik } from "formik";
import { object, string } from "yup";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
import AddProductGroup from "./AddProductGroup";

type Props = {};

export type FormInitialValues = {
  productGroupName: string;
};

const AddProductGroupWrapper = (props: Props) => {
  // Form Initial Values
  const initialValues: FormInitialValues = {
    productGroupName: "",
  };

  // Form Validation Schema
  const validationSchema = object({
    productGroupName: string().required("Group Name is required"),
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
          return <AddProductGroup formikProps={formikProps} />;
        }}
      </Formik>
    </ConfigurationLayout>
  );
};

export default AddProductGroupWrapper;
