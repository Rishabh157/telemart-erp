import React from "react";
import ATMFilePickerWrapper from "src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";

type Props = {};

const AccordianDocument = (props: Props) => {
  return (
    <div className="grid grid-cols-3 gap-4 gap-y-5">
      <ATMTextField
        name=""
        value={"GST No."}
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
        selectedFile={"https://picsum.photos/200/300"}
        disabled={true}
        
      />

      <ATMFilePickerWrapper
        name=""
        label="Declaration Form"
        placeholder="Declaration Form"
        onSelect={(newFile) => {}}
        selectedFile={"https://picsum.photos/200/300"}
        disabled={true}
      />
    </div>
  );
};

export default AccordianDocument;
