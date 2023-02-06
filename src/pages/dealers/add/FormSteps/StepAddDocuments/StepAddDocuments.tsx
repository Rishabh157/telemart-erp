import React from "react";
import { FormikProps, FieldArray } from "formik";
import ATMFilePickerWrapper from "src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { FormInitialValues } from "../../AddDealerWrapper";
import { FieldType } from "./StepAddDocumentsWrapper";
import { MdDeleteOutline } from "react-icons/md";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
  formFields: { sectionName: string; fields: FieldType[] }[];
};

const StepAddDocuments = ({ formikProps, formFields }: Props) => {
  const { values, setFieldValue }: { values: any; setFieldValue: any } =
    formikProps;

  return (
    <div className="">
      {formFields?.map((formField, index) => {
        const { sectionName, fields } = formField;
        return (
          <div key={index} className={`py-6 px-7 border-b border-slate-400`}>
            <div className="text-primary-main text-lg pb-2 font-medium ">
              {sectionName}
            </div>

            <div className="grid grid-cols-3 gap-4 gap-y-4">
              {fields?.map((field: FieldType) => {
                const {
                  type = "text",
                  name,
                  label,
                  placeholder,
                  offset,
                } = field;
                switch (type) {
                  case "text":
                    return (
                      <>
                        <ATMTextField
                          key={name}
                          name={name}
                          value={values[name]}
                          onChange={(e) => {
                            setFieldValue(name, e.target.value);
                          }}
                          label={label}
                          placeholder={placeholder}
                          className="shadow bg-white rounded"
                        />
                        {offset &&
                          Array(offset)
                            .fill(null)
                            .map(() => <div></div>)}
                      </>
                    );

                  case "file-picker":
                    return (
                      <>
                        <ATMFilePickerWrapper
                          name={name}
                          key={name}
                          label={label}
                          placeholder={placeholder}
                          onSelect={(newFile) => setFieldValue(name, newFile)}
                          selectedFile={values[name]}
                        />

                        {offset &&
                          Array(offset)
                            .fill(null)
                            .map(() => <div></div>)}
                      </>
                    );

                  default:
                    return null;
                }
              })}
            </div>
          </div>
        );
      })}

      <FieldArray name="other_documents">
        {({ push, remove }) => {
          return (
            <>
              {values.other_documents?.map(
                (otherDocument: any, otherDocumentIndex: number) => {
                  return (
                    <div className={`py-6 px-7 border-b border-slate-400`}>
                      <div className="text-primary-main text-lg pb-2 font-medium flex justify-between items-center ">
                        Other Documents #{otherDocumentIndex + 1}
                        {/* Delete Button */}
                        {values.other_documents?.length > 1 && (
                          <button
                            type="button"
                            onClick={() => remove(otherDocumentIndex)}
                            className="p-1 bg-red-500 text-white rounded"
                          >
                            <MdDeleteOutline className="text-2xl" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-4 gap-y-5">
                        <ATMTextField
                          name={`other_documents[${otherDocumentIndex}].document_name`}
                          value={otherDocument.document_name}
                          onChange={(e) => {
                            setFieldValue(
                              `other_documents[${otherDocumentIndex}].document_name`,
                              e.target.value
                            );
                          }}
                          label={"Document Name"}
                          placeholder={"Document Name"}
                          className="shadow bg-white rounded"
                        />

                        <ATMFilePickerWrapper
                          name={`other_documents[${otherDocumentIndex}].document_name`}
                          label={"Document File"}
                          placeholder={"Document File"}
                          onSelect={(newFile) =>
                            setFieldValue(
                              `other_documents[${otherDocumentIndex}].document_name`,
                              newFile
                            )
                          }
                          selectedFile={otherDocument.document_name}
                        />

                        <div></div>
                      </div>
                    </div>
                  );
                }
              )}

              <div className="flex justify-end px-6 py-6">
                <button
                  type="button"
                  onClick={() =>
                    push({
                      document_name: "",
                      document_file: "",
                    })
                  }
                  className="px-3 py-1 rounded bg-primary-main text-white"
                >
                  Add New
                </button>
              </div>
            </>
          );
        }}
      </FieldArray>
    </div>
  );
};

export default StepAddDocuments;
