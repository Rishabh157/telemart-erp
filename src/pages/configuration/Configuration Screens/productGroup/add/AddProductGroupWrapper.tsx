import React,{useState,useEffect}from "react";
import { Formik } from "formik";
import { array, number, object, string } from "yup";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
import AddProductGroup from "./AddProductGroup";
import { useNavigate } from "react-router-dom";
import { useAddProductGroupMutation } from "src/services/ProductGroupService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { showToast } from "src/utils";
import { useGetAllTaxesQuery } from "src/services/TaxesService";
import { setAllTaxes } from "src/redux/slices/TaxesSlice";

type Props = {};

export type FormInitialValues = {
  groupName: string;
  tax: {
    taxName: string;
    taxPercent: number;
  }[];
};

const AddProductGroupWrapper = (props: Props) => {
  // Form Initial Values
  const [apiStatus, setApiStatus] = useState<boolean>(false);
  const dispatch=useDispatch()
  const [taxStatus, setTaxStatus] = useState(false);

  const navigate = useNavigate();
  const[addProductGroup]=useAddProductGroupMutation()
  const { userData } = useSelector((state: RootState) => state?.auth);
  const { allTaxes: taxData }: any = useSelector(
    (state: RootState) => state?.tax
  );
  console.log(taxData)
  const { data, isLoading, isFetching } = useGetAllTaxesQuery("");
  useEffect(() => {
    if (!isLoading && !isFetching) {
      setTaxStatus(true);
      dispatch(setAllTaxes(data?.data));
    }
  },[data, isLoading, isFetching ,dispatch])

  const allTaxes = taxData?.map((ele: any) => {
    return { taxName: ele?.taxName ,taxPercent:0};
  });

  // allTaxes?.map((tax: any) => ({
  //   tax_name: tax,
  //   tax_rate: 0,
  // })),
  
  const initialValues: FormInitialValues = {
    groupName: "",
    tax: allTaxes
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
      return {  taxPercent: ele.taxPercent,  taxName:ele.taxName };
    });
   
    setApiStatus(true)
  
    setTimeout(() => {
      addProductGroup({
        groupName:values.groupName,
        tax: taxData,
        companyId: userData?.companyId || "",
        
      }).then((res:any) => {
        if ("data" in res) {
          if (res?.data?.status) {
            showToast("success", "Product-Group added successfully!");
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
    {taxStatus ? (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        {(formikProps) => {
          return <AddProductGroup apiStatus={apiStatus} formikProps={formikProps} />;
        }}
      </Formik>
    ): null}
    </ConfigurationLayout>
  );
};

export default AddProductGroupWrapper;
