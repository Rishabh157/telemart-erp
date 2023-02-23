import React from "react";
import { FormikProps } from "formik";
import { FormInitialValues } from "../../AddWarehouseWrapper";
import StepAddContact from "./StepAddContact";
import { Field } from "src/models/FormField/FormField.model";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
};

export type FieldType = Field<"">;

const formFields: { sectionName: string; fields: FieldType[] }[] = [
  {
    sectionName: "Contact Information",
    fields: [
      {
        name: "name",
        label: "Name",
        placeholder: "Name",
      },
      {
        name: "department",
        label: "Department",
        placeholder: "Department",
      },
      {
        name: "designation",
        label: "Designation",
        placeholder: "Designation",
      },
      {
        name: "email",
        label: "Email",
        placeholder: "Email",
      },
      {
        name: "mobile_number",
        label: "Mobile Number",
        placeholder: "Mobile Number",
      },
      {
        name: "landline",
        label: "Landline",
        placeholder: "Landline",
      },
    ],
  },
];

const StepAddContactWrapper = ({ formikProps }: Props) => {
  return (
    <>
      <StepAddContact formikProps={formikProps} formFields={formFields} />
    </>
  );
};

export default StepAddContactWrapper;
