import React from "react";
import { FormikProps } from "formik";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { FormInitialValues } from "../../EditProductWrapper";
import { FieldArray } from "formik";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
};

const StepEditTax = ({ formikProps }: Props) => {
  const { values, setFieldValue } = formikProps;

  return (
    <div className="py-6 ">
      <FieldArray name="taxes">
        {({ push, remove }) => (
          <div className="">
            {values.taxes?.map((tax, taxIndex) => {
              const { taxDetail, tax_rate } = tax;

              return (
                <div
                  key={taxIndex}
                  className={`flex flex-col gap-3 pb-6 px-7 border-slate-300 `}
                >
                  <div className="grid grid-cols-4 gap-4 gap-y-5">
                    {/* Tax Name */}
                    <div className="relative mt-4">
                      <label className="text-slate-700 font-medium">
                        {" "}
                        Tax Name{" "}
                      </label>
                      <div className="mt-2 bg-white border border-slate-400 rounded shadow h-[40px] flex items-center px-2 ">
                        {taxDetail.tax_name}
                      </div>
                    </div>

                    {/* Tax Rate */}
                    <ATMTextField
                      name={`taxes[${taxIndex}].tax_rate`}
                      value={tax_rate.toString()}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        if (!isNaN(Number(newValue))) {
                          setFieldValue(
                            `taxes[${taxIndex}].tax_rate`,
                            e.target.value
                          );
                        }
                      }}
                      label="Tax %"
                      placeholder="Tax %"
                      className="shadow bg-white rounded"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default StepEditTax;
