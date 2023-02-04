import React from "react";
import { FormikProps, FieldArray } from "formik";
import { MdDeleteOutline } from "react-icons/md";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMPageHeading from "src/components/UI/atoms/ATMPageHeading/ATMPageHeading";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { FormInitialValues } from "./AddASRWrapper";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
};

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
  {
    label: "ASR",
    path: "/configurations/asr",
  },
  {
    label: "Add ASR",
  },
];

const AddASR = ({ formikProps }: Props) => {
  const { values, setFieldValue } = formikProps;

  return (
    <div className="">
      <div className="p-4 flex flex-col gap-2  ">
        {/* Breadcrumbs */}
        <div className="">
          <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
        </div>

        {/* Page Heading */}
        <div className="pt-1">
          <ATMPageHeading> Add New ASR </ATMPageHeading>
        </div>

        <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
          <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
            {/* Form Heading */}
            <div className="text-xl font-medium"> ASR Details </div>

            {/* BUTTON - Add Button */}
            <div>
              <button
                type="button"
                onClick={() => formikProps.handleSubmit()}
                className="bg-primary-main rounded py-1 px-5 text-white border border-primary-main "
              >
                Add ASR
              </button>
            </div>
          </div>

          {/* Form */}
          <FieldArray name="asr_details">
            {({ push, remove }) => {
              return (
                <div className="">
                  {values?.asr_details?.map((asr: any, asrIndex: number) => {
                    const { product_name, quantity } = asr;

                    return (
                      <div
                        key={asrIndex}
                        className={`border-b border-slate-300`}
                      >
                        <div className={`py-6 px-7`}>
                          <div className="text-primary-main text-lg pb-2 font-medium flex justify-between items-center">
                            ASR #{asrIndex + 1}
                            {/* Delete Button */}
                            {values.asr_details?.length > 1 && (
                              <button
                                type="button"
                                onClick={() => remove(asrIndex)}
                                className="p-1 bg-red-500 text-white rounded"
                              >
                                <MdDeleteOutline className="text-2xl" />
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-3 gap-4 gap-y-5">
                            {/* Product Name */}
                            {/* <div className="flex-1"> */}
                              <ATMTextField
                                name={`asr_details[${asrIndex}].product_name`}
                                value={product_name}
                                label="Product Name"
                                placeholder="Product Name"
                                onChange={(e) =>
                                  setFieldValue(
                                    `asr_details[${asrIndex}].product_name`,
                                    e.target.value
                                  )
                                }
                              />
                            {/* </div> */}

                            {/* Quantity */}
                            {/* <div className="flex-1"> */}
                              <ATMTextField
                                name={`asr_details[${asrIndex}].quantity`}
                                value={quantity}
                                label="Quantity"
                                placeholder="Quantity"
                                onChange={(e) =>
                                  setFieldValue(
                                    `asr_details[${asrIndex}].quantity`,
                                    e.target.value
                                  )
                                }
                              />
                            {/* </div> */}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/*BUTTON - Add New */}
                  <div className="flex justify-end p-5">
                    <button
                      type="button"
                      onClick={() =>
                        push({
                            product_name: "",
                            quantity: "",
                        })
                      }
                      className="bg-primary-main px-3 py-1 text-white rounded"
                    >
                      Add More
                    </button>
                  </div>
                </div>
              );
            }}
          </FieldArray>
        </div>
      </div>
    </div>
  );
};

export default AddASR;
