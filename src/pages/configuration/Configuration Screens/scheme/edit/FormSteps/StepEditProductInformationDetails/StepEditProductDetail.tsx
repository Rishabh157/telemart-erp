import React from "react";
import { FormikProps } from "formik";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { FormInitialValues } from "../../EditSchemeWrapper";
import { FieldArray } from "formik";
import { MdDeleteOutline } from "react-icons/md";
import { DropdownOptions } from "./StepEditProductDetailWrapper";
import ATMSelect from "src/components/UI/atoms/formFields/ATMSelect/ATMSelect";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
  dropdownOptions: DropdownOptions;
  
};

const StepEditProductDetail= ({ formikProps, dropdownOptions }: Props) => {
  const { values, setFieldValue } = formikProps;

  return (
    <div className="">
      <FieldArray name="productInformation">
        {({ push, remove }) => (
          <div className="">
            {values.productInformation?.map((product, productIndex) => {
              const { productGroup, productQuantity, mrp, pop } = product;

              return (
                <div
                  key={productIndex}
                  className={`flex flex-col gap-3 py-6 px-7 ${
                    productIndex !== values.productInformation.length - 1 && "border-b"
                  }  border-slate-300 `}
                >
                  <div className="flex justify-between items-center">
                    <div className="text-primary-main text-lg pb-2 font-medium ">
                      Product Information #{productIndex + 1}
                    </div>
                    {/* Delete Button */}
                    {values.productInformation?.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(productIndex)}
                        className="p-1 bg-red-500 text-white rounded"
                      >
                        <MdDeleteOutline className="text-2xl" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-5 gap-4 gap-y-5">
                    {/* Product Group */}
                    <div className="col-span-2">
                      <ATMSelect
                        name={`productInformation[${productIndex}].productGroup`}
                        value={productGroup}
                        onChange={(e) => {
                          setFieldValue(
                            `productInformation[${productIndex}].productGroup`,
                            e.target.value
                          );
                        }}
                        label="Product Group"
                        options={dropdownOptions.productGroupOptions}
                      />
                    </div>

                    {/* Product Quantity */}
                    <ATMTextField
                      name={`productInformation[${productIndex}].productQuantity`}
                      value={productQuantity.toString()}
                      onChange={(e) => {
                        setFieldValue(
                          `productInformation[${productIndex}].productQuantity`,
                          e.target.value
                        );
                      }}
                      label="Product Quantity"
                      placeholder="Product Quantity"
                      className="shadow bg-white rounded"
                    />

                    {/* MRP */}
                    <ATMTextField
                      name={`productInformation[${productIndex}].mrp`}
                      value={mrp.toString()}
                      onChange={(e) => {
                        setFieldValue(
                          `productInformation[${productIndex}].mrp`,
                          e.target.value
                        );
                      }}
                      label="MRP"
                      placeholder="MRP"
                      className="shadow bg-white rounded"
                    />

                    {/* POP  */}
                    <ATMTextField
                      name={`productInformation[${productIndex}].pop`}
                      value={pop.toString()}
                      onChange={(e) => {
                        setFieldValue(
                          `productInformation[${productIndex}].pop`,
                          e.target.value
                        );
                      }}
                      label="POP (product offer price)"
                      placeholder="POP (product offer price)"
                      className="shadow bg-white rounded"
                    />
                  </div>
                </div>
              );
            })}

            <div className="flex justify-end p-5">
              <button
                type="button"
                onClick={() =>
                  push({
                    productGroup: "",
                    productQuantity: "",
                    mrp: 0,
                    pop: 0,
                  })
                }
                className="bg-primary-main px-3 py-1 text-white rounded"
              >
                Add More Product
              </button>
            </div>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default StepEditProductDetail;
