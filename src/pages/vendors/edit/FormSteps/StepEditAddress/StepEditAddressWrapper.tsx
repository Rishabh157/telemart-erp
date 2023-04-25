import React from "react";
import { FormikProps } from "formik";
import { FormInitialValues } from "../../EditVendorWrapper";
import StepEditAddress from "./StepEditAddress";
import { Field } from "src/models/FormField/FormField.model";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
};

const formFields: {
  sectionName: string;
  fields: Field<
    | "counrtyOptions"
    | "stateOptions"
    | "districtOptions"
    | "pincodeOptions"
    | "billingCounrtyOptions"
    | "billingStateOptions"
    | "billingDistrictOptions"
    | "billingPincodeOptions"
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
        optionAccessKey: "billingCounrtyOptions",
      },
      {
        name: "billing_address.state",
        label: "State",
        placeholder: "State",
        type: "select",
        optionAccessKey: "billingStateOptions",
      },
      {
        name: "billing_address.district",
        label: "District",
        placeholder: "District",
        type: "select",
        optionAccessKey: "billingDistrictOptions",
      },
      {
        name: "billing_address.pincode",
        label: "Pincode",
        placeholder: "Pincode",
        type: "select",
        optionAccessKey: "billingPincodeOptions",
      },
    ],
  },
];

const counrtyOptions = [{ label: "India", value: "642fb4e74c10a952c9d07658" }];
const stateOptions = [
  { label: "Madhya Pradesh", value: "6438fd9609cc7c2501185b08" },
];
const districtOptions = [
  { label: "Indore", value: "642e5aab3423c2437bd4e82d" },
];
const pincodeOptions = [{ label: "452001", value: "642e5b56217227fdefabb1f6" }];
const billingCounrtyOptions = [
  { label: "America", value: "642e4867f9d8e678a47304cd" },
];
const billingStateOptions = [
  { label: "Madhya Pradesh", value: "6438fd9609cc7c2501185b08" },
];
const billingDistrictOptions = [
  { label: "Indore", value: "642e5aab3423c2437bd4e82d" },
];
const billingPincodeOptions = [
  { label: "452001", value: "642e5b56217227fdefabb1f6" },
];

const StepEditAddressWrapper = ({ formikProps }: Props) => {
  const dropdownOptions = {
    counrtyOptions,
    stateOptions,
    districtOptions,
    pincodeOptions,
    billingCounrtyOptions,
    billingStateOptions,
    billingDistrictOptions,
    billingPincodeOptions,
  };

  return (
    <>
      <StepEditAddress
        formikProps={formikProps}
        formFields={formFields}
        dropdownOptions={dropdownOptions}
      />
    </>
  );
};

export default StepEditAddressWrapper;
