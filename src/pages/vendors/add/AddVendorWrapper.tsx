import React from "react";
import { Form, Formik, FormikProps } from "formik";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { array, object, string } from "yup";
import AddVendor from "./AddVendor";
import StepAddAddressWrapper from "./FormSteps/StepAddAddress/StepAddAddressWrapper";
import StepAddBankDetailsWrapper from "./FormSteps/StepAddBankDetails/StepAddBankDetailsWrapper";
import StepAddCompanyDetailsWrapper from "./FormSteps/StepAddComapnyDetails/StepAddCompanyDetailsWrapper";
import StepAddContactWrapper from "./FormSteps/StepAddContact/StepAddContactWrapper";
import StepAddDocumentsWrapper from "./FormSteps/StepAddDocuments/StepAddDocumentsWrapper";
import { useAddVendorMutation } from "src/services/VendorServices";
import { showToast } from "src/utils";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";

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
    mobileNumber: string;
    landLine: string;
  }[];
  gst_no: string;
  gst_certificate: string;
  declaration_form: string;
  bank_informations: {
    bankName: string;
    bankBranchName: string;
    accountHolderName: string;
    accountNumber: string;
    ifscNumber: string;
    accountType: string;
    cancelledCheque: string;
  }[];
};

export const regIndiaPhone = RegExp(/^[0]?[6789]\d{9}$/);

// Form Steps
const steps = [
  {
    label: "Company Details",
    component: StepAddCompanyDetailsWrapper,
    validationSchema: object({
      company_name: string().required("Company name is required"),
      company_type: string().required("Please select company type"),
      ownership_type: string().required("Please select ownership type"),
      website_address: string().url().required("Website address is required"),
      vendor_code: string().required("Vendor code is required"),
    }),
  },
  {
    label: "Regd./Billing address",
    component: StepAddAddressWrapper,
    validationSchema: object({
      regd_address: object().shape({
        phone: string()
          .trim()
          .matches(regIndiaPhone, "Invalid Mobile Number")
          .required("Required!"),
        address: string().required("Address is required"),
        country: string().required("Please choose a country"),
        state: string().required("Please choose a state"),
        district: string().required("Please choose a district"),
        pincode: string().required("Please choose a pincode"),
      }),
      billing_address: object().shape({
        phone: string()
          .trim()
          .matches(regIndiaPhone, "Invalid Mobile Number")
          .required("Required!"),
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
          email: string().required("Required!").email("Invalid  Email"),
          mobileNumber: string()
            .max(10)
            .trim()
            .matches(regIndiaPhone, "Invalid Mobile Number")
            .required("Required!"),
          landLine: string().required("LandLine is required"),
        })
      ),
    }),
  },
  {
    label: "Document",
    component: StepAddDocumentsWrapper,
    validationSchema: object({
      gst_no: string().required("GST number is required"),
      gst_certificate: string().url().required("GST certificate is required"),
      declaration_form: string().url().required("Declaration form is required"),
    }),
  },
  {
    label: "Bank Details",
    component: StepAddBankDetailsWrapper,
    validationSchema: object({
      bank_informations: array().of(
        object().shape({
          bankName: string().required("Bank name is required"),
          bankBranchName: string().required("bankBranchName name is required"),
          accountHolderName: string().required(
            "Account holder name is required"
          ),
          accountNumber: string().required("Account number is required"),
          ifscNumber: string().required("IFSC code is required"),
          accountType: string().required("Please select account type"),
          cancelledCheque: string()
            .url()
            .required("Cancelled cheque is required"),
        })
      ),
    }),
  },
];

const AddVendorWrapper = () => {
  const navigate = useNavigate();
  const [addVendor] = useAddVendorMutation();
  const { userData } = useSelector((state: RootState) => state?.auth);
  const [apiStatus, setApiStatus] = React.useState(false);
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
        mobileNumber: "",
        landLine: "",
      },
      {
        name: "",
        department: "",
        designation: "",
        email: "",
        mobileNumber: "",
        landLine: "",
      },
    ],
    gst_no: "",
    gst_certificate: "",
    declaration_form: "",
    bank_informations: [
      {
        bankName: "",
        bankBranchName: "",
        accountHolderName: "",
        accountNumber: "",
        ifscNumber: "",
        accountType: "",
        cancelledCheque: "",
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
      setApiStatus(true);
      setTimeout(() => {
        addVendor({
          companyName: values.company_name,
          vendorCode: values.vendor_code,
          companyType: values.company_type,
          ownerShipType: values.ownership_type,
          websiteAddress: values.website_address,
          registrationAddress: {
            phone: values.regd_address.phone,
            address: values.regd_address.address,
            country: values.regd_address.country,
            state: values.regd_address.state,
            district: values.regd_address.district,
            pincode: values.regd_address.pincode,
          },
          billingAddress: {
            phone: values.billing_address.phone,
            address: values.billing_address.address,
            country: values.billing_address.country,
            state: values.billing_address.state,
            district: values.billing_address.district,
            pincode: values.billing_address.pincode,
          },
          contactInformation: values.contact_informations,
          document: {
            gstNumber: values.gst_no,
            gstCertificate: values.gst_certificate,
            declarationForm: values.declaration_form,
          },
          bankInformation: values.bank_informations,
          companyId: userData?.companyId || "",
        }).then((res) => {
          if ("data" in res) {
            if (res?.data?.status) {
              showToast("success", "Vendor added successfully!");
              navigate("/vendors");
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
              apiStatus={apiStatus}
            />
          </Form>
        )}
      </Formik>
    </SideNavLayout>
  );
};

export default AddVendorWrapper;
