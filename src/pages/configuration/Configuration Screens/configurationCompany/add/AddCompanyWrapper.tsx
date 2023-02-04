import React from "react";
import { Form, Formik, FormikProps } from "formik";
import { array, mixed, object, string } from "yup";
import AddCompany from "./AddCompany";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
import StepAddCompanyDetailsWrapper from "./FormSteps/StepAddCompanyDetails/StepAddCompanyDetailsWrapper";
import StepAddBankDetailsWrapper from "./FormSteps/StepAddBankDetails/StepAddBankDetailsWrapper";

// TYPE-  Form Intial Values
export type FormInitialValues = {
  company_name: string;
  website_url: string;
  company_logo: string;
  gst_no: string;
  address: string;
  phone_no: string;
  bank_informations: {
    bank_name: string;
    branch_name: string;
    account_holder_name: string;
    account_number: string;
    ifsc_no: string;
    account_type: string;
  }[];
};

// Form Steps
const steps = [
  {
    label: "Company Details",
    component: StepAddCompanyDetailsWrapper,
    validationSchema: object({
      company_name: string().required("Company name is required"),
      website_url: string().required("Website url is required"),
      company_logo: mixed().required("Please select company logo"),
      gst_no: string().required("GST number is required"),
      address: string().required("Address is required"),
      phone_no: string().required("Phone number is required"),
    }),
  },
  {
    label: "Bank Details",
    component: StepAddBankDetailsWrapper,
    validationSchema: object({
      bank_informations: array().of(
        object().shape({
          bank_name: string().required("Bank name is required"),
          branch_name: string().required("Branch name is required"),
          account_holder_name: string().required(
            "Account holder name is required"
          ),
          account_number: string().required("Account number is required"),
          ifsc_no: string().required("IFSC number is required"),
          account_type: string().required("Please select account type"),
        })
      ),
    }),
  },
];

// Page Heading
const pageHeading = "Add New Company";

const AddCompanyWrapper = () => {
  // Breadcrumbs
  const breadcrumbs = [
    {
      label: "Company",
      onClick: () => {
        console.log("company");
      },
      path: "/configurations/company",
    },
    {
      label: "Add Company",
      onClick: () => {
        console.log("add-company");
      },
    },
  ];

  // States
  const [activeStep, setActiveStep] = React.useState(0);

  // From Initial Values
  const initialValues: FormInitialValues = {
    company_name: "",
    website_url: "",
    company_logo: "",
    gst_no: "",
    address: "",
    phone_no: "",
    bank_informations: [
      {
        bank_name: "",
        branch_name: "",
        account_holder_name: "",
        account_number: "",
        ifsc_no: "",
        account_type: "",
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
            <AddCompany
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

export default AddCompanyWrapper;
