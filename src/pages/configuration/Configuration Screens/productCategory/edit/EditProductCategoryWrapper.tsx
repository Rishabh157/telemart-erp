import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { object, string } from "yup";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
import { showToast } from "src/utils";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import {
  useGetProductCategoryByIdQuery,
  useUpdateProductCategoryMutation,
} from "src/services/ProductCategoryServices";
import EditProductCategoryListing from "./EditProductCategoryListing";
import { setSelectedProductCategory } from "src/redux/slices/productCategorySlice";

type Props = {};

export type FormInitialValues = {
  categoryCode: string;
  categoryName: string;
};

const EditProductCategoryWrapper = (props: Props) => {
  // Form Initial Values
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const Id = params.id;
  const { selectedProductCategory }: any = useSelector(
    (state: RootState) => state.productCategory
  );
  const { userData } = useSelector((state: RootState) => state?.auth);
  const [apiStatus, setApiStatus] = useState<boolean>(false);
  const [EditPrductCategory] = useUpdateProductCategoryMutation();

  const { data, isLoading } = useGetProductCategoryByIdQuery(Id);

  const initialValues: FormInitialValues = {
    categoryCode: selectedProductCategory?.categoryCode || "",
    categoryName: selectedProductCategory?.categoryName || "",
  };

  // Form Validation Schema
  const validationSchema = object({
    categoryCode: string().required("Category Type is required"),
    categoryName: string().required("Category Name is required"),
  });

  //    Form Submit Handler
  const onSubmitHandler = (values: FormInitialValues) => {
    setApiStatus(true);

    setTimeout(() => {
      EditPrductCategory({
        body: {
          categoryCode: values.categoryCode,
          categoryName: values.categoryName,
          companyId: userData?.companyId || "",
        },
        id: Id || "",
      }).then((res) => {
        if ("data" in res) {
          if (res?.data?.status) {
            showToast("success", "Product-category updated successfully!");
            navigate("/configurations/product-category");
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

  useEffect(() => {
    dispatch(setSelectedProductCategory(data?.data));
  }, [dispatch, data, isLoading]);
  return (
    <ConfigurationLayout>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        {(formikProps) => {
          return (
            <EditProductCategoryListing
              apiStatus={apiStatus}
              formikProps={formikProps}
            />
          );
        }}
      </Formik>
    </ConfigurationLayout>
  );
};

export default EditProductCategoryWrapper;
