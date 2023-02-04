import React from "react";
import { Size } from "src/utils/formUtils/getInputHeight";
import ATMFileUploader from "./ATMFileUploader";
import { ErrorMessage } from "formik";

type Props = {
  size?: Size;
  label?: string;
  required?: boolean;
  placeholder?: string;
  onSelect: (file: File) => void;
  selectedFile: any;
  name: string;
  accept?:string;
  disabled?: boolean;
};

const ATMFilePickerWrapper = ({
  name,
  size = "small",
  label = "",
  required = false,
  placeholder = "",
  onSelect,
  selectedFile,
  accept= "image/*",
  disabled,
}: Props) => {
  return (
    <div className="relative">
      <ATMFileUploader
        size={size}
        label={label}
        required={required}
        placeholder={placeholder}
        onSelect={onSelect}
        selectedFile={selectedFile}
        accept={accept}
        disabled={disabled}
      />

      {name && (
        <ErrorMessage name={name}>
          {(errMsg) => (
            <p className="font-poppins absolute text-[14px] text-start mt-0 text-red-500">
              {errMsg}
            </p>
          )}
        </ErrorMessage>
      )}
    </div>
  );
};

export default ATMFilePickerWrapper;
