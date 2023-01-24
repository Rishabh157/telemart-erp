import React from "react";
import { FormikProps } from "formik";
import { FormInitialValues } from "../../AddDealerWrapper";
import StepAddDocuments from "./StepAddDocuments";
import { Field } from "src/models/FormField/FormField.model";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
};

export type FieldType = Field<"">;

const formFields: { sectionName: string; fields: FieldType[] }[] = [
  {
    sectionName: "Documents",
    fields: [
      {
        name: "gst_no",
        label: "GST No.",
        placeholder: "GST No.",
      },
      {
        name: "gst_certificate",
        label: "GST Certificate",
        placeholder: "GST Certificate",
        type: "file-picker",
        offset: 1,
      },
      {
        name: "aadhar_no",
        label: "Aadhar No.",
        placeholder: "Aadhar No.",
      },
      {
        name: "aadhar_certificate",
        label: "Aadhar Card",
        placeholder: "Aadhar Card",
        type: "file-picker",
        offset: 1,
      },
    ],
  },
];

const StepAddDocumentsWrapper = ({ formikProps }: Props) => {
  return (
    <>
      <StepAddDocuments formikProps={formikProps} formFields={formFields} />
    </>
  );
};

export default StepAddDocumentsWrapper;
