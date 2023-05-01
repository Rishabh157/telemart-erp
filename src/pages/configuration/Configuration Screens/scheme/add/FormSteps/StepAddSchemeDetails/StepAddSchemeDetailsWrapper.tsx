import React,{useEffect} from "react";
import { FormikProps } from "formik";
import { Field, SelectOption } from "src/models/FormField/FormField.model";
import { FormInitialValues } from "../../AddSchemeWrapper";
import StepAddSchemeDetails from "./StepAddSchemeDetails";
//import { useGetAllProductSubCategoryQuery, useGetProductCategoryIdSubCategoryQuery } from "src/services/ProductSubCategoryService";
import { useGetAllProductCategoryQuery } from "src/services/ProductCategoryServices";
import { setAllProductCategory } from "src/redux/slices/productCategorySlice";
//import { useGetAllProductSubCategoryQuery } from "src/services/ProductSubCategoryService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { useParams } from "react-router-dom";
import { useGetProductCategoryIdSubCategoryQuery } from "src/services/ProductSubCategoryService";
import { setAllProductSubCategory } from "src/redux/slices/productSubCategorySlice";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
};

const formFields:{
  sectionName:string;
  fields:Field<"productCategoryoption" | "productSubCategoryOption" >[]
}[]=[  {
  sectionName: "Scheme Code",
  fields: [
    {
      name: "SchemeCode",
      label: "Scheme code",
      placeholder: "Scheme code",
      type:  "text",
    },
    {
      name: "Category",
      label: "Category",
      placeholder: "Category",
      type: "select",
      optionAccessKey: "productCategoryoption",

    
    },
    {
      name: "subCategory",
      label: "Sub Category",
      placeholder: "subCategory",
      type: "select",
      optionAccessKey: "productSubCategoryOption",
    },
    {
      name: "schemeName",
      label: "schemeName",
      placeholder: "Scheme Name",

    },
    {
      name: "schemePrice",
      label: "schemePrice",
      placeholder: "Scheme Price",

    },
    {
      name: "dimension.height",
      label: "Dimensions",
      placeholder: "H",

    },
    {
      name: "dimension.weight",
      label: "Dimensions",
      placeholder: "W",

    },
    {
      name: "dimension.depth",
      label: "Dimensions",
      placeholder: "D",

    },
    {
      name: "weight",
      label: "weight",
      placeholder: "weight", 

    },
    {
      name: "deliveryCharges",
      label: "deliveryCharges",
      placeholder: "deliveryCharges",

    },
    {
      name: "comboPacking",
      label: "comboPacking",
      placeholder: "comboPacking",

    },
    {
      name: "startDate",
      label: "startDate",
      placeholder: "startDate",
    },
    {
      name: "endDate",
      label: "endDate",
      placeholder: "endDate"

    },
    {
      name: "schemeDescription",
      label: "schemeDescription",
      placeholder: "schemeDescription", 
    },


  ]
},

]
// export type  DropdownOptions = {
//   categoryOptions: SelectOption[];
// };





const StepAddSchemeDetailsWrapper = ({ formikProps }: Props) => {

  const params=useParams()
  const id=params.id
  const dispatch = useDispatch();
  const { allProductCategory }: any = useSelector(
    (state: RootState) => state.productCategory
  );

  // console.log(allProductCategory)

  const {
    data: dataPC,
    isLoading: isLoadingPC,
    isFetching: isFetchingPC,
  } = useGetAllProductCategoryQuery("");



  useEffect(() => {
     {
     // console.log(setAllProductCategory(dataPC?.data))
      dispatch(setAllProductCategory(dataPC?.data));

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingPC, isFetchingPC, dataPC]);


  const productCategoryoption: any = allProductCategory?.map((ele: any) => {
    return {
      label: ele.categoryName,
      value: ele._id,
    };
  });

  //console.log(productCategoryoption)


  
  const {
    data: ProductScData,
    isLoading: ProductScIsLoading,
    isFetching: ProductScIsFetching,
  } = useGetProductCategoryIdSubCategoryQuery(
    formikProps.values.category,
    {
      skip: !formikProps.values.category,
    })

    const {allProductSubCategory}:any=useSelector((state:RootState)=>state.productSubCategory)
    console.log(allProductSubCategory)
    
    const productSubCategoryOption: any = allProductSubCategory?.map((ele: any) => {
      return {
        label: ele.categoryName,
        value: ele._id,
      };
    });

    console.log(productSubCategoryOption)
    useEffect(() => {
     {
       // console.log(setAllProductSubCategory(ProductScData?.data))
        dispatch(setAllProductSubCategory(ProductScData?.data));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ProductScData,ProductScIsLoading,ProductScIsFetching]);
  
  const dropdownOptions = {
    productCategoryoption,
    productSubCategoryOption
 
  };

  return (
    <>
      <StepAddSchemeDetails formikProps={formikProps} formFields={formFields}
        dropdownOptions={dropdownOptions}
   />
    </>
  );
};

export default StepAddSchemeDetailsWrapper;
