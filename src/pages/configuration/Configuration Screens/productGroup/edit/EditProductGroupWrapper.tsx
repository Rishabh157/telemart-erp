import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { array, number, object, string } from "yup";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
import { showToast } from "src/utils";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { setSelectedProductGroup } from "src/redux/slices/productGroupSlice";
import {
  useGetProductGroupByIdQuery,
  useUpdateProductGroupMutation,
} from "src/services/ProductGroupService";
import EditProductGroupListing from "./EditProductGroupListing";

type Props = {};

export type FormInitialValues = {
  groupName: string;
  tax: {
   taxName:string;
   taxPercent:number;
  }[];

};

const EditProductGroupWrapper = (props: Props) => {
  // Form Initial Values
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const Id = params.id;
  const { selectedProductGroup }: any = useSelector(
    (state: RootState) => state.productGroup
  );
  const { userData } = useSelector((state: RootState) => state?.auth);

  const [EditProductGroup] = useUpdateProductGroupMutation();
  const [apiStatus, setApiStatus] = useState<boolean>(false);

  const { data, isLoading } = useGetProductGroupByIdQuery(Id);
  // ?.map((ele: any) => {
  //   return {
  //     taxDetail: { tax_name: ele?.taxName },
  //     tax_rate: ele?.taxPercent,
  //   };
  // }),

  const initialValues: FormInitialValues = {
    groupName: selectedProductGroup?.groupName || "",

    tax: selectedProductGroup?.tax || "",

  };

  // Form Validation Schema
  const validationSchema = object({
    groupName: string().required("Group Name is required"),
      tax: array().of(
        object().shape({
  
          taxName: string().required("Please select item name"),
          taxPercent: number().typeError("Tax rate should be a number").required("Please enter tax rate"),
        })
      ),
    })


  //    Form Submit Handler
  const onSubmitHandler = (values: FormInitialValues) => {
    const taxData = values.tax.map((ele) => {
      return { taxPercent: ele.taxPercent ,taxName:ele.taxName};
    });
    setApiStatus(true);
    setTimeout(() => {
      EditProductGroup({
        body: {
          groupName: values.groupName,
          tax: taxData,
          companyId: userData?.companyId || "",
        },
        id: Id || "",
      }).then((res: any) => {
        if ("data" in res) {
          if (res?.data?.status) {
            showToast("success", "Product-Group updated successfully!");
            navigate("/configurations/product-group");
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
    dispatch(setSelectedProductGroup(data?.data));
   
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
            <EditProductGroupListing
              apiStatus={apiStatus}
              formikProps={formikProps}
            />
          );
        }}
      </Formik>
    </ConfigurationLayout>
  );
};

export default EditProductGroupWrapper;
