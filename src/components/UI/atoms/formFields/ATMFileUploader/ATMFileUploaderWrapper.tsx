import React from "react";
import { Size } from "src/utils/formUtils/getInputHeight";
import ATMFileUploader from "./ATMFileUploader";

type Props = {
  size?: Size;
  label?: string;
  required?: boolean;
  placeholder?: string;
  onSelect: (file :File) => void;
  selectedFile: File;
};

const ATMFilePickerWrapper = ({
  size = "small",
  label = "",
  required = false,
  placeholder = "",
  onSelect,
  selectedFile
}: Props) => {



  return (
    <div>
      <ATMFileUploader
        size={size}
        label={label}
        required={required}
        placeholder={placeholder}
        onSelect= {onSelect}
        selectedFile={selectedFile}
      />
    </div>
  );
};

export default ATMFilePickerWrapper;
