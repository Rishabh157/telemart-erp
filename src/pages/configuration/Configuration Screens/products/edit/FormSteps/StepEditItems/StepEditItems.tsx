import React from "react";
import { FormikProps } from "formik";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import ATMSelect from "src/components/UI/atoms/formFields/ATMSelect/ATMSelect";
import { FormInitialValues } from "../../EditProductWrapper";
import { FieldArray } from "formik";
import { MdDeleteOutline } from "react-icons/md";
import { DropdownOptions } from "./StepEditItemsWrapper";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
  dropdownOptions: DropdownOptions;
};

const StepEditItems = ({ formikProps, dropdownOptions }: Props) => {
  const { values, setFieldValue } = formikProps;

  return (
    <div className="py-6 ">
      <FieldArray name="items">
        {({ push, remove }) => (
          <div className="">
            {values?.items?.map((item, itemIndex) => {
              const { itemId, itemQuantity } = item;

              return (
                <div
                  key={itemIndex}
                  className={`flex flex-col gap-3 pb-6 px-7 ${
                    itemIndex !== values?.items?.length - 1 && "border-b"
                  }  border-slate-300 `}
                >
                  <div className="flex justify-between items-center">
                    <div className="text-primary-main text-lg pb-2 font-medium ">
                      Item #{itemIndex + 1}
                    </div>
                    {/* Delete Button */}
                    {values.items?.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(itemIndex)}
                        className="p-1 bg-red-500 text-white rounded"
                      >
                        <MdDeleteOutline className="text-2xl" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-4 gap-4 gap-y-5">
                    {/* Item Name */}
                    <ATMSelect
                      name={`items[${itemIndex}].itemId`}
                      value={itemId}
                      onChange={(e) => {
                        setFieldValue(
                          `items[${itemIndex}].itemId`,
                          e.target.value
                        );
                      }}
                      size="small"
                      label="Item Name"
                      options={dropdownOptions?.itemOptions || []}
                    />

                    {/* Item Quantity */}
                    <ATMTextField
                      name={`items[${itemIndex}].itemQuantity`}
                      value={itemQuantity}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        if (!isNaN(Number(inputValue))) {
                          setFieldValue(
                            `items[${itemIndex}].itemQuantity`,
                            e.target.value
                          );
                        }
                      }}
                      label="Item Quantity"
                      placeholder="Item Quantity"
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
                    itemId: "",
                    itemQuantity: "",
                  })
                }
                className="bg-primary-main px-3 py-1 text-white rounded"
              >
                Edit More Item
              </button>
            </div>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default StepEditItems;
