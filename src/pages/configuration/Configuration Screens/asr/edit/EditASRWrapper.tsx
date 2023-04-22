import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { array, object, string } from "yup";
import EditASR from "./EditASR";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
import { showToast } from "src/utils";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import {
  useGetAsrByIdQuery,
  useUpdateAsrMutation,
} from "src/services/AsrService";
import { setSelectedItem } from "src/redux/slices/ASRSlice";

type Props = {};

export type FormInitialValues = {
  asrDetails: {
    productName: string;
    productId: string;
    quantity: number;
  }[];
};

const EditASRWrapper = (props: Props) => {
  const params = useParams();
  const Id = params.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [apiStatus, setApiStatus] = useState<boolean>(false);

  const [editAsr] = useUpdateAsrMutation();
  const { data, isLoading, isFetching } = useGetAsrByIdQuery(Id);
  const { userData } = useSelector((state: RootState) => state?.auth);
  const { selectedItem }: any = useSelector((state: RootState) => state?.asr);

  // Form Initial Values
  const initialValues: FormInitialValues = {
    asrDetails: selectedItem?.asrDetails,
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
    const asrDetails = values.asrDetails.map((ele: any) => {
      const { _id, ...rest } = ele; // use object destructuring to remove the _id property
      return rest; // return the new object without the _id property
    });
    editAsr({
      body: {
        asrDetails: asrDetails,
        companyId: userData?.companyId || "",
      },
      id: Id || "",
    }).then((res) => {
      if ("data" in res) {
        if (res?.data?.status) {
          showToast("success", "Updated successfully!");
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

  useEffect(() => {
    dispatch(setSelectedItem(data?.data));
  }, [dispatch, data, isLoading, isFetching]);
  return (
    <ConfigurationLayout>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        {(formikProps) => {
          return <EditASR apiStatus={apiStatus} formikProps={formikProps} />;
        }}
      </Formik>
    </ConfigurationLayout>
  );
};

export default EditASRWrapper;
