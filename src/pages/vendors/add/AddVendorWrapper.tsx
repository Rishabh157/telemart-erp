import React from "react";
import { Form, Formik, FormikProps } from "formik";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { array, mixed, object, string } from "yup";
import AddVendor from "./AddVendor";
import StepAddAddressWrapper from "./FormSteps/StepAddAddress/StepAddAddressWrapper";
import StepAddBankDetailsWrapper from "./FormSteps/StepAddBankDetails/StepAddBankDetailsWrapper";
import StepAddCompanyDetailsWrapper from "./FormSteps/StepAddComapnyDetails/StepAddCompanyDetailsWrapper";
import StepAddContactWrapper from "./FormSteps/StepAddContact/StepAddContactWrapper";
import StepAddDocumentsWrapper from "./FormSteps/StepAddDocuments/StepAddDocumentsWrapper";

// TYPE-  Form Intial Values
export type FormInitialValues = {
  company_name: string;
  company_type: string;
  ownership_type: string;
  website_address: string;
  vendor_code: string;
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
  declaration_form: string;
  bank_informations: {
    bank_name: string;
    branch: string;
    account_holder_name: string;
    account_number: string;
    ifsc_no: string;
    account_type: string;
    cancelled_cheque: string;
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
  {
    label: "Document",
    component: StepAddDocumentsWrapper,
    validationSchema: object({
      gst_no: string().required("GST number is required"),
      gst_certificate: mixed().required("GST certificate is required"),
      declaration_form: mixed().required("Declaration form is required"),
    }),
  },
  {
    label: "Bank Details",
    component: StepAddBankDetailsWrapper,
    validationSchema: object({
      bank_informations: array().of(
        object().shape({
          bank_name: string().required("Bank name is required"),
          branch: string().required("Branch name is required"),
          account_holder_name: string().required("Account holder name is required"),
          account_number: string().required("Account number is required"),
          ifsc_no: string().required("IFS code is required"),
          account_type: string().required("Please select account type"),
          cancelled_cheque: mixed().required("Cancelled cheque is required"),
        })
      )
     
    }),
  },
];

const AddVendorWrapper = () => {

  // States
  const [activeStep, setActiveStep] = React.useState(0);

  // From Initial Values
  const initialValues: FormInitialValues = {
    company_name: "",
    company_type: "",
    ownership_type: "",
    website_address: "",
    vendor_code: "",
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
    gst_certificate: "https://source.unsplash.com/user/c_v_r/1900x800",
    declaration_form: "",
    bank_informations: [
      {
        bank_name: "",
        branch: "",
        account_holder_name: "",
        account_number: "",
        ifsc_no: "",
        account_type: "",
        cancelled_cheque: "",
      },
    ],
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
            <AddVendor
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

export default AddVendorWrapper;
