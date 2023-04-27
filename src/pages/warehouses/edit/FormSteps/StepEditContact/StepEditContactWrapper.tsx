import React from "react";
import { FormikProps } from "formik";
import { FormInitialValues } from "../../EditWarehouseWrapper";
import StepEditContact from "./StepEditContact";
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
        name: "mobileNumber",
        label: "Mobile Number",
        placeholder: "Mobile Number",
      },
      {
        name: "landLine",
        label: "Landline",
        placeholder: "Landline",
      },
    ],
  },
];

const StepEditContactWrapper = ({ formikProps }: Props) => {
  return (
    <>
      <StepEditContact formikProps={formikProps} formFields={formFields} />
    </>
  );
};

export default StepEditContactWrapper;
