import React from "react";
import { FieldArray, FormikProps } from "formik";
import { MdDeleteOutline } from "react-icons/md";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { FormInitialValues } from "../../EditDealerWrapper";
import { FieldType } from "./StepEditContactWrapper";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
  formFields: { sectionName: string; fields: FieldType[] }[]
};

const StepEditContact = ({ formikProps , formFields }: Props) => {
  const { values, setFieldValue }: { values: any; setFieldValue: any } =
    formikProps;
  return (
    <div className="">
      <FieldArray name="contactInformation">
        {({ push, remove }) => {
          return (
            <div className="">
              {values?.contactInformation?.map(
                (contactInformation: any, contactInformationIndex: number) => {
                  return (
                    <div
                      key={contactInformationIndex}
                      className={`border-b border-slate-300`}
                    >
                      {formFields?.map((formField, index) => {
                        const { sectionName, fields } = formField;
                        return (
                          <div key={index} className={`py-6 px-7`}>
                            <div className="text-primary-main text-lg pb-2 font-medium flex justify-between items-center">
                              {sectionName} #{contactInformationIndex + 1}
                              
                              {/* Delete Button */}
                              {values.contactInformation?.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    remove(contactInformationIndex)
                                  }
                                  className="p-1 bg-red-500 text-white rounded"
                                >
                                  <MdDeleteOutline className="text-2xl" />
                                </button>
                              )}
                            </div>

                            <div className="grid grid-cols-4 gap-4 gap-y-5">
                              {fields?.map((field: FieldType) => {
                                const {
                                  type = "text",
                                  name,
                                  label,
                                  placeholder,
                                } = field;

                                switch (type) {
                                  case "text":
                                    return (
                                      <ATMTextField
                                        key={name}
                                        name={`contactInformations[${contactInformationIndex}].${name}`}
                                        value={contactInformation[name]}
                                        onChange={(e) => {
                                          setFieldValue(
                                            `contactInformation[${contactInformationIndex}].${name}`,
                                            e.target.value
                                          );
                                        }}
                                        label={label}
                                        placeholder={placeholder}
                                        className="shadow bg-white rounded"
                                      />
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
                }
              )}

              <div className="flex justify-end p-5">
                <button
                  type="button"
                  onClick={() =>
                    push({
                      name: "",
                      department: "",
                      designation: "",
                      email: "",
                      mobile_number: "",
                      landline: "",
                    })
                  }
                  className="bg-primary-main px-3 py-1 text-white rounded"
                >
                  Add New
                </button>
              </div>
            </div>
          );
        }}
      </FieldArray>
    </div>
  );
};

export default StepEditContact;
