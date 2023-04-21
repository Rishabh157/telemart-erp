import React from "react";
import { Formik } from "formik";
import { number, object, string } from "yup";
import AddCartonBox from "./AddCartonBox";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
import { useAddCartonBoxMutation } from "src/services/CartonBoxService";
import { showToast } from "src/utils";
import { RootState } from "src/redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

type Props = {};

export type FormInitialValues = {
  boxName: string;
  innerItemsCount: number;
  boxWeight: number;
  dimensions: {
    height: number;
    width: number;
    depth: number;
  };
};

const AddCartonBoxWrapper = (props: Props) => {
  const navigate = useNavigate();
  const [addCartonBox] = useAddCartonBoxMutation();
  const { userData } = useSelector((state: RootState) => state?.auth);

  // Form Initial Values
  const initialValues: FormInitialValues = {
    boxName: "",
    innerItemsCount: 0,
    boxWeight: 0,
    dimensions: {
      height: 0,
      width: 0,
      depth: 0,
    },
  };

  // Form Validation Schema
  const validationSchema = object({
    boxName: string().required("boxName is required"),
    innerItemsCount: number().required("Please select a innerItemsCount"),
    boxWeight: number().required("boxWeight is required"),
    dimensions: object().shape({
      height: number().required("Height is required"),
      width: number().required("Width is required"),
      depth: number().required("Depth is required"),
    }),
  });

  //    Form Submit Handler
  const onSubmitHandler = (values: FormInitialValues) => {
    addCartonBox({
      boxName: values.boxName,
      innerItemCount: values.innerItemsCount,
      dimension: values.dimensions,
      boxWeight: values.boxWeight,
      companyId: userData?.companyId || "",
    }).then((res) => {
      if ("data" in res) {
        if (res?.data?.status) {
          showToast("success", "Carton box added successfully!");
          navigate("/configurations/carton-box");
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
          return <AddCartonBox formikProps={formikProps} />;
        }}
      </Formik>
    </ConfigurationLayout>
  );
};

export default AddCartonBoxWrapper;
