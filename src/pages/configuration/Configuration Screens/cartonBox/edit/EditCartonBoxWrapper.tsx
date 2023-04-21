import React, { useEffect } from "react";
import { Formik } from "formik";
import { number, object, string } from "yup";
import EditCartonBox from "./EditCartonBox";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
import { showToast } from "src/utils";
import { RootState } from "src/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCartonBoxByIdQuery,
  useUpdateCartonBoxMutation,
} from "src/services/CartonBoxService";
import { setSelectedItem } from "src/redux/slices/cartonBoxSlice";

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

const EditCartonBoxWrapper = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const Id = params.id;
  const [EditSelectedCartonBox] = useUpdateCartonBoxMutation();
  const { data, isLoading, isFetching } = useGetCartonBoxByIdQuery(Id);
  const { userData } = useSelector((state: RootState) => state?.auth);
  const { selectedItem }: any = useSelector(
    (state: RootState) => state?.cartonBox
  );

  // Form Initial Values
  const initialValues: FormInitialValues = {
    boxName: selectedItem?.boxName,
    innerItemsCount: selectedItem?.innerItemCount,
    boxWeight: selectedItem?.boxWeight,
    dimensions: {
      height: selectedItem?.dimension?.height,
      width: selectedItem?.dimension?.width,
      depth: selectedItem?.dimension?.depth,
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
    EditSelectedCartonBox({
      body: {
        boxName: values.boxName,
        innerItemCount: values.innerItemsCount,
        dimension: values.dimensions,
        boxWeight: values.boxWeight,
        companyId: userData?.companyId || "",
      },
      id: Id || "",
    }).then((res) => {
      if ("data" in res) {
        if (res?.data?.status) {
          showToast("success", "Updated successfully!");
          navigate("/configurations/carton-box");
        } else {
          showToast("error", res?.data?.message);
        }
      } else {
        showToast("error", "Something went wrong");
      }
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
          return <EditCartonBox formikProps={formikProps} />;
        }}
      </Formik>
    </ConfigurationLayout>
  );
};

export default EditCartonBoxWrapper;
