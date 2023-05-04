import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { object, string } from "yup";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
import AddBarcode from "./AddBarcode";
import { useAddBarcodeMutation } from "src/services/BarcodeService";
import { showToast } from "src/utils";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { v4 as uuidv4 } from "uuid";
import { useGetAllProductGroupQuery } from "src/services/ProductGroupService";
import { setAllItems } from "src/redux/slices/productGroupSlice";

type Props = {};

export type FormInitialValues = {
  productGroup: string;
  quantity: string;
};

const AddBarcodeWrapper = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [apiStatus, setApiStatus] = useState(false);
  const { userData } = useSelector((state: RootState) => state?.auth);
  const { allItems }: any = useSelector(
    (state: RootState) => state?.productGroup
  );

  const [addBarcode] = useAddBarcodeMutation();
  const {
    data: productGroupData,
    isLoading: pgIsLoading,
    isFetching: pgIsFetching,
  } = useGetAllProductGroupQuery("");

  useEffect(() => {
    dispatch(setAllItems(productGroupData?.data));
  }, [dispatch, productGroupData, pgIsLoading, pgIsFetching]);

  // Form Initial Values
  const initialValues: FormInitialValues = {
    productGroup: "",
    quantity: "",
  };

  // Form Validation Schema
  const validationSchema = object({
    productGroup: string().required("Group Name is required"),
    quantity: string().required("Quantity is required"),
  });

  //    Form Submit Handler
  const onSubmitHandler = async (values: FormInitialValues) => {
    setApiStatus(true);
    const promises = [];
    for (let i = 0; i < Number(values?.quantity); i++) {
      const uniqueId = uuidv4();
      promises.push(
        addBarcode({
          productGroup: values.productGroup,
          barcodeNumber: uniqueId,
          companyId: userData?.companyId || "",
        })
      );
    }
    await Promise.all(promises); // Wait for all promises to complete
    setApiStatus(false);
    navigate("/configurations/barcode");
    showToast("success", "Barcodes added successfully!");
  };
  const productGroupOption = allItems?.map((ele: any) => {
    return { label: ele?.groupName, value: ele?._id };
  });

  return (
    <ConfigurationLayout>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        {(formikProps) => {
          return (
            <AddBarcode
              formikProps={formikProps}
              apiStatus={apiStatus}
              productGroupOption={productGroupOption}
            />
          );
        }}
      </Formik>
    </ConfigurationLayout>
  );
};

export default AddBarcodeWrapper;
