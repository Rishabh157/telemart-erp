import React from "react";
import { FieldArray, FormikProps } from "formik";
import { MdDeleteOutline } from "react-icons/md";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";

import { FormInitialValues } from "../../AddVendorWrapper";
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
      <FieldArray name="contact_informations">
        {({ push, remove }) => {
          return (
            <div className="">
              {values?.contact_informations?.map(
                (contactInformation: any, contactInformationIndex: number) => {
                  const {
                    name,
                    department,
                    designation,
                    email,
                    mobileNumber,
                    landLine,
                  } = contactInformation;
                  return (
                    <div
                      key={contactInformationIndex}
                      className={`border-b border-slate-300`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="text-primary-main text-lg pb-2 font-medium ">
                          Contact Information {contactInformationIndex + 1}
                        </div>
                        {/* Delete Button */}
                        {values.contact_informations?.length > 1 && (
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
                            name={`contact_informations[${contactInformationIndex}].name`}
                            value={name}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setFieldValue(
                                `contact_informations[${contactInformationIndex}].name`,
                                e.target.value
                              );
                            }}
                            label="Name"
                            placeholder="name"
                            className="shadow bg-white rounded"
                          />
                          {/* MRP */}
                          <ATMTextField
                            name={`contact_informations[${contactInformationIndex}].department`}
                            value={department}
                            onChange={(e) => {
                              setFieldValue(
                                `contact_informations[${contactInformationIndex}].department`,
                                e.target.value
                              );
                            }}
                            label="Department"
                            placeholder="department"
                            className="shadow bg-white rounded"
                          />
                          {/* POP  */}
                          <ATMTextField
                            name={`contact_informations[${contactInformationIndex}].designation`}
                            value={designation}
                            onChange={(e) => {
                              setFieldValue(
                                `contact_informations[${contactInformationIndex}].designation`,
                                e.target.value
                              );
                            }}
                            label="Desgination"
                            placeholder="Desgination"
                            className="shadow bg-white rounded"
                          />
                          {/* email  */}
                          <ATMTextField
                            name={`contact_informations[${contactInformationIndex}].email`}
                            value={email}
                            onChange={(e) => {
                              setFieldValue(
                                `contact_informations[${contactInformationIndex}].email`,
                                e.target.value
                              );
                            }}
                            label="Email"
                            placeholder="email"
                            className="shadow bg-white rounded"
                          />
                          {/*  mobileNumber */}
                          <ATMTextField
                            name={`contact_informations[${contactInformationIndex}].mobileNumber`}
                            value={mobileNumber}
                            onChange={(e) => {
                              const inputValue = e.target.value;
                              if (!isNaN(Number(inputValue))) {
                                setFieldValue(
                                  `contact_informations[${contactInformationIndex}].mobileNumber`,
                                  e.target.value
                                );
                              }
                            }}
                            label="Mobile Number"
                            placeholder="Mobile Number"
                            className="Mobile Number"
                          />
                          <ATMTextField
                            name={`contact_informations[${contactInformationIndex}].landLine`}
                            value={landLine}
                            onChange={(e) => {
                              const inputValue = e.target.value;
                              if (!isNaN(Number(inputValue))) {
                                setFieldValue(
                                  `contact_informations[${contactInformationIndex}].landLine`,
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
