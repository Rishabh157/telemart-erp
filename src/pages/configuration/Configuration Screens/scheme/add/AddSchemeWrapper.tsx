import React, { useEffect } from "react";
import { Formik  ,Form,FormikProps} from "formik";
import { array, boolean, number, object, string } from "yup";
import AddScheme from "./AddScheme";
import StepAddSchemeDetailsWrapper from "./FormSteps/StepAddSchemeDetails/StepAddSchemeDetailsWrapper";
import StepAddProductsWrapper from "./FormSteps/StepAddProducts/StepAddProductsWrapper";
import StepAddFAQ from "./FormSteps/StepAddFAQ/StepAddFAQ";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";

// TYPE-  Form Intial Values

export type FormInitialValues = {
  schemeCode: string;
  category: string;
  subCategory: string;
  schemeName: string;
  schemePrice: string;
  dimensions: {
    height: string;
    width: string;
    depth: string;
  };
  weight: string;
  deliveryCharges: string;
  comboPacking: boolean;
  startDate: string | null;
  endDate: string | null;
  schemeDescription: string;
  productInformation: {
    productGroup: string;
    quantity: string;
    mrp: number;
    pop: number;
  }[];
  faq: {
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
      schemeCode: string().required("Scheme code is required"),
      category: string().required("Category is required"),
      subCategory: string().required("Sub category is required"),
      schemeName: string().required("Scheme Name is required"),
      schemePrice: number()
        .typeError("Please enter number")
        .integer("Price must be positive")
        .positive("Please enter positive digit")
        .required("Required!"),
      dimensions: object().shape({
        height: number()
          .typeError("must be number")
          .required("Height is required"),
        width: number()
          .typeError("must be number")
          .required("Width is required"),
        depth: number()
          .typeError("must be number")
          .required("Depth is required"),
      }),
      weight: number()
        .min(0, "Weight must be positive")
        .required("Product weight is required"),
      deliveryCharges: number()
        .min(0, "Delivery charges must be positive")
        .required("delivery charges is required"),
      comboPacking: boolean().required(),
      startDate: string().required("Please select start date").nullable(),
      endDate: string().required("Please select end date").nullable(),
      schemeDescription: string().required("scheme description is required"),
    }),
  },

  {
    label: "Products",
    component: StepAddProductsWrapper,
    validationSchema: object({
      productInformation: array().of(
        object().shape({
          productGroup: string().required("Please select a product"),
          quantity: number()
            .typeError("Quantity must be a number")
            .min(1, "Please enter quantity")
            .required("Quantity is required"),
          mrp: number()
            .min(0, "MRP must be postive")
            .required("MRP is required"),
          pop: number()
            .min(0, "Offer price must be positive")
            .required("Offer price is required"),
        })
      ),
    }),
  },

  {
    label: "FAQ's",
    component: StepAddFAQ,
    validationSchema: object({
      faq: array().of(
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
  
  const {allProdcutSubCategory}:any=useSelector((state:RootState)=>state.productSubCategory)
  console.log(allProdcutSubCategory)
  // From Initial Values
  const initialValues: FormInitialValues = {
    schemeCode: "",
    category: "",
    subCategory: "",
    schemeName: "",
    schemePrice: "",
    dimensions: {
      height: "",
      width: "",
      depth: "",
    },
    weight: "",
    deliveryCharges: "",
    comboPacking: false,
    startDate: null,
    endDate: null,
    schemeDescription: "",
    productInformation: [
      {
        productGroup: "",
        quantity: "",
        mrp: 0,
        pop: 0,
      },
    ],
    faq: [
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
              pageHeading={pageHeading}/>
          </Form>
        )}
      </Formik>
    </ConfigurationLayout>
  );
};

export default AddSchemeWrapper;
