import React from "react";
import { Formik } from "formik";
import { array, object, string } from "yup";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import AddLanguage from "./AddLanguage";

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
    <SideNavLayout>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        {(formikProps) => {
          return <AddLanguage formikProps={formikProps} />;
        }}
      </Formik>
    </SideNavLayout>
  );
};

export default AddLanguageWrapper;
