import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FormikProps } from "formik";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { Field, SelectOption } from "src/models/FormField/FormField.model";
import { FormInitialValues } from "../../AddVendorWrapper";

type DropdownOptions = {
  companyTypeOptions: SelectOption[],
  ownershipTypeOptions: SelectOption[],
}

type FieldType = Field<"companyTypeOptions" | "ownershipTypeOptions">

type Props = {
  formikProps: FormikProps<FormInitialValues>;
  dropdownOptions : DropdownOptions;
  formFields: FieldType[]
};

const StepAddComapnyDetails = ({
  formikProps,
  dropdownOptions,
  formFields
}: Props) => {

  const {values , setFieldValue  } :{ values: any; setFieldValue: any } = formikProps

  return (
    <div className="py-6 px-7">
      <div className="grid grid-cols-4 gap-4 gap-y-6">
        {formFields?.map((field: FieldType) => {
          const { type = "text", name, label, placeholder }  = field;

          switch (type) {

            case "text":
              return (
                <ATMTextField
                  key={name}
                  name={name}
                  value={values[name]}
                  onChange={(e) => { setFieldValue(name , e.target.value) }}
                  label={label}
                  placeholder={placeholder}
                  className="shadow bg-white rounded"
                />
              );

            case "select":
              return (
                <div key={name} >
                  <InputLabel className="mb-2"> {label} </InputLabel>
                  <FormControl fullWidth>
                    <Select
                      name={name}
                      value={values[name]}
                      onChange={(e) => { setFieldValue(name , e.target.value) }}
                      size="small"
                      className="shadow"
                      displayEmpty
                    >
                      <MenuItem value="">
                        <span className="text-slate-400">
                          Select {label}
                        </span>
                      </MenuItem>
                      {dropdownOptions[
                        field.optionAccessKey || "companyTypeOptions"
                      ]?.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {" "}
                          {option.label}{" "}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              );

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default StepAddComapnyDetails;
