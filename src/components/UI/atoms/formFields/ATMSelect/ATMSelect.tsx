import { ThemeContext } from "@emotion/react";
import React, { useEffect, useState } from "react";
import Select, { Options } from "react-select";

type Props = {
  options: any[];
  value: any;
  onChange: (value: any) => void;
  label?: string;
  required?: boolean;


};

const ATMSelect = ({ 
  options, 
  label,
  required= false, 
  value,
  onChange,
}: Props) => {
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className="relative flex flex-col">
        {label && (
          <label className="text-slate-500">
            {label} {required && <span className="text-red-500"> * </span>}
          </label>
        )}
        <Select
          name="color"
          
          className={`basic-single  ${label && 'mt-1'}`}
          theme= {(theme)=> {
            return {
              ...theme,
              borderRadius: 0,
              spacing: {
                ...theme.spacing,
                controlHeight: 40
              }
            }
          }}
          // classNamePrefix="select"
          value={value}
          onChange={(newValue) => onChange(newValue)}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isSearchable={isSearchable}
          options={options}
          isOptionSelected={(option, selectValue) => {
            console.log(option, selectValue);
            return option.value === selectValue[0].value;
          }}
          formatOptionLabel={(data) => {
            return <div style={{ color: data.color }}> {data.label} </div>;
          }}
        />
      </div>
    </>
  );
};
export default ATMSelect;
