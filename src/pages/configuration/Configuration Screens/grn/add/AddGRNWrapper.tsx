import React from "react";
import { Formik } from "formik";
import { array, number, object } from "yup";
import AddItem from "./AddGRN";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";

type Props = {};

export type FormInitialValues = {
  items: {
    recievedQuantity: number | null;
    goodQuantity: number | null;
    defectiveQuantity: number | null;
  }[];
};

const AddGRNWrapper = (props: Props) => {
  // Form Initial Values
  const initialValues: FormInitialValues = {
    items: [
      {
        recievedQuantity: null,
        goodQuantity: null,
        defectiveQuantity: null
      },
    ],
  };

  // Form Validation Schema
  const validationSchema = object({
    items: array().of(
      object().shape({
        recievedQuantity: number().min(0 , 'Recieved Quantity must be greater than 0').required("Please enter Recieved Quantity").nullable(),
        goodQuantity: number().min(0 , 'Good Quantity must be greater than 0').required("Please enter Good Quantity").nullable(),
        defectiveQuantity:number().min(0 , 'Defective Quantity must be greater than 0').required("Please enter Defective Quantity").nullable(),
      })
    ),
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
          return <AddItem formikProps={formikProps} />;
        }}
      </Formik>
    </ConfigurationLayout>
  );
};

export default AddGRNWrapper;
