import React from "react";
import { FormikProps } from "formik";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { FormInitialValues } from "../../AddCompanyWrapper";
import ATMFilePickerWrapper from "src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
};

const StepAddCompanyDetails = ({ formikProps }: Props) => {
  const { values, setFieldValue } = formikProps;

  return (
    <div className="py-6 px-7">
      <div className="grid grid-cols-3 gap-4 gap-y-5">

        {/* Company Name */}
        <ATMTextField
          name="company_name"
          value={values.company_name}
          onChange={(e) => {
            setFieldValue("company_name", e.target.value);
          }}
          label="Company Name"
          placeholder="Company Name"
          className="shadow bg-white rounded"
        />

        {/* Website URL */}
        <ATMTextField
          name="website_url"
          value={values.website_url}
          onChange={(e) => {
            setFieldValue("website_url", e.target.value);
          }}
          label="Website URL"
          placeholder="Website URL"
          className="shadow bg-white rounded"
        />

        {/* Company Logo */}
        <ATMFilePickerWrapper
          name="company_logo"
          selectedFile={values.company_logo}
          onSelect= {(newFile)=> setFieldValue("company_logo", newFile)}
          label="Company Logo"
          placeholder="Company Logo"
        />

        {/* GST NO. */}
        <ATMTextField
          name="gst_no"
          value={values.gst_no}
          onChange={(e) => {
            setFieldValue("gst_no", e.target.value);
          }}
          label="GST NO."
          placeholder="GST NO."
          className="shadow bg-white rounded"
        />

        {/* Address */}
        <ATMTextField
          name="address"
          value={values.address}
          onChange={(e) => {
            setFieldValue("address", e.target.value);
          }}
          label="Address"
          placeholder="Address"
          className="shadow bg-white rounded"
        />

        {/* Phone No. */}
        <ATMTextField
          name="phone_no"
          value={values.phone_no}
          onChange={(e) => {
            setFieldValue("phone_no", e.target.value);
          }}
          label="Phone No."
          placeholder="Phone No."
          className="shadow bg-white rounded"
        />
      </div>
    </div>
  );
};

export default StepAddCompanyDetails;
