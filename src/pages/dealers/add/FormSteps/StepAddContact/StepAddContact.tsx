import React from "react";
import { FieldArray, FormikProps } from "formik";
import { MdDeleteOutline } from "react-icons/md";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { FormInitialValues } from "../../AddDealerWrapper";
import { FieldType } from "./StepAddContactWrapper";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
  formFields: { sectionName: string; fields: FieldType[] }[];
};

const StepAddContact = ({ formikProps, formFields }: Props) => {
  const { values, setFieldValue }: { values: any; setFieldValue: any } =
    formikProps;
  return (
    <div className="">
      <FieldArray name="contactInformation">
        {({ push, remove }) => {
          return (
            <div className="">
              {values?.contactInformation?.map(
                (contactInformations: any, contactInformationIndex: number) => {
                  const {
                    name,
                    department,
                    designation,
                    email,
                    mobileNumber,
                    landLine,
                  } = contactInformations;
                  return (
                    <div
                      key={contactInformationIndex}
                      className={`border-b border-slate-300`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="text-primary-main text-lg pb-2 font-medium mt-3 px-3">
                          Contact Information {contactInformationIndex + 1}
                        </div>
                        {/* Delete Button */}
                        {values.contactInformation?.length > 1 && (
                          <button
                            type="button"
                            onClick={() => remove(contactInformationIndex)}
                            className="p-1 bg-red-500 text-white rounded"
                          >
                            <MdDeleteOutline className="text-2xl" />
                          </button>
                        )}
                      </div>
                      <div className="py-6 px-7">
                      <div className="grid grid-cols-3 gap-4 gap-y-5">
                      <ATMTextField
                        name={`contactInformation[${contactInformationIndex}].name`}
                        value={name}
                        onChange={(e) => {
                          setFieldValue(
                            `contactInformation[${contactInformationIndex}].name`,
                            e.target.value
                          );
                        }}
                        label="Name"
                        placeholder="name"
                        className="shadow bg-white rounded"
                      />
                  
                      {/* MRP */}
                      <ATMTextField
                        name={`contactInformation[${contactInformationIndex}].department`}
                        value={department}
                        onChange={(e) => {
                          setFieldValue(
                            `contactInformation[${contactInformationIndex}].department`,
                            e.target.value
                          );
                        }}
                        label="Department"
                        placeholder="department"
                        className="shadow bg-white rounded"
                      />
                      {/* POP  */}
                      <ATMTextField
                        name={`contactInformation[${contactInformationIndex}].designation`}
                        value={designation}
                        onChange={(e) => {
                          setFieldValue(
                            `contactInformation[${contactInformationIndex}].designation`,
                            e.target.value
                          );
                        }}
                        label="Desgination"
                        placeholder="Desgination"
                        className="shadow bg-white rounded"
                      />
                      {/* email  */}
                      <ATMTextField
                        name={`contactInformation[${contactInformationIndex}].email`}
                        value={email}
                        onChange={(e) => {
                          setFieldValue(
                            `contactInformation[${contactInformationIndex}].email`,
                            e.target.value
                          );
                        }}
                        label="Email"
                        placeholder="email"
                        className="shadow bg-white rounded"
                      />
                      {/*  mobileNumber */}
                      <ATMTextField
                        name={`contactInformation[${contactInformationIndex}].mobileNumber`}
                        value={mobileNumber}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (!isNaN(Number(inputValue))) {
                            setFieldValue(
                              `contactInformation[${contactInformationIndex}].mobileNumber`,
                              e.target.value
                            );
                          }
                        }}
                        label="Mobile Number"
                        placeholder="Mobile Number"
                        className="shadow bg-white rounded"
                      />
                      <ATMTextField
                        name={`contactInformation[${contactInformationIndex}].landLine`}
                        value={landLine}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (!isNaN(Number(inputValue))) {
                            setFieldValue(
                              `contactInformation[${contactInformationIndex}].landLine`,
                              e.target.value
                            );
                          }
                        }}
                        label="LandLine"
                        placeholder="LandLine"
                        className="shadow bg-white rounded"
                      />
                    </div>
                    </div>
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
                      mobileNumber: "",
                      landLine: "",
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

export default StepAddContact;
