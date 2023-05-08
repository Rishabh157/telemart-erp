import { FormikProps } from "formik";
import React from "react";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { FormInitialValues } from "../../AddWarehouseWrapper";
import { Field, SelectOption } from "src/models/FormField/FormField.model";
import ATMSelect from "src/components/UI/atoms/formFields/ATMSelect/ATMSelect";

type DropdownOptions = {
  counrtyOptions: SelectOption[];
  stateOptions: SelectOption[];
  districtOptions: SelectOption[];
  pincodeOptions: SelectOption[];
  billingCounrtyOptions: SelectOption[];
  billingStateOptions: SelectOption[];
  billingDistrictOptions: SelectOption[];
  billingPincodeOptions: SelectOption[];
};
export type FieldType = Field<
  | "counrtyOptions"
  | "stateOptions"
  | "districtOptions"
  | "pincodeOptions"
  | "billingCounrtyOptions"
  | "billingStateOptions"
  | "billingDistrictOptions"
  | "billingPincodeOptions"
>;
type Props = {
  formikProps: FormikProps<FormInitialValues>;
  formFields: {
    sectionName: string;
    fields: FieldType[];
  }[];
  dropdownOptions: DropdownOptions;
};

const StepAddAddress = ({
  formikProps,
  formFields,
  dropdownOptions,
}: Props) => {
  const { values, setFieldValue }: { values: any; setFieldValue: any } =
    formikProps;

  return (
    <div className="">
      {formFields?.map((formField, index) => {
        const { sectionName, fields } = formField;
        return (
          <div
            key={index}
            className={`py-6 px-7 ${
              index !== formFields?.length - 1 && "border-b"
            }  border-slate-300`}
          >
            <div className="text-primary-main text-lg pb-2 font-medium">
              {sectionName}
            </div>

            <div className="grid grid-cols-4 gap-4 gap-y-5">
              {fields?.map((field: FieldType) => {
                const { type = "text", name, label, placeholder } = field;

                switch (type) {
                  case "text":
                    return (
                      <ATMTextField
                        maxLength={
                          name === "regd_address.phone" ||
                          name === "billing_address.phone"
                            ? 10
                            : 100
                        }
                        key={name}
                        name={name}
                        value={
                          name.includes(".")
                            ? values[name.split(".")[0]][name.split(".")[1]]
                            : values[name]
                        }
                        onChange={(e) => {
                          if (
                            name === "regd_address.phone" ||
                            name === "billing_address.phone"
                          ) {
                            const inputValue = e.target.value;
                            if (!isNaN(Number(inputValue))) {
                              setFieldValue(name, String(inputValue));
                            }
                          } else {
                            setFieldValue(name, e.target.value);
                          }
                        }}
                        label={label}
                        placeholder={placeholder}
                        className="shadow bg-white rounded"
                      />
                    );

                  case "select":
                    return (
                      <div>
                      <ATMSelect
                        label={label}
                        name={name}
                        value={
                          name.includes(".")
                            ? values[name.split(".")[0]][name.split(".")[1]]
                            : values[name]
                        }
                        onChange={(e: any) => {
                          setFieldValue(name, e.target.value);
                        }}
                        options={
                          dropdownOptions[
                            field.optionAccessKey || "counrtyOptions"
                          ]
                        }
                      />
                    </div>
                    );

                  default:
                    return null;
                }
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StepAddAddress;
