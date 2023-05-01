import React from "react";
import { FormikProps } from "formik";
import { FormInitialValues } from "../../EditProductWrapper";
import { FieldArray } from "formik";
import { MdDeleteOutline } from "react-icons/md";
import { EditorState } from "draft-js";
import ATMHTMLEditor from "src/components/UI/atoms/formFields/ATMHTMLEditor/ATMHTMLEditor";
import { DropdownOptions } from "./StepEditCallScriptWrapper";
import ATMSelect from "src/components/UI/atoms/formFields/ATMSelect/ATMSelect";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
  dropdownOptions: DropdownOptions;
};

const StepEditCallScript = ({ formikProps, dropdownOptions }: Props) => {
  const { values, setFieldValue } = formikProps;

  return (
    <div className=" ">
      <FieldArray name="call_scripts">
        {({ push, remove }) => (
          <div className="">
            {values.call_scripts?.map((script, scriptIndex) => {
              const { language } = script;
              return (
                <div
                  key={scriptIndex}
                  className={`flex flex-col gap-3 py-6 px-7 ${
                    scriptIndex !== values.call_scripts.length - 1 && "border-b"
                  }  border-slate-300 `}
                >
                  <div className="flex justify-between items-center">
                    <div className="text-primary-main text-lg pb-2 font-medium ">
                      Script #{scriptIndex + 1}
                    </div>
                    {/* Delete Button */}
                    {values.call_scripts?.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(scriptIndex)}
                        className="p-1 bg-red-500 text-white rounded"
                      >
                        <MdDeleteOutline className="text-2xl" />
                      </button>
                    )}
                  </div>

                  <div>
                    <ATMHTMLEditor
                      name={`call_scripts[${scriptIndex}].script`}
                      value={script.script}
                      onChange={(newValue) =>
                        setFieldValue(
                          `call_scripts[${scriptIndex}].script`,
                          newValue
                        )
                      }
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-4 gap-y-5 my-3">
                    <ATMSelect
                      name={`call_scripts[${scriptIndex}].language`}
                      value={language}
                      onChange={(e) => {
                        setFieldValue(
                          `call_scripts[${scriptIndex}].language`,
                          e.target.value
                        );
                      }}
                      size="small"
                      label="Language"
                      options={dropdownOptions?.langaugeOption}
                    />
                  </div>
                </div>
              );
            })}

            {/* BUTTON- Edit More Script */}
            <div className="flex justify-end p-5">
              <button
                type="button"
                onClick={() =>
                  push({
                    script: EditorState.createEmpty(),
                    language: "",
                  })
                }
                className="bg-primary-main px-3 py-1 text-white rounded"
              >
                Edit More Script
              </button>
            </div>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default StepEditCallScript;
