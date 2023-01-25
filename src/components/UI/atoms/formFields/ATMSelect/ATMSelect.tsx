import React from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { ErrorMessage } from "formik";

type Props = {
  options: any[];
  value: any;
  onChange: (value: any) => void;
  label?: string;
  required?: boolean;
  size?: "small" | "medium";
  name: string;
};

const ATMSelect = ({
  options,
  label,
  required = false,
  value,
  onChange,
  size = "small",
  name,
}: Props) => {
  return (
    <>
      <div className="relative ">
        {label && (
          <label className="text-slate-700 font-medium">
            {label} {required && <span className="text-red-500"> * </span>}
          </label>
        )}
        <FormControl fullWidth>
          <Select
            name={name}
            value={value}
            onChange={onChange}
            size={size}
            className="shadow mt-2"
            displayEmpty
          >
            <MenuItem value="">
              <span className="text-slate-400">Select {label}</span>
            </MenuItem>
            {options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
    </>
  );
};
export default ATMSelect;
