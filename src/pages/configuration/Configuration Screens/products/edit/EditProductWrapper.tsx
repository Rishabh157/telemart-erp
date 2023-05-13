/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Form, Formik, FormikProps } from "formik";
import { array, number, object, string } from "yup";
import StepEditProductDetailsWrapper from "./FormSteps/StepEditProductDetails/StepEditProductDetailsWrapper";
import EditProduct from "./EditProduct";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
import StepEditItemsWrapper from "./FormSteps/StepEditItems/StepEditItemsWrapper";
import StepEditFAQsWrapper from "./FormSteps/StepEditFAQs/StepEditFAQsWrapper";
import StepEditVideoWrapper from "./FormSteps/StepEditVideo/StepEditVideoWrapper";
import StepEditCallScriptWrapper from "./FormSteps/StepEditCallScript/StepEditCallScriptWrapper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { setAllItems } from "src/redux/slices/itemSlice";
import { setAllItems as setAllLanguage } from "src/redux/slices/languageSlice";

import { useGetAllItemsQuery } from "src/services/ItemService";
// import { useEditProductMutation } from "src/services/ProductService";
import { showToast } from "src/utils";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "src/services/ProductService";
import { setSelectedItem } from "src/redux/slices/productSlice";
import { useGetAllLanguageQuery } from "src/services/LanguageService";

// TYPE-  Form Intial Values
export type FormInitialValues = {
  product_code: string;
  product_name: string;
  product_category: string;
  product_sub_category: string;
  productGroup: string;
  product_weight: string;
  dimensions: {
    height: string;
    width: string;
    depth: string;
  };
  description: string;
  items: {
    itemId: string;
    itemQuantity: number;
  }[];
  FAQs: {
    question: string;
    answer: string;
  }[];
  videos: {
    videoName: string;
    videoLink: string;
  }[];
  call_scripts: {
    script: any;
    language: string;
  }[];
};

// Form Steps
const steps = [
  {
    label: "Product Details",
    component: StepEditProductDetailsWrapper,
    validationSchema: object({
      product_code: string().required("Product code is required"),
      product_name: string().required("Product name is required"),
      product_category: string().required("Please select product category"),
      product_sub_category: string().required(
        "Please select product sub category"
      ),
      productGroup: string().required("Please select product Group"),
      product_weight: number()
        .min(0, "Weight must be positive")
        .required("Product weight is required"),
      dimensions: object().shape({
        height: number().required("Height is required"),
        width: number().required("Width is required"),
        depth: number().required("Depth is required"),
      }),
      description: string().required("Product description is required"),
    }),
  },
  {
    label: "Items",
    component: StepEditItemsWrapper,
    validationSchema: object({
      items: array().of(
        object().shape({
          itemId: string().required("Please select item name"),
          itemQuantity: number()
            .typeError("Quantity should be number")
            .min(1, "Quantity should be greater than or equal to 1")
            .required("Please enter quantity"),
        })
      ),
    }),
  },
  {
    label: "FAQ's",
    component: StepEditFAQsWrapper,
    validationSchema: object({
      FAQs: array().of(
        object().shape({
          question: string().required("Question is required"),
          answer: string().required("Answer is required"),
        })
      ),
    }),
  },
  {
    label: "Video",
    component: StepEditVideoWrapper,
    validationSchema: object({
      videos: array().of(
        object().shape({
          videoName: string().required("Video name is required"),
          videoLink: string()
            .url("Must be a valid link")
            .required("Video link is required"),
        })
      ),
    }),
  },
  {
    label: "Call Script",
    component: StepEditCallScriptWrapper,
    validationSchema: object({
      call_scripts: array().of(
        object().shape({
          script: object().test(
            "has text",
            "Please write script",
            (value: any) => value.getCurrentContent().hasText()
          ),
          language: string().required("language is required"),
        })
      ),
    }),
  },
];

// Breadcrumbs
const breadcrumbs = [
  {
    label: "Product",
    path: "/configurations/products",
  },
  {
    label: "Update Product",
  },
];

// Page Heading
const pageHeading = "Edit New Product";

const EditProductWrapper = () => {
  const params = useParams();
  const Id = params.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data: prData,
    isLoading: prIsLoading,
    isFetching: prIsFetching,
  } = useGetProductByIdQuery(Id);

  const [editProduct] = useUpdateProductMutation();
  const [apiStatus, setApiStatus] = useState(false);
  const { userData } = useSelector((state: RootState) => state?.auth);

  const { allItems }: any = useSelector((state: RootState) => state?.item);
  const { allItems: allLanguages }: any = useSelector(
    (state: RootState) => state?.language
  );
  const { selectedItem }: any = useSelector(
    (state: RootState) => state?.products
  );

  const {
    data: languageData,
    isLoading: lIsLoading,
    isFetching: lIsFetching,
  } = useGetAllLanguageQuery("");

  const {
    data: itemData,
    isLoading: itemIsLoading,
    isFetching: itemIsFetching,
  } = useGetAllItemsQuery("");

  // States
  const [activeStep, setActiveStep] = React.useState(0);

  useEffect(() => {
    if (!itemIsLoading && !itemIsFetching) {
      dispatch(setAllItems(itemData?.data || []));
    }
  }, [itemData, itemIsLoading, itemIsFetching]);

  useEffect(() => {
    if (!prIsFetching && !prIsLoading) {
      dispatch(setSelectedItem(prData?.data || []));
    }
  }, [prData, prIsLoading, prIsFetching]);

  useEffect(() => {
    if (!lIsLoading && !lIsFetching) {
      dispatch(setAllLanguage(languageData?.data || []));
    }
  }, [languageData, lIsLoading, lIsFetching]);

 
  // From Initial Values
  const initialValues: FormInitialValues = {
    product_code: selectedItem?.productCode || "",
    product_name: selectedItem?.productName || "",
    product_category: selectedItem?.productCategory || "",
    product_sub_category: selectedItem?.productSubCategory || "",
    productGroup: selectedItem?.productGroup || "",
    product_weight: selectedItem?.productWeight || "",
    dimensions: {
      height: selectedItem?.dimension?.height || "",
      width: selectedItem?.dimension?.width || "",
      depth: selectedItem?.dimension?.depth || "",
    },
    description: selectedItem?.description,
    items: selectedItem?.item?.map((ele: any) => {
      return {
        itemId: ele?.itemId,
        itemQuantity: ele?.itemQuantity,
      };
    }),
  

    FAQs: selectedItem?.faq || [
      {
        question: "",
        answer: "",
      },
    ],
    videos: selectedItem?.video || [
      {
        videoName: "",
        videoLink: "",
      },
    ],
    call_scripts: selectedItem?.callScript?.map((ele: any) => {
      return {
        script: EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(ele?.script || "").contentBlocks,
            convertFromHTML(ele?.script || "").entityMap
          )
        ),
        language: ele?.languageId,
      };
    }),
  };

  // Form validation schema based on the active step
  const getValidationSchema = (activeStep: number) => {
    return steps.find((_, stepIndex) => stepIndex === activeStep)
      ?.validationSchema;
  };

  // On Submit Handler
  const onSubmitHandler = (values: FormInitialValues) => {
    if (activeStep === steps?.length - 1) {
      setApiStatus(true);
      const faqData = values.FAQs.map((ele: any) => {
        const { _id, ...rest } = ele; // use object destructuring to remove the _id property
        return rest; // return the new object without the _id property
      });
      const videoData = values.videos.map((ele: any) => {
        const { _id, ...rest } = ele; // use object destructuring to remove the _id property
        return rest; // return the new object without the _id property
      });

     
      const callScriptData = values.call_scripts.map((ele) => {
        return {
          language: ele?.language,
          script: draftToHtml(convertToRaw(ele.script.getCurrentContent())),
        };
      });
      setTimeout(() => {
        editProduct({
          body: {
            productCode: values.product_code,
            productName: values.product_name,
            productCategory: values.product_category,
            productSubCategory: values.product_sub_category,
            productGroup: values.productGroup,
            productWeight: Number(values.product_weight),
            dimension: {
              height: Number(values.dimensions.height),
              width: Number(values.dimensions.width),
              depth: Number(values.dimensions.depth),
            },
            description: values.description,
            item: values.items,
            faq: faqData,
            video: videoData,
            callScript: callScriptData,
            companyId: userData?.companyId || "",
          },
          id: Id || "",
        }).then((res) => {
          if ("data" in res) {
            if (res?.data?.status) {
              showToast("success", "Updated successfully!");
              navigate("/configurations/products");
            } else {
              showToast("error", res?.data?.message);
            }
          } else {
            showToast("error", "Something went wrong");
          }
          setApiStatus(false);
        });
      }, 1000);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  return (
    <ConfigurationLayout>
      <Formik
        enableReinitialize={activeStep === 0}
        initialValues={initialValues}
        validationSchema={getValidationSchema(activeStep)}
        onSubmit={onSubmitHandler}
      >
        {(formikProps: FormikProps<FormInitialValues>) => (
          <Form className="">
            <EditProduct
              formikProps={formikProps}
              steps={steps}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              breadcrumbs={breadcrumbs}
              pageHeading={pageHeading}
              allItems={allItems}
              allLanguages={allLanguages}
              apiStatus={apiStatus}
            />
          </Form>
        )}
      </Formik>
    </ConfigurationLayout>
  );
};

export default EditProductWrapper;
