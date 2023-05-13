import React, { useEffect } from "react";
import { Form, Formik, FormikProps } from "formik";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { array, mixed, object, string } from "yup";
import AddDealers from "./AddDealers";
import StepAddDealerDetailsWrapper from "./FormSteps/StepAddDealerDetails/StepAddDealerDetailsWrapper";
import StepAddAddressWrapper from "./FormSteps/StepAddAddress/StepAddAddressWrapper";
import StepAddContactWrapper from "./FormSteps/StepAddContact/StepAddContactWrapper";
import StepAddDocumentsWrapper from "./FormSteps/StepAddDocuments/StepAddDocumentsWrapper";
import { useAddDealerMutation } from "src/services/DealerServices";
import { showToast } from "src/utils";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { useGetAllDealerCategoryQuery } from "src/services/DealerCategoryService";
import { setAllDealerCategory } from "src/redux/slices/dealersCategorySlice";

// TYPE-  Form Intial Values
export type FormInitialValues = {
  dealerCode: string;
  firmName: string;
  firstName: string;
  lastName: string;
  dealerCategory: string;
  email: string;
  registrationAddress: {
    phone: string;
    address: string;
    country: string;
    state: string;
    district: string;
    pincode: string;
  };
  billingAddress: {
    phone: string;
    address: string;
    country: string;
    state: string;
    district: string;
    pincode: string;
  };
  contactInformation: {
    name: string;
    department: string;
    designation: string;
    email: string;
    mobileNumber: string;
    landLine: string;
  }[];
  document: {
    gstNumber: string;
    gstCertificate: string;
    adharCardNumber: string;
    adharCard: string;
  };
  otherDocument: {
    documentName: string;
    documentFile: string;
  }[];
};

// Form Steps
const steps = [
  {
    label: "Dealer Details",
    component: StepAddDealerDetailsWrapper,
    validationSchema: object({
      dealerCode: string().required("dealer code is required"),
      firmName: string().required("firm name is required"),
      firstName: string().required("first name is required"),
      lastName: string().required("LastName is required"),
      dealerCategory: string().required("please choose dealer category"),
      email: string().email("email is inavlid").required("email is required"),
    }),
  },
  {
    label: "Regd./Billing address",
    component: StepAddAddressWrapper,
    validationSchema: object({
      registrationAddress: object().shape({
        phone: string()
          .min(10, "Number should be !0 digits")
          .max(10, "maximum 10 digit")
          .required("Phone number is required"),
        address: string().required("Address is required"),
        country: string().required("Please choose a country"),
        state: string().required("Please choose a state"),
        district: string().required("Please choose a district"),
        pincode: string().required("Please choose a pincode"),
      }),
      billingAddress: object().shape({
        phone: string()
          .min(10, "Number should be !0 digits")
          .max(10, "maximum 10 digit")
          .required("Phone number is required"),
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
      contactInformation: array().of(
        object().shape({
          name: string().required("Name is required"),
          department: string().required("Department is required"),
          designation: string().required("Designation is required"),
          email: string().email("Email should be valid").required("Email is required").trim(),
          mobileNumber: string()
            .min(10, "Number should be 10 digits")
            .max(10, "maximum 10 digit")
            .required("Mobile number is required"),
          landLine: string()
            .min(10, "Number should be 10 digits")
            .max(10, "maximum 10 digit")
            .required("Landline is required")
        })
      ),
    }),
  },
  {
    label: "Document",
    component: StepAddDocumentsWrapper,
    validationSchema: object({
      document: object().shape({
        gstNumber: string().required("GST number is required"),
        gstCertificate: mixed().required("GST certificate is required"),
        adharCardNumber: mixed().required("Declaration form is required"),
        adharCard: mixed().required("Declaration form is required"),
      }),
      otherDocument: array().of(
        object().shape({
          documentName: string().required("documentName is required"),
          documentFile: string().required("documentFile is required"),
        })
      ),
    }),
  },
];

//Form validation schema based on the active step

// On Submit Handler
// const onSubmitHandler = (values: FormInitialValues) => {
//   if (activeStep === steps.length - 1) {
//     setTimeout(() => {
//       console.log(values);
//       setActiveStep(0);
//     }, 1000);
//   } else {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   }
// };

const AddDealerWrapper = () => {
  // States
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [addDealer] = useAddDealerMutation();
  const { userData } = useSelector((state: RootState) => state?.auth);

  // From Initial Values
  const initialValues: FormInitialValues = {
    dealerCode: "",
    firmName: "",
    firstName: "",
    lastName: "",
    dealerCategory: "",
    email: "",
    registrationAddress: {
      phone: "",
      address: "",
      country: "",
      state: "",
      district: "",
      pincode: "",
    },
    
    billingAddress: {
      phone: "",
      address: "",
      country: "",
      state: "",
      district: "",
      pincode: "",
    },
    contactInformation: [
      {
        name: "",
        department: "",
        designation: "",
        email: "",
        mobileNumber: "",
        landLine: "",
      },
    ],
    document: {
      gstNumber: "",
      gstCertificate: "",
      adharCardNumber: "",
      adharCard: "",
    },
    otherDocument: [
      {
        documentName: "",
        documentFile: "",
      },
    ],
  };

  const getValidationSchema = (activeStep: number) => {
    return steps.find((_, stepIndex) => stepIndex === activeStep)
      ?.validationSchema;
  };

  const dispatch = useDispatch();
  const { data, isLoading, isFetching } = useGetAllDealerCategoryQuery("");

  const { alldealerCategory }: any = useSelector(
    (state: RootState) => state.dealersCategory
  );
  
  useEffect(() => {
    if (!isFetching && !isLoading) {
      dispatch(setAllDealerCategory(data?.data));
    }
  }, [data, isLoading, isFetching, dispatch]);

  const dealerCategoryOptions = alldealerCategory?.map((ele: any) => {
    return {
      label: ele?.dealersCategory,
      value: ele?._id,
    };
  });

  const onSubmitHandler = (values: FormInitialValues) => {
    if (activeStep === steps.length - 1) {
      setTimeout(() => {
        addDealer({
          dealerCode: values.dealerCode,
          firmName: values.firmName,
          firstName: values.firstName,
          lastName: values.lastName,
          dealerCategory: values.dealerCategory,
          email: values.email,
          registrationAddress: {
            phone: values.registrationAddress.phone,
            address: values.registrationAddress.address,
            country: values.registrationAddress.country,
            state: values.registrationAddress.state,
            district: values.registrationAddress.district,
            pincode: values.registrationAddress.pincode,
          },
          billingAddress: {
            phone: values.billingAddress.phone,
            address: values.billingAddress.address,
            country: values.billingAddress.country,
            state: values.billingAddress.state,
            district: values.billingAddress.district,
            pincode: values.billingAddress.pincode,
          },
          contactInformation: values.contactInformation,
          document: {
            gstNumber: values.document.gstNumber,
            gstCertificate: values.document.gstCertificate,
            adharCardNumber: values.document.adharCardNumber,
            adharCard: values.document.adharCard,
          },
          otherDocument: values.otherDocument,
          companyId: userData?.companyId || "",
        }).then((res) => {
          if ("data" in res) {
            if (res?.data?.status) {
              showToast("success", "Dealer added successfully!");
              navigate("/dealers");
            } else {
              showToast("error", res?.data?.message);
            }
          } else {
            showToast("error", "Something went wrong");
          }
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
        validateOnChange={true}
      >
        {(formikProps: FormikProps<FormInitialValues>) => (
          <Form className="">
            <AddDealers
              formikProps={formikProps}
              steps={steps}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              dealerCategoryOptions={dealerCategoryOptions}
            />
          </Form>
        )}
      </Formik>
    </SideNavLayout>
  );
};

export default AddDealerWrapper;
