import React from "react";
import { Formik } from "formik";
import { array, object, string } from "yup";
import AddAttributeGroup from "./AddAttributeGroup";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";

type Props = {};

export type FormInitialValues = {
  group_name: string;
  attributes: { label: string; value: string }[];
};

const AddAttributeGroupWrapper = (props: Props) => {
  
  // Form Initial Values
  const initialValues: FormInitialValues = {
    group_name: "",
    attributes: [],
  };

  // Form Validation Schema
  const validationSchema = object({
    group_name: string().required("Group name is required"),
    attributes: array().of(
      object().shape({
        label: string().required(),
        value: string().required(),
      })
    ).min(1 , 'Please select atleast 1 attribute group'),
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
          return (
            <AddAttributeGroup
              formikProps={formikProps}
            />
          );
        }}
      </Formik>
    </ConfigurationLayout>
  );
};

export default AddAttributeGroupWrapper;
