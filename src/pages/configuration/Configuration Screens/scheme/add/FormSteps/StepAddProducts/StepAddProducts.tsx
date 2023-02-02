import React from "react";
import { FormikProps } from "formik";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { FormInitialValues } from "../../AddSchemeWrapper";
import { FieldArray } from "formik";
import { MdDeleteOutline } from "react-icons/md";
import { DropdownOptions } from "./StepAddProductsWrapper";
import ATMSelect from "src/components/UI/atoms/formFields/ATMSelect/ATMSelect";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
  dropdownOptions: DropdownOptions;
};

const StepAddProducts = ({ formikProps, dropdownOptions }: Props) => {
  const { values, setFieldValue } = formikProps;

  return (
    <div className=" ">
      <FieldArray name="products">
        {({ push, remove }) => (
          <div className="">
            {values.products?.map((product, productIndex) => {
              const { product_name, quantity, mrp, offer_price } = product;

              return (
                <div
                  key={productIndex}
                  className={`flex flex-col gap-3 py-6 px-7 ${
                    productIndex !== values.products.length - 1 && "border-b"
                  }  border-slate-300 `}
                >
                  <div className="flex justify-between items-center">
                    <div className="text-primary-main text-lg pb-2 font-medium ">
                      Product Information #{productIndex + 1}
                    </div>
                    {/* Delete Button */}
                    {values.products?.length > 1 && (
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
                    {/* Product Name */}
                    <div className="col-span-2">
                      <ATMSelect
                        name={`products[${productIndex}].product_name`}
                        value={product_name}
                        onChange={(e) => {
                          setFieldValue(
                            `products[${productIndex}].product_name`,
                            e.target.value
                          );
                        }}
                        label="Product Name"
                        options={dropdownOptions.productOptions}
                      />
                    </div>

                    {/* Product Quantity */}
                    <ATMTextField
                      name={`products[${productIndex}].quantity`}
                      value={quantity.toString()}
                      onChange={(e) => {
                        setFieldValue(
                          `products[${productIndex}].quantity`,
                          e.target.value
                        );
                      }}
                      label="Product Quantity"
                      placeholder="Product Quantity"
                      className="shadow bg-white rounded"
                    />

                    {/* MRP */}
                    <ATMTextField
                      name={`products[${productIndex}].mrp`}
                      value={mrp.toString()}
                      onChange={(e) => {
                        setFieldValue(
                          `products[${productIndex}].mrp`,
                          e.target.value
                        );
                      }}
                      label="MRP"
                      placeholder="MRP"
                      className="shadow bg-white rounded"
                    />

                    {/* POP  */}
                    <ATMTextField
                      name={`products[${productIndex}].offer_price`}
                      value={offer_price.toString()}
                      onChange={(e) => {
                        setFieldValue(
                          `products[${productIndex}].offer_price`,
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
                    product_name: "",
                    quantity: "",
                    mrp: 0,
                    offer_price: 0,
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

export default StepAddProducts;
