import React from "react";
import { Form, Formik, FormikProps } from "formik";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { mixed, number, object, string } from "yup";
import StepAddProductDetailsWrapper from "./FormSteps/StepAddProductDetails/StepAddProductDetailsWrapper";
import AddProduct from "./AddProduct";

// TYPE-  Form Intial Values
export type FormInitialValues = {
  product_code: string;
  product_name: string;
  product_category: string;
  product_sub_category: string;
  product_weight: number;
  dimensions: {
    height: number;
    width: number;
    depth: number;
  };
  description: string;
  product_image: File
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
      product_sub_category: string().required("Please select product sub category"),
      product_weight: number().min(0 , 'Weight must be positive').required("Product weight is required"),
      dimensions: object().shape({
        height: number().required("Height is required"),
        width: number().required("Width is required"),
        depth: number().required("Depth is required")
      }),
      description: string().required("Product description is required"),
      product_image: mixed().required("Product image is required"),
    }),
  },
//   {
//     label: "Step 2",
//     component: AddStep2Wrapper,
//     validationSchema: object({
//       regd_address: object().shape({
//         phone: string().required("Phone number is required"),
//         address: string().required("Address is required"),
//         country: string().required("Please choose a country"),
//         state: string().required("Please choose a state"),
//         district: string().required("Please choose a district"),
//         pincode: string().required("Please choose a pincode"),
//       }),
//       billing_address: object().shape({
//         phone: string().required("Phone number is required"),
//         address: string().required("Address is required"),
//         country: string().required("Please choose a country"),
//         state: string().required("Please choose a state"),
//         district: string().required("Please choose a district"),
//         pincode: string().required("Please choose a pincode"),
//       }),
//     }),
//   },
];

 // Breadcrumbs
 const breadcrumbs= [
  {
    label: "Product",
    path: "/configurations/products"
  },
  {
    label: "Add Product",
  },
];

// Page Heading
const pageHeading = "Add New Product"

const AddProductWrapper = () => {

  // States
  const [activeStep, setActiveStep] = React.useState(0);

  // From Initial Values
  const initialValues: FormInitialValues = {
   product_code: "",
   product_name: "",
   product_category: "",
   product_sub_category: "",
   
  };

  // Form validation schema based on the active step
  const getValidationSchema = (activeStep: number) => {
    return steps.find((_ , stepIndex)=> stepIndex === activeStep)?.validationSchema
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
    <SideNavLayout>
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
    </SideNavLayout>
  );
};

export default AddProductWrapper;
