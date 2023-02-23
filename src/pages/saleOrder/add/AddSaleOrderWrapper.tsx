import React from "react";
import { Formik } from "formik";
import { array, number, object, string } from "yup";
import AddSaleOrder from "./AddSaleOrder";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";

type Props = {};

export type FormInitialValues = {
  sale_order_number: string;
  dealer: string;
  warehouse: string;
  products: {
    product_name: string;
    rate: number | null;
    quantity: number | null;
  }[];
};

const AddSaleOrderWrapper = (props: Props) => {
  // Form Initial Values
  const initialValues: FormInitialValues = {
    sale_order_number: "",
    dealer: "",
    warehouse: "",
    products: [
      {
        product_name: "",
        rate: null,
        quantity: null,
      },
    ],
  };

  // Form Validation Schema
  const validationSchema = object({
    sale_order_number: string().required("Sale order number is required"),
    dealer: string().required("Please select a dealer"),
    warehouse: string().required("Please select a warehouse"),
    products: array().of(
      object().shape({
        product_name: string().required("Please select a product name"),
        rate: number().min(0 , 'Rate must be greater than 0').required("Please enter rate").nullable(),
        quantity: number().min(0 , 'Quantity must be greater than 0').required("Please enter quantity").nullable(),
      })
    ),
  });

  //    Form Submit Handler
  const onSubmitHandler = (values: FormInitialValues) => {
    console.log("onSubmitHandler", values);
  };

  const dropdownOptions = {
    dealerOptions: [{ label: "dealer", value: "dealer" }],
    warehouseOptions: [{ label: "warehouse", value: "warehouse" }],
    productOptions: [{ label: "Group 1", value: "p1" } , { label: "Group 2", value: "p2" } ]
  }

  return (
    <SideNavLayout>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        {(formikProps) => {
          return <AddSaleOrder formikProps={formikProps} dropdownOptions= {dropdownOptions} />;
        }}
      </Formik>
    </SideNavLayout>
  );
};

export default AddSaleOrderWrapper;
