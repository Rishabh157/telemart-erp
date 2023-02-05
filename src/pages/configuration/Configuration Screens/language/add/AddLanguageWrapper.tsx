import React from "react";
import { Formik } from "formik";
import { object, string } from "yup";
import AddLanguage from "./AddLanguage";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";

type Props = {};

export type FormInitialValues = {
  languageName: string;
};

const AddLanguageWrapper = (props: Props) => {
  // Form Initial Values
  const initialValues: FormInitialValues = {
    languageName: "",
  };

  // Form Validation Schema
  const validationSchema = object({
    languageName: string().required("Language Name is required"),
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
          return <AddLanguage formikProps={formikProps} />;
        }}
      </Formik>
    </ConfigurationLayout>
  );
};

export default AddLanguageWrapper;
