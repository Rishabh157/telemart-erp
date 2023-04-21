import React, { useEffect } from "react";
import { Formik } from "formik";
import { object, string } from "yup";
import EditItem from "./EditItem";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
// import { useEditItemsMutation } from "src/services/ItemService";
import { showToast } from "src/utils";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import {
  useGetItemsByIdQuery,
  useUpdateItemsMutation,
} from "src/services/ItemService";
import { setSelectedItem } from "src/redux/slices/itemSlice";

type Props = {};

export type FormInitialValues = {
  itemCode: string;
  itemName: string;
  itemWeight: string;
  itemImage: string;
};

const EditItemWrapper = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const Id = params.id;
  const [EditItems] = useUpdateItemsMutation();
  const { userData } = useSelector((state: RootState) => state?.auth);
  const { selectedItem }: any = useSelector((state: RootState) => state?.item);

  const { data, isLoading, isFetching } = useGetItemsByIdQuery(Id);
  // Form Initial Values
  const initialValues: FormInitialValues = {
    itemCode: selectedItem?.itemCode,
    itemName: selectedItem?.itemName,
    itemWeight: selectedItem?.itemWeight,
    itemImage: selectedItem?.itemImage,
  };

  // Form Validation Schema
  const validationSchema = object({
    itemCode: string().required("Item Code is required"),
    itemName: string().required("Item Name is required"),
    itemWeight: string().required("Item Weight is required"),
  });

  //    Form Submit Handler
  const onSubmitHandler = (values: FormInitialValues) => {
    EditItems({
      body: {
        itemCode: values.itemCode,
        itemName: values.itemName,
        itemWeight: values.itemWeight,
        itemImage: values.itemImage,
        companyId: userData?.companyId || "",
      },
      id: Id || "",
    }).then((res) => {
      if ("data" in res) {
        if (res?.data?.status) {
          showToast("success", "Updated successfully!");
          navigate("/configurations/item");
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
          return <EditItem formikProps={formikProps} />;
        }}
      </Formik>
    </ConfigurationLayout>
  );
};

export default EditItemWrapper;
