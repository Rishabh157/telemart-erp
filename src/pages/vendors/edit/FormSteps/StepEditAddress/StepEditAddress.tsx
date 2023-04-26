import React from "react";
import { FormikProps } from "formik";
import ATMSelect from "src/components/UI/atoms/formFields/ATMSelect/ATMSelect";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { Field, SelectOption } from "src/models/FormField/FormField.model";
import { FormInitialValues } from "../../EditVendorWrapper";

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

type FieldType = Field<
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
              index !== formFields.length - 1 && "border-b"
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
                        key={name}
                        name={name}
                        value={
                          name.includes(".")
                            ? values[name.split(".")[0]][name.split(".")[1]]
                            : values[name]
                        }
                        onChange={(e) => {
                          setFieldValue(name, e.target.value);
                        }}
                        label={label}
                        placeholder={placeholder}
                        className="shadow bg-white rounded"
                      />
                    );

                  case "select":
                    return (
                      <div key={name}>
                        <ATMSelect
                          label={label}
                          name={name}
                          value={
                            name.includes(".")
                              ? values[name.split(".")[0]][name.split(".")[1]]
                              : values[name]
                          }
                          onChange={(e) => {
                            setFieldValue(name, e.target.value);
                            if (name === "regd_address.country") {
                              formikProps.setFieldValue(
                                "regd_address.district",
                                ""
                              );
                              formikProps.setFieldValue(
                                "regd_address.state",
                                ""
                              );
                              formikProps.setFieldValue(
                                "regd_address.pincode",
                                ""
                              );
                            }
                            if (name === "billing_address.country") {
                              formikProps.setFieldValue(
                                "billing_address.district",
                                ""
                              );
                              formikProps.setFieldValue(
                                "billing_address.state",
                                ""
                              );
                              formikProps.setFieldValue(
                                "billing_address.pincode",
                                ""
                              );
                            }
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
