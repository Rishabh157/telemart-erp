import React,{useState}from "react";
import { Formik } from "formik";
import { object, string } from "yup";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
import AddProductGroup from "./AddProductGroup";
import { useNavigate } from "react-router-dom";
import { useAddProductGroupMutation } from "src/services/ProductGroupService";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { showToast } from "src/utils";

type Props = {};

export type FormInitialValues = {
  groupName: string;
};

const AddProductGroupWrapper = (props: Props) => {
  // Form Initial Values
  const [apiStatus, setApiStatus] = useState<boolean>(false);

  const navigate = useNavigate();
  const[addProductGroup]=useAddProductGroupMutation()
  const { userData } = useSelector((state: RootState) => state?.auth);

  const initialValues: FormInitialValues = {
    groupName: "",
  };

  // Form Validation Schema
  const validationSchema = object({
    groupName: string().required("Group Name is required"),
  });

  //    Form Submit Handler
  const onSubmitHandler = (values: FormInitialValues) => { 
    console.log("onSubmitHandler", values);
    setApiStatus(true)
  
    setTimeout(() => {
      addProductGroup({
        groupName:values.groupName,
        companyId: userData?.companyId || "",
        
      }).then((res:any) => {
        if ("data" in res) {
          if (res?.data?.status) {
            showToast("success", "Product-category added successfully!");
            navigate("/configurations/product-group");
          } else {
            showToast("error", res?.data?.message);
          }
        } else {
          showToast("error", "Something went wrong");
        }
        setApiStatus(false)
      });
    }, 1000);
  };
  
  return (
    <ConfigurationLayout>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        {(formikProps) => {
          return <AddProductGroup apiStatus={apiStatus} formikProps={formikProps} />;
        }}
      </Formik>
    </ConfigurationLayout>
  );
};

export default AddProductGroupWrapper;
