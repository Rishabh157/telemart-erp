import React from 'react'
import { FormikProps } from "formik";
import { FormInitialValues } from "../../AddCompanyWrapper";
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
        name: "branch_name",
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