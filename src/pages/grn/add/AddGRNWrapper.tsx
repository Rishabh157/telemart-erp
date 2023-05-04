import React from "react";
import { Formik } from "formik";
import { array, number, object } from "yup";
import AddItem from "./AddGRN";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";

type Props = {};

export type FormInitialValues = {
  items: {
    recievedQuantity: string ;
    goodQuantity: string ;
    defectiveQuantity: string ;
  }[];
};

const AddGRNWrapper = (props: Props) => {
  // Form Initial Values
  const initialValues: FormInitialValues = {
    items: [
      {
        recievedQuantity: "",
        goodQuantity: "",
        defectiveQuantity: "",
      },
    ],
  };

  // Form Validation Schema
  const validationSchema = object({
    items: array().of(
      object().shape({
        recievedQuantity: number()
          .min(0, "Recieved Quantity must be greater than 0")
          .required("Please enter Recieved Quantity")
          .nullable(),
        goodQuantity: number()
          .min(0, "Good Quantity must be greater than 0")
          .required("Please enter Good Quantity")
          .nullable(),
        defectiveQuantity: number()
          .min(0, "Defective Quantity must be greater than 0")
          .required("Please enter Defective Quantity")
          .nullable(),
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
          return <AddItem formikProps={formikProps} />;
        }}
      </Formik>
    </SideNavLayout>
  );
};

export default AddGRNWrapper;
