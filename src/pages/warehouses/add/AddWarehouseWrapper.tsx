import React from "react";
import { Form, Formik, FormikProps } from "formik";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { array, object, string } from "yup";
import StepAddCompanyDetailsWrapper from "./FormSteps/StepAddComapnyDetails/StepAddCompanyDetailsWrapper";
import StepAddAddressWrapper from "./FormSteps/StepAddAddress/StepAddAddressWrapper";
import StepAddContactWrapper from "./FormSteps/StepAddContact/StepAddContactWrapper";
import AddWarehouse from "./AddWarehouse";

// TYPE-  Form Intial Values
export type FormInitialValues = {
  warehouseCode: string;
  warehouseName: string;
  country: string;
  lastName: string;
  email: string;
  regd_address: {
    phone: string;
    address: string;
    country: string;
    state: string;
    district: string;
    pincode: string;
  };
  billing_address: {
    phone: string;
    address: string;
    country: string;
    state: string;
    district: string;
    pincode: string;
  };
  contact_informations: {
    name: string;
    department: string;
    designation: string;
    email: string;
    mobile_number: string;
    landline: string;
  }[];
};

// Form Steps
const steps = [
  {
    label: "Company Details",
    component: StepAddCompanyDetailsWrapper,
    validationSchema: object({
      company_name: string().required("company name is required"),
      company_type: string().required("Please select company type"),
      ownership_type: string().required("please select ownership type"),
      website_address: string().required("Website address is required"),
      vendor_code: string().required("Vendor code is required"),
    }),
  },
  {
    label: "Regd./Billing address",
    component: StepAddAddressWrapper,
    validationSchema: object({
      regd_address: object().shape({
        phone: string().required("Phone number is required"),
        address: string().required("Address is required"),
        country: string().required("Please choose a country"),
        state: string().required("Please choose a state"),
        district: string().required("Please choose a district"),
        pincode: string().required("Please choose a pincode"),
      }),
      billing_address: object().shape({
        phone: string().required("Phone number is required"),
        address: string().required("Address is required"),
        country: string().required("Please choose a country"),
        state: string().required("Please choose a state"),
        district: string().required("Please choose a district"),
        pincode: string().required("Please choose a pincode"),
      }),
    }),
  },
  {
    label: "Contact",
    component: StepAddContactWrapper,
    validationSchema: object({
      contact_informations: array().of(
        object().shape({
          name: string().required("Name is required"),
          department: string().required("Department is required"),
          designation: string().required("Designation is required"),
          email: string().required("Email is required"),
          mobile_number: string().required("Mobile number is required"),
          landline: string().required("Landline is required"),
        })
      ),
    }),
  },
];

const AddWarehouseWrapper = () => {
  // States
  const [activeStep, setActiveStep] = React.useState(0);

  // From Initial Values
  const initialValues: FormInitialValues = {
    warehouseCode: "",
    warehouseName: "",
    country: "",
    lastName: "",
    email: "",
    regd_address: {
      phone: "",
      address: "",
      country: "",
      state: "",
      district: "",
      pincode: "",
    },
    billing_address: {
      phone: "",
      address: "",
      country: "",
      state: "",
      district: "",
      pincode: "",
    },
    contact_informations: [
      {
        name: "",
        department: "",
        designation: "",
        email: "",
        mobile_number: "",
        landline: "",
      },
      {
        name: "",
        department: "",
        designation: "",
        email: "",
        mobile_number: "",
        landline: "",
      },
    ],
  };

  // Form validation schema based on the active step
  //   const getValidationSchema = (activeStep: number) => {
  //     return steps.find((_, stepIndex) => stepIndex === activeStep)
  //       ?.validationSchema;
  //   };

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
        // validationSchema={getValidationSchema(activeStep)}
        onSubmit={onSubmitHandler}
      >
        {(formikProps: FormikProps<FormInitialValues>) => (
          <Form className="">
            <AddWarehouse
              formikProps={formikProps}
              steps={steps}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          </Form>
        )}
      </Formik>
    </SideNavLayout>
  );
};

export default AddWarehouseWrapper;
