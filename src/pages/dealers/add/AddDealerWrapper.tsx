import React from "react";
import { Form, Formik, FormikProps } from "formik";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { array, mixed, object, string } from "yup";
import AddDealer from "./AddDealer";
import StepAddCompanyDetailsWrapper from "./FormSteps/StepAddComapnyDetails/StepAddCompanyDetailsWrapper";
import StepAddAddressWrapper from "./FormSteps/StepAddAddress/StepAddAddressWrapper";
import StepAddContactWrapper from "./FormSteps/StepAddContact/StepAddContactWrapper";
import StepAddDocumentsWrapper from "./FormSteps/StepAddDocuments/StepAddDocumentsWrapper";

// TYPE-  Form Intial Values
export type FormInitialValues = {
  dealer_code: string;
  dealer_category: string;
  firm_name: string;
  first_name: string;
  last_name: string;
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
  gst_no: string;
  gst_certificate: string;
  aadhar_no: string;
  aadhar_certificate: string;
  other_documents: {
      document_name: string;
      document_file: string;
    }[]
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
  {
    label: "Document",
    component: StepAddDocumentsWrapper,
    validationSchema: object({
      gst_no: string().required("GST number is required"),
      gst_certificate: mixed().required("GST certificate is required"),
      declaration_form: mixed().required("Declaration form is required"),
    }),
  },
];

const AddDealerWrapper = () => {
  // States
  const [activeStep, setActiveStep] = React.useState(0);

  // From Initial Values
  const initialValues: FormInitialValues = {
    dealer_code: "",
    dealer_category: "",
    firm_name: "",
    first_name: "",
    last_name: "",
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
    gst_no: "",
    gst_certificate: "",
    aadhar_no: "",
    aadhar_certificate: "",
    other_documents: [
      {
        document_name: "",
        document_file: "",
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
    <SideNavLayout>
      <Formik
        initialValues={initialValues}
        // validationSchema={getValidationSchema(activeStep)}
        onSubmit={onSubmitHandler}
      >
        {(formikProps: FormikProps<FormInitialValues>) => (
          <Form className="">
            <AddDealer
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

export default AddDealerWrapper;
