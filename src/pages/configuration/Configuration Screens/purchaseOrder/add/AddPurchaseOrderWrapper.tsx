import React from "react";
import { Formik } from "formik";
import { array, date, number, object, string } from "yup";
import AddPurchaseOrder from "./AddPurchaseOrder";
import { SelectOption } from "src/models/FormField/FormField.model";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";

type Props = {};

export type FormInitialValues = {
  purchase_order_code: string;
  vendor: string;
  warehouse: string;
  items: {
    item_name: string;
    rate: number | null;
    quantity: number | null;
    est_receiving_date: string | null;
  }[];
};

export type DropdownOptions = {
vendorOptions : SelectOption[]
warehouseOptions : SelectOption[]
itemOptions : SelectOption[]
}

const AddPurchaseOrderWrapper = (props: Props) => {
  // Form Initial Values
  const initialValues: FormInitialValues = {
    purchase_order_code: "",
    vendor: "",
    warehouse: "",
    items: [
      {
        item_name: "",
        rate: null,
        quantity: null,
        est_receiving_date: null
      },
    ],
  };

  // Form Validation Schema
  const validationSchema = object({
    purchase_order_code: string().required("Purchase order code is required"),
    vendor: string().required("Please select a vendor"),
    warehouse: string().required("Please select a warehouse"),
    items: array().of(
      object().shape({
        item_name: string().required("Please select a Item"),
        rate: number().min(0 , 'Rate must be greater than 0').required("Please enter rate").nullable(),
        quantity: number().min(0 , 'Quantity must be greater than 0').required("Please enter quantity").nullable(),
        est_receiving_date: date().required("Please select date").nullable(),
      })
    ),
  });

  //    Form Submit Handler
  const onSubmitHandler = (values: FormInitialValues) => {
    console.log("onSubmitHandler", values);
  };

  const dropdownOptions : DropdownOptions = {
    vendorOptions: [{ label: "dealer", value: "dealer" }],
    warehouseOptions: [{ label: "warehouse", value: "warehouse" }],
    itemOptions: [{ label: "Item 1", value: "p1" } , { label: "Item 2", value: "p2" } ]
  }

  return (
    <ConfigurationLayout>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        {(formikProps) => {
          return <AddPurchaseOrder formikProps={formikProps} dropdownOptions= {dropdownOptions} />;
        }}
      </Formik>
    </ConfigurationLayout>
  );
};

export default AddPurchaseOrderWrapper;
