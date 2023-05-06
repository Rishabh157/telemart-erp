/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Formik } from "formik";
import { array, date, number, object, string } from "yup";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import ViewPurchaseOrder from "./ViewPurchaseOrder";
import { useParams } from "react-router-dom";
import { useGetPurchaseOrderByIdQuery } from "src/services/PurchaseOrderService";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedItems } from "src/redux/slices/PurchaseOrderSlice";
import { RootState } from "src/redux/store";

type Props = {};

export type FormInitialValues = {
  poCode: string;
  vendor: string;
  wareHouse: string;
  purchaseOrder: {
    itemId: string;
    itemName: string;
    rate: number;
    quantity: number;
    estReceivingDate: string;
  }[];
};

const ViewPurchaseOrderWrapper = (props: Props) => {
  // Form Initial Values
  const params = useParams();
  const dispatch = useDispatch();
  const Id = params.id;
  const { data, isLoading, isFetching } = useGetPurchaseOrderByIdQuery(Id);
  const { selectedItems }: any = useSelector(
    (state: RootState) => state?.purchaseOrder
  );
  useEffect(() => {
    dispatch(setSelectedItems(data?.data));
  }, [data, isLoading, isFetching, dispatch]);

  const initialValues: FormInitialValues = {
    poCode: selectedItems?.poCode || "",
    vendor: selectedItems?.vendorLabel || "",
    wareHouse: selectedItems?.warehouseLabel || "",
    purchaseOrder: selectedItems?.purchaseOrder || [],
  };

  // Form Validation Schema
  const validationSchema = object({
    poCode: string().required("Purchase order code is required"),
    vendor: string().required("Please select a vendor"),
    wareHouse: string().required("Please select a warehouse"),
    purchaseOrder: array().of(
      object().shape({
        itemId: string().required("required"),
        itemName: string().required("required"),

        rate: number()
          .min(0, "Rate must be greater than 0")
          .required("Please enter rate"),
        quantity: number()
          .min(0, "Quantity must be greater than 0")
          .required("Please enter quantity"),
        estReceivingDate: date().required("Please select date"),
      })
    ),
  });

  //    Form Submit Handler
  const onSubmitHandler = (values: FormInitialValues) => {};

  return (
    <SideNavLayout>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        {(formikProps) => {
          return <ViewPurchaseOrder formikProps={formikProps} />;
        }}
      </Formik>
    </SideNavLayout>
  );
};
export default ViewPurchaseOrderWrapper;
