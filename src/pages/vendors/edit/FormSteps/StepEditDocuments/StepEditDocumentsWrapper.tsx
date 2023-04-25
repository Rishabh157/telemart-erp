import React from "react";
import { FormikProps } from "formik";
import { FormInitialValues } from "../../EditVendorWrapper";
import StepEditDocuments from "./StepEditDocuments";
import { Field } from "src/models/FormField/FormField.model";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
};

const formFields: { sectionName: string; fields: Field<"">[] }[] = [
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
        // type: "file-picker",
      },
      {
        name: "declaration_form",
        label: "Declaration Form",
        placeholder: "Declaration Form",
        // type: "file-picker",
      },
    ],
  },
];

const StepEditDocumentsWrapper = ({ formikProps }: Props) => {
  return (
    <>
      <StepEditDocuments formikProps={formikProps} formFields={formFields} />
    </>
  );
};

export default StepEditDocumentsWrapper;
