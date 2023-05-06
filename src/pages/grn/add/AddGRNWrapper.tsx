import React, { useState } from "react";
import { Formik } from "formik";
import { array, number, object } from "yup";
import AddItem from "./AddGRN";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useAddGRNMutation } from "src/services/GRNService";
import { showToast } from "src/utils";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";

type Props = {};

export type FormInitialValues = {
  poCode: string;
  itemId: string;
  receivedQuantity: number;
  goodQuantity: number;
  defectiveQuantity: number;
  companyId: string;
};

const AddGRNWrapper = (props: Props) => {
  const navigate = useNavigate();

  const [addGRN] = useAddGRNMutation();
  const { state } = useLocation();
  const { poCode, itemName, companyId, itemId } = state;

  const { userData } = useSelector((state: RootState) => state?.auth);
  const [apiStatus, setApiStatus] = useState(false);
  // Form Initial Values
  const initialValues: FormInitialValues = {
    poCode: poCode,
    itemId: itemId,
    companyId: companyId,
    receivedQuantity: 0,
    goodQuantity: 0,
    defectiveQuantity: 0,
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
    setApiStatus(true);
    setTimeout(() => {
      addGRN({
        poCode: values.poCode,
        itemId: values.itemId,
        defectiveQuantity: values.defectiveQuantity,
        goodQuantity: values.goodQuantity,
        receivedQuantity: values.receivedQuantity,
        companyId: values.companyId,
      }).then((res) => {
        if ("data" in res) {
          if (res?.data?.status) {
            showToast("success", "GRN added successfully!");
            navigate("/grn");
          } else {
            showToast("error", res?.data?.message);
          }
        } else {
          showToast("error", "Something went wrong");
        }
        setApiStatus(false);
      });
    }, 1000);
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
