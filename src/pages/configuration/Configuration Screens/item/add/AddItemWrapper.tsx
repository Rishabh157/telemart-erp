import React from "react";
import { Formik } from "formik";
import { array, object, string } from "yup";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import AddItem from "./AddItem";

type Props = {};

export type FormInitialValues = {
  itemCode: string;
  itemName: string;
  itemWeight: string;
  itemCategory: string;
  itemSubCategory: string;
};

const AddItemWrapper = (props: Props) => {
  // Form Initial Values
  const initialValues: FormInitialValues = {
    itemCode: "",
    itemName: "",
    itemWeight: "",
    itemCategory: "",
    itemSubCategory: "",
  };

  // Form Validation Schema
  const validationSchema = object({
    itemCode: string().required("Item Code is required"),
    itemName: string().required("Item Name is required"),
    itemWeight: string().required("Item Weight is required"),
    itemCategory:  string().required("Item Category is required"),
    itemSubCategory:  string().required("Item Sub Category is required"),
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

export default AddItemWrapper;
