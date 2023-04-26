import React from "react";
import ATMFilePickerWrapper from "src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";

const AccordianDocument = (data: any) => {
  return (
    <div className="grid grid-cols-3 gap-4 gap-y-5">
      <ATMTextField
        name=""
        value={data?.data?.document?.gstNumber}
        onChange={(e) => {}}
        label={"GST No."}
        placeholder={"GST No."}
        className="shadow bg-white rounded"
        disabled={true}
      />

      <ATMFilePickerWrapper
        name=""
        label="GST Certificate"
        placeholder="GST Certificate"
        onSelect={(newFile) => {}}
        selectedFile={data?.data?.document?.gstCertificate}
        disabled={true}
      />

      <ATMFilePickerWrapper
        name=""
        label="Declaration Form"
        placeholder="Declaration Form"
        onSelect={(newFile) => {}}
        selectedFile={data?.data?.document?.declarationForm}
        disabled={true}
      />
    </div>
  );
};

export default AccordianDocument;
