import React from "react";
import { Formik } from "formik";
import { object, string } from "yup";
import AddItem from "./AddItem";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
import { useAddItemsMutation } from "src/services/ItemService";
import { showToast } from "src/utils";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";

type Props = {};

export type FormInitialValues = {
  itemCode: string;
  itemName: string;
  itemWeight: string;
  itemImage: string;
};

const AddItemWrapper = (props: Props) => {
  const navigate = useNavigate();
  const [addItem] = useAddItemsMutation();
  const { userData } = useSelector((state: RootState) => state?.auth);

  // Form Initial Values
  const initialValues: FormInitialValues = {
    itemCode: "",
    itemName: "",
    itemWeight: "",
    itemImage: "",
  };

  // Form Validation Schema
  const validationSchema = object({
    itemCode: string().required("Item Code is required"),
    itemName: string().required("Item Name is required"),
    itemWeight: string().required("Item Weight is required"),
    itemImage: string().url().required("Item image is required"),
  });

  //    Form Submit Handler
  const onSubmitHandler = (values: FormInitialValues) => {
    addItem({
      itemCode: values.itemCode,
      itemName: values.itemName,
      itemWeight: values.itemWeight,
      itemImage: values.itemImage,
      companyId: userData?.companyId || "",
    }).then((res) => {
      if ("data" in res) {
        if (res?.data?.status) {
          showToast("success", "Item added successfully!");
          navigate("/configurations/item");
        } else {
          showToast("error", res?.data?.message);
        }
      } else {
        showToast("error", "Something went wrong");
      }
    });
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

export default AddItemWrapper;
