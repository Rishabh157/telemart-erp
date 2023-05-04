import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { array, object, string } from "yup";
import AddASR from "./AddASR";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { useAddAsrMutation } from "src/services/AsrService";
import { showToast } from "src/utils";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { useGetAllProductGroupQuery } from "src/services/ProductGroupService";
import { setItems } from "src/redux/slices/productGroupSlice";

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
  const dispatch = useDispatch();
  const [addAsr] = useAddAsrMutation();
  const [apiStatus, setApiStatus] = useState<boolean>(false);
  const { data, isLoading, isFetching } = useGetAllProductGroupQuery("");
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
          navigate("/asr");
        } else {
          showToast("error", res?.data?.message);
        }
      } else {
        showToast("error", "Something went wrong");
      }
      setApiStatus(false);
    });
  };

  useEffect(() => {
    dispatch(setItems(data?.data));
  }, [dispatch, data, isLoading, isFetching]);

  return (
    <SideNavLayout>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        {(formikProps) => {
          return <AddASR apiStatus={apiStatus} formikProps={formikProps} />;
        }}
      </Formik>
    </SideNavLayout>
  );
};

export default AddASRWrapper;
