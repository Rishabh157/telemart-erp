import React from "react";
import { Form, Formik, FormikProps } from "formik";
import { array, mixed, number, object, string } from "yup";
import StepAddProductDetailsWrapper from "./FormSteps/StepAddProductDetails/StepAddProductDetailsWrapper";
import AddProduct from "./AddProduct";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
import StepAddItemsWrapper from "./FormSteps/StepAddItems/StepAddItemsWrapper";
import StepAddTaxWrapper from "./FormSteps/StepAddTax/StepAddTaxWrapper";
import StepAddFAQsWrapper from "./FormSteps/StepAddFAQs/StepAddFAQsWrapper";
import StepAddVideoWrapper from "./FormSteps/StepAddVideo/StepAddVideoWrapper";
import { EditorState } from "draft-js";
import StepAddCallScriptWrapper from "./FormSteps/StepAddCallScript/StepAddCallScriptWrapper";

// TYPE-  Form Intial Values
export type FormInitialValues = {
  product_code: string;
  product_name: string;
  product_category: string;
  product_sub_category: string;
  product_weight: string;
  dimensions: {
    height: string;
    width: string;
    depth: string;
  };
  description: string;
  product_image: string;
  items: {
    item_name: string;
    item_quantity: string;
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
    video_name: string;
    video_link: string;
  }[];
  call_scripts: {
    script: any;
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
      product_image: mixed().required("Product image is required"),
    }),
  },
  {
    label: "Items",
    component: StepAddItemsWrapper,
    validationSchema: object({
      items: array().of(
        object().shape({
          item_name: string().required("Please select item name"),
          item_quantity: number()
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
          taxDetail: object().shape({
            tax_name: string().required(),
            id: string().required()
          }).required("Please select item name"),
          tax_rate: number().typeError("Tax rate should be a number").required("Please enter tax rate"),
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
          video_name: string().required("Video name is required"),
          video_link: string().required("Video link is required"),
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
  // States
  const [activeStep, setActiveStep] = React.useState(0);

  const allTaxes = [
    { tax_name: "CST", id: "1" },
    { tax_name: "CGST", id: "2" },
    { tax_name: "SGST", id: "3" },
    { tax_name: "IGST", id: "4" },
  ];

  // From Initial Values
  const initialValues: FormInitialValues = {
    product_code: "",
    product_name: "",
    product_category: "",
    product_sub_category: "",
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
        item_name: "",
        item_quantity: "",
      },
    ],
    taxes: allTaxes.map((tax) => ({
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
        video_name: "",
        video_link: "",
      },
    ],
    call_scripts: [
      {
        script: EditorState.createEmpty(),
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
    if (activeStep === steps.length - 1) {
      setTimeout(() => {
        console.log(values);
        setActiveStep(0);
      }, 1000);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  return (
    <ConfigurationLayout>
      <Formik
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
            />
          </Form>
        )}
      </Formik>
    </ConfigurationLayout>
  );
};

export default AddProductWrapper;
