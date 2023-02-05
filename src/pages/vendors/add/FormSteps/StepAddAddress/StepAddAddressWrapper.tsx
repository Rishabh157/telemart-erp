import React from "react";
import { FormikProps } from "formik";
import { FormInitialValues } from "../../AddVendorWrapper";
import StepAddAddress from "./StepAddAddress";
import { Field } from "src/models/FormField/FormField.model";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
};

const formFields: {
  sectionName: string;
  fields: Field<
    "counrtyOptions" | "stateOptions" | "districtOptions" | "pincodeOptions"
  >[];
}[] = [
  {
    sectionName: "Registration  Address",
    fields: [
      {
        name: "regd_address.phone",
        label: "Phone",
        placeholder: "Phone",
      },
      {
        name: "regd_address.address",
        label: "Address",
        placeholder: "Address",
      },
      {
        name: "regd_address.country",
        label: "Country",
        placeholder: "Country",
        type: "select",
        optionAccessKey: "counrtyOptions",
      },
      {
        name: "regd_address.state",
        label: "State",
        placeholder: "State",
        type: "select",
        optionAccessKey: "stateOptions",
      },
      {
        name: "regd_address.district",
        label: "District",
        placeholder: "District",
        type: "select",
        optionAccessKey: "districtOptions",
      },
      {
        name: "regd_address.pincode",
        label: "Pincode",
        placeholder: "Pincode",
        type: "select",
        optionAccessKey: "pincodeOptions",
      },
    ],
  },

  {
    sectionName: "Billing Address",
    fields: [
      {
        name: "billing_address.phone",
        label: "Phone",
        placeholder: "Phone",
      },
      {
        name: "billing_address.address",
        label: "Address",
        placeholder: "Address",
      },
      {
        name: "billing_address.country",
        label: "Country",
        placeholder: "Country",
        type: "select",
        optionAccessKey: "counrtyOptions",
      },
      {
        name: "billing_address.state",
        label: "State",
        placeholder: "State",
        type: "select",
        optionAccessKey: "stateOptions",
      },
      {
        name: "billing_address.district",
        label: "District",
        placeholder: "District",
        type: "select",
        optionAccessKey: "districtOptions",
      },
      {
        name: "billing_address.pincode",
        label: "Pincode",
        placeholder: "Pincode",
        type: "select",
        optionAccessKey: "pincodeOptions",
      },
    ],
  },
];

const counrtyOptions = [{ label: "India", value: "india" }];
const stateOptions = [{ label: "Madhya Pradesh", value: "MP" }];
const districtOptions = [{ label: "Indore", value: "indore" }];
const pincodeOptions = [{ label: "452001", value: "452001" }];

const StepAddAddressWrapper = ({ formikProps }: Props) => {
  const dropdownOptions = {
    counrtyOptions,
    stateOptions,
    districtOptions,
    pincodeOptions,
  };

  return (
    <>
      <StepAddAddress formikProps={formikProps} formFields={formFields} dropdownOptions= {dropdownOptions} />
    </>
  );
};

export default StepAddAddressWrapper;
