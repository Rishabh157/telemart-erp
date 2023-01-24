import React from 'react'
import { FormikProps } from "formik";
import { FormInitialValues } from "../../AddVendorWrapper";
import StepAddBankDetails from './StepAddBankDetails';
import { Field } from 'src/models/FormField/FormField.model';

type Props = {
  formikProps: FormikProps<FormInitialValues>;
};

const formFields: { sectionName: string; fields: Field<"accountTypeOptions">[] }[] = [
  {
    sectionName: "Bank Information",
    fields: [
      {
        name: "bank_name",
        label: "Bank Name",
        placeholder: "Bank Name",
      },
      {
        name: "branch",
        label: "Branch Name",
        placeholder: "Branch Name",
      },
      {
        name: "account_holder_name",
        label: "Account Holder Name",
        placeholder: "Account Holder Name",
      },
      {
        name: "account_number",
        label: "Account Number",
        placeholder: "Account Number",
      },
      {
        name: "ifsc_no",
        label: "IFSC No.",
        placeholder: "IFSC No.",
      },
      {
        name: "account_type",
        label: "Account Type",
        placeholder: "Account Type",
        type: "select",
        optionAccessKey: "accountTypeOptions",
      },
      {
        name: "cancelled_cheque",
        label: "Cancelled Cheque",
        placeholder: "Cancelled Cheque",
        type: "file-picker",
      },
    ],
  },
];

const accountTypeOptions=   [
  { label: "Savings", value: "SAVINGS" },
  { label: "Current", value: "CURRENT" },
]

const StepAddBankDetailsWrapper = ({ formikProps }: Props) => {
  
  const dropdownOptions = {
    accountTypeOptions,
  };

  return (
    <>
    <StepAddBankDetails formikProps={formikProps} formFields= {formFields} dropdownOptions={dropdownOptions}/>
    </>
  )
}

export default StepAddBankDetailsWrapper