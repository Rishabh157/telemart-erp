/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Form, Formik, FormikProps } from "formik";
import { array, number, object, string } from "yup";
import StepAddProductDetailsWrapper from "./FormSteps/StepAddProductDetails/StepAddProductDetailsWrapper";
import AddProduct from "./AddProduct";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
import StepAddItemsWrapper from "./FormSteps/StepAddItems/StepAddItemsWrapper";
import StepAddTaxWrapper from "./FormSteps/StepAddTax/StepAddTaxWrapper";
import StepAddFAQsWrapper from "./FormSteps/StepAddFAQs/StepAddFAQsWrapper";
import StepAddVideoWrapper from "./FormSteps/StepAddVideo/StepAddVideoWrapper";
import { EditorState, convertToRaw } from "draft-js";
import StepAddCallScriptWrapper from "./FormSteps/StepAddCallScript/StepAddCallScriptWrapper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { useGetAllTaxesQuery } from "src/services/TaxesService";
import { setAllTaxes } from "src/redux/slices/TaxesSlice";
import { setAllItems } from "src/redux/slices/itemSlice";
import { setAllItems as setAllLanguage } from "src/redux/slices/languageSlice";

import { useGetAllItemsQuery } from "src/services/ItemService";
import { useAddProductMutation } from "src/services/ProductService";
import { showToast } from "src/utils";
import { useNavigate } from "react-router-dom";
import draftToHtml from "draftjs-to-html";
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
  product_image: string;
  items: {
    itemId: string;
    itemQuantity: number;
  }[];
  taxes: {
    taxDetail: { tax_name: string; id: string };
    tax_rate: number;
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
    component: StepAddProductDetailsWrapper,
    validationSchema: object({
      product_code: string().required("Product code is required"),
      product_name: string().required("Product name is required"),
      product_category: string().required("Please select product category"),
      product_sub_category: string().required(
        "Please select product sub category"
      ),
      product_weight: number()
        .min(0, "Weight must be positive")
        .required("Product weight is required"),
      dimensions: object().shape({
        height: number().required("Height is required"),
        width: number().required("Width is required"),
        depth: number().required("Depth is required"),
      }),
      description: string().required("Product description is required"),
      product_image: string().url().required("Product image is required"),
    }),
  },
  {
    label: "Items",
    component: StepAddItemsWrapper,
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
    label: "Tax",
    component: StepAddTaxWrapper,
    validationSchema: object({
      taxes: array().of(
        object().shape({
          taxDetail: object()
            .shape({
              tax_name: string().required(),
              id: string().required(),
            })
            .required("Please select item name"),
          tax_rate: number()
            .typeError("Tax rate should be a number")
            .required("Please enter tax rate"),
        })
      ),
    }),
  },
  {
    label: "FAQ's",
    component: StepAddFAQsWrapper,
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
    component: StepAddVideoWrapper,
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
    component: StepAddCallScriptWrapper,
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
    label: "Add Product",
  },
];

// Page Heading
const pageHeading = "Add New Product";

const AddProductWrapper = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addProduct] = useAddProductMutation();
  const [taxStatus, setTaxStatus] = useState(false);
  const [apiStatus, setApiStatus] = useState(false);

  const { allTaxes: taxData }: any = useSelector(
    (state: RootState) => state?.tax
  );
  const { userData } = useSelector((state: RootState) => state?.auth);

  const { allItems }: any = useSelector((state: RootState) => state?.item);
  const { allItems: allLanguages }: any = useSelector(
    (state: RootState) => state?.language
  );

  const { data, isLoading, isFetching } = useGetAllTaxesQuery("");
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
  const [activeStep, setActiveStep] = React.useState(2);
  const allTaxes = taxData?.map((ele: any) => {
    return { tax_name: ele?.taxName, id: ele?._id };
  });
  // [{ tax_name: "ele?.taxName", id: "ele?._id" }];

  useEffect(() => {
    if (!itemIsLoading && !itemIsFetching) {
      dispatch(setAllItems(itemData?.data || []));
    }
  }, [itemData, itemIsLoading, itemIsFetching]);

  useEffect(() => {
    if (!lIsLoading && !lIsFetching) {
      dispatch(setAllLanguage(languageData?.data || []));
    }
  }, [languageData, lIsLoading, lIsFetching]);

  useEffect(() => {
    if (!isLoading && !isFetching) {
      setTaxStatus(true);
      dispatch(setAllTaxes(data?.data));
    }
  }, [data, isLoading, isFetching]);

  // From Initial Values
  const initialValues: FormInitialValues = {
    product_code: "",
    product_name: "",
    product_category: "",
    product_sub_category: "",
    productGroup: "",
    product_weight: "",
    product_image: "",
    dimensions: {
      height: "",
      width: "",
      depth: "",
    },
    description: "",
    items: [
      {
        itemId: "",
        itemQuantity: 0,
      },
    ],
    taxes: allTaxes?.map((tax: any) => ({
      taxDetail: tax,
      tax_rate: 0,
    })),
    FAQs: [
      {
        question: "",
        answer: "",
      },
    ],
    videos: [
      {
        videoName: "",
        videoLink: "",
      },
    ],
    call_scripts: [
      {
        script: EditorState.createEmpty(),
        language: "",
      },
    ],
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
      const taxData = values.taxes.map((ele) => {
        return { taxId: ele.taxDetail.id, taxPercent: ele.tax_rate };
      });
      const callScriptData = values.call_scripts.map((ele) => {
        return {
          language: ele?.language,
          script: draftToHtml(convertToRaw(ele.script.getCurrentContent())),
        };
      });
      setTimeout(() => {
        addProduct({
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
          productImage: values.product_image,
          description: values.description,
          item: values.items,
          tax: taxData,
          faq: values.FAQs,
          video: values.videos,
          callScript: callScriptData,
          companyId: userData?.companyId || "",
        }).then((res) => {
          if ("data" in res) {
            if (res?.data?.status) {
              showToast("success", "Product added successfully!");
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
      {taxStatus ? (
        <Formik
          // enableReinitialize
          initialValues={initialValues}
          validationSchema={getValidationSchema(activeStep)}
          onSubmit={onSubmitHandler}
        >
          {(formikProps: FormikProps<FormInitialValues>) => (
            <Form className="">
              <AddProduct
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
      ) : null}
    </ConfigurationLayout>
  );
};

export default AddProductWrapper;
