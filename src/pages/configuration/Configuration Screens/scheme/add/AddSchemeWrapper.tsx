import React from "react";
import { Form, Formik, FormikProps } from "formik";
import { array, boolean, number, object, string } from "yup";
// import AddStep1Wrapper from "./FormSteps/AddStep1/AddStep1Wrapper";
import AddScheme from "./AddScheme";
import StepAddSchemeDetailsWrapper from "./FormSteps/StepAddSchemeDetails/StepAddSchemeDetailsWrapper";
import StepAddProductsWrapper from "./FormSteps/StepAddProducts/StepAddProductsWrapper";
import StepAddFAQ from "./FormSteps/StepAddFAQ/StepAddFAQ";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";

// TYPE-  Form Intial Values
export type FormInitialValues = {
  scheme_code: string;
  category: string;
  sub_category: string;
  scheme_name: string;
  scheme_price: string;
  dimensions: {
    height: string;
    width: string;
    depth: string;
  };
  weight: string;
  delivery_charges: string;
  is_combo_packaging: boolean;
  start_date: string | null;
  end_date: string | null;
  scheme_description: string;
  products: {
    product_name: string;
    quantity: string;
    mrp: number;
    offer_price: number;
  }[];
  FAQs: {
    question: string;
    answer: string;
  }[];
};

// Form Steps
const steps = [
  {
    label: "Scheme Details",
    component: StepAddSchemeDetailsWrapper,
    validationSchema: object({
      scheme_code: string().required("Scheme code is required"),
      category: string().required("Category is required"),
      sub_category: string().required("Sub category is required"),
      scheme_name: string().required("Scheme Name is required"),
      scheme_price: string().required("Scheme Price is required"),
      dimensions: object().shape({
        height: number().typeError("must be number").required("Height is required"),
        width: number().typeError("must be number").required("Width is required"),
        depth: number().typeError("must be number").required("Depth is required"),
      }),
      weight: number()
        .min(0, "Weight must be positive")
        .required("Product weight is required"),
      delivery_charges: number()
        .min(0, "Delivery charges must be positive")
        .required("delivery charges is required"),
      is_combo_packaging: boolean().required(),
      start_date: string().required("Please select start date").nullable(),
      end_date: string().required("Please select end date").nullable(),
      scheme_description: string().required("scheme description is required"),
    }),
  },

  {
    label: "Products",
    component: StepAddProductsWrapper,
    validationSchema: object({
      products: array().of(
        object().shape({
          product_name: string().required("Please select a product"),
          quantity: number().typeError("Quantity must be a number")
            .min(1, "Please enter quantity")
            .required("Quantity is required"),
          mrp: number()
            .min(0, "MRP must be postive")
            .required("MRP is required"),
          offer_price: number()
            .min(0, "Offer price must be positive")
            .required("Offer price is required"),
        })
      ),
    }),
  },

  {
    label: "FAQ",
    component: StepAddFAQ,
    validationSchema: object({
      FAQs: array().of(
        object().shape({
          question: string().required("Question is required"),
          answer: string().required("Answer is required"),
        })
      ),
    }),
  },
];

// Page Heading
const pageHeading = "Add New Scheme";

const AddSchemeWrapper = () => {
  // Breadcrumbs
  const breadcrumbs = [
    {
      label: "Outer Scheme",
      onClick: () => {
        console.log("Scheme");
      },
      path: "/configurations/scheme",
    },
    {
      label: "Add Scheme",
      onClick: () => {
        console.log("add-Scheme");
      },
    },
  ];

  // States
  const [activeStep, setActiveStep] = React.useState(0);

  // From Initial Values
  const initialValues: FormInitialValues = {
    scheme_code: "",
    category: "",
    sub_category: "",
    scheme_name: "",
    scheme_price: "",
    dimensions: {
      height: "",
      width: "",
      depth: "",
    },
    weight: "",
    delivery_charges: "",
    is_combo_packaging: false,
    start_date: null,
    end_date: null,
    scheme_description: "",
    products: [
      {
        product_name: "",
        quantity: "",
        mrp: 0,
        offer_price: 0,
      },
    ],
    FAQs: [
      {
        question: "",
        answer: "",
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
            <AddScheme
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

export default AddSchemeWrapper;
