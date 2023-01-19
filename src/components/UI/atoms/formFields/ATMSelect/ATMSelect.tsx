import { ThemeContext } from "@emotion/react";
import { ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import Select, { Options } from "react-select";
import { getInputHeight } from "src/utils/formUtils/getInputHeight";

type Props = {
  options: any[];
  value: any;
  onChange: (value: any) => void;
  label?: string;
  required?: boolean;
  size?: "small" | "medium" | "large";
  name?: string;
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
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className="relative ">
        {label && (
          <label className="text-slate-500">
            {label} {required && <span className="text-red-500"> * </span>}
          </label>
        )}
        <Select
          name="color"
          className={`basic-single  ${label && "mt-1"}`}
          theme={(theme) => {
            return {
              ...theme,
              borderRadius: 0,
              spacing: {
                ...theme.spacing,
                controlHeight: parseInt(`${getInputHeight(size, true)}`),
              },
            };
          }}
          value={value}
          onChange={(newValue) => onChange(newValue)}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isSearchable={isSearchable}
          options={options}
          isOptionSelected={(option, selectValue) => {
            return option.value === selectValue[0].value;
          }}
          formatOptionLabel={(data) => {
            return <div style={{ color: data.color }}> {data.label} </div>;
          }}
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
    </>
  );
};
export default ATMSelect;
