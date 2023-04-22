import React, { useState } from "react";
import { Formik } from "formik";
import { array, object, string } from "yup";
import AddASR from "./AddASR";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
import { useAddAsrMutation } from "src/services/AsrService";
import { showToast } from "src/utils";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";

type Props = {};

export type FormInitialValues = {
  asrDetails: {
    productName: string;
    productId: string;
    quantity: number;
  }[];
};

const AddASRWrapper = (props: Props) => {
  const navigate = useNavigate();
  const [addAsr] = useAddAsrMutation();
  const [apiStatus, setApiStatus] = useState<boolean>(false);

  const { userData } = useSelector((state: RootState) => state?.auth);

  // Form Initial Values
  const initialValues: FormInitialValues = {
    asrDetails: [
      {
        productName: "",
        productId: "",
        quantity: 0,
      },
    ],
  };

  // Form Validation Schema
  const validationSchema = object({
    asrDetails: array().of(
      object().shape({
        productName: string().required("Product name is required"),
        quantity: string().required("Quantity is required"),
      })
    ),
  });

  //    Form Submit Handler
  const onSubmitHandler = (values: FormInitialValues) => {
    setApiStatus(true);
    addAsr({
      asrDetails: values.asrDetails,
      companyId: userData?.companyId || "",
    }).then((res) => {
      if ("data" in res) {
        if (res?.data?.status) {
          showToast("success", "Asr added successfully!");
          navigate("/configurations/asr");
        } else {
          showToast("error", res?.data?.message);
        }
      } else {
        showToast("error", "Something went wrong");
      }
      setApiStatus(false);
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
          return <AddASR apiStatus={apiStatus} formikProps={formikProps} />;
        }}
      </Formik>
    </ConfigurationLayout>
  );
};

export default AddASRWrapper;
