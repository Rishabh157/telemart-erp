import React from "react";
import ATMFilePickerWrapper from "src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";

type Props = {};

const otherDocumentList = Array(3).fill(null);

const AccordianDocument = (props: Props) => {
  return (
    <div>
      <div className={`pb-5 border-b border-slate-400`}>
        <div className="text-primary-main text-lg pb-2 font-medium ">
          Documents
        </div>

        <div className="grid grid-cols-3 gap-4 gap-y-4">
          <ATMTextField
            name=""
            value={"23A458596854"}
            onChange={() => {}}
            label={"GST No."}
            placeholder={"GST No."}
            className="shadow bg-white rounded"
          />
          <ATMFilePickerWrapper
            name=""
            label={"GST Certificate"}
            placeholder={"GST Certificate"}
            onSelect={() => {}}
            selectedFile={""}
            disabled={true}
          />

          <div></div>

          <ATMTextField
            name=""
            value={"22569857452"}
            onChange={() => {}}
            label={"Aadhar No."}
            placeholder={"Aadhar No."}
            className="shadow bg-white rounded"
          />
          <ATMFilePickerWrapper
            name=""
            label={"Aadhar Card"}
            placeholder={"Aadhar Card"}
            onSelect={() => {}}
            selectedFile={""}
            disabled={true}
          />
        </div>
      </div>

      {otherDocumentList.map((otherDocument, otherDocumentIndex) => (
        <div className={`py-5  border-b border-slate-400`}>
          <div className="text-primary-main text-lg pb-2 font-medium ">
            Other Documents #{otherDocumentIndex +1}
          </div>

          <div className="grid grid-cols-3 gap-4 gap-y-4">
            <ATMTextField
              name=""
              value={"Other Docs"}
              onChange={() => {}}
              label={"Document Name"}
              placeholder={"Document Name"}
              className="shadow bg-white rounded"
            />
            <ATMFilePickerWrapper
              name=""
              label={"Document File"}
              placeholder={"Document File"}
              onSelect={() => {}}
              selectedFile={""}
              disabled={true}
            />

            <div></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccordianDocument;
