import React from "react";
import { FormikProps, FieldArray } from "formik";
import { MdDeleteOutline } from "react-icons/md";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMPageHeading from "src/components/UI/atoms/ATMPageHeading/ATMPageHeading";
import ATMSelect from "src/components/UI/atoms/formFields/ATMSelect/ATMSelect";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { SelectOption } from "src/models/FormField/FormField.model";
import { FormInitialValues } from "./AddSaleOrderWrapper";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
  dropdownOptions: {
    dealerOptions: SelectOption[];
    warehouseOptions: SelectOption[];
    productOptions: SelectOption[];
  };
};

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
  {
    label: "Sale Order",
    path: "/sale-order",
  },
  {
    label: "Add Sale Order",
  },
];

const AddSaleOrder = ({ formikProps, dropdownOptions }: Props) => {
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
          <ATMPageHeading> Add New Sale Order </ATMPageHeading>
        </div>

        <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
          <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
            {/* Form Step Label */}
            <div className="text-xl font-medium"> SO Details </div>

            {/* BUTTON - Add SO */}
            <div>
              <button
                type="button"
                onClick={() => formikProps.handleSubmit()}
                className="bg-primary-main rounded py-1 px-5 text-white border border-primary-main "
              >
                Add SO
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="grow py-8 px-3 ">
            <div className="grid grid-cols-3 gap-4">
              {/* SO Number */}
              <ATMTextField
                name="sale_order_number"
                value={values.sale_order_number}
                label="SO Number"
                placeholder="SO Number"
                onChange={(e) =>
                  setFieldValue("sale_order_number", e.target.value)
                }
              />

              {/* Dealer */}
              <ATMSelect
                name="dealer"
                value={values.dealer}
                onChange={(e) => setFieldValue("dealer", e.target.value)}
                options={dropdownOptions.dealerOptions}
                label="Dealer"
              />

              {/* Warehouse */}
              <ATMSelect
                name="warehouse"
                value={values.warehouse}
                onChange={(e) => setFieldValue("warehouse", e.target.value)}
                options={dropdownOptions.warehouseOptions}
                label="Warehouse"
              />
            </div>
          </div>

          {/*  Products  */}
          <div className="px-3">
            <div className=" text-lg pb-2 font-medium text-primary-main">
              Add Product to sale order
            </div>

            <FieldArray name="products">
              {({ push, remove }) => {
                return (
                  <>
                    <div className="flex flex-col gap-y-5">
                      {values.products?.map((product, productIndex) => {
                        return (
                          <div
                            key={productIndex}
                            className="flex gap-3 items-end "
                          >
                            {/* Product Name */}
                            <div className="flex-1">
                              <ATMSelect
                                name={`products[${productIndex}].product_name`}
                                value={product.product_name}
                                onChange={(e) =>
                                  setFieldValue(
                                    `products[${productIndex}].product_name`,
                                    e.target.value
                                  )
                                }
                                options={dropdownOptions.productOptions}
                                label="Product Name"
                              />
                            </div>

                            {/* Rate */}
                            <div className="flex-1">
                              <ATMTextField
                                type="number"
                                min={0}
                                name={`products[${productIndex}].rate`}
                                value={product.rate?.toString() || ""}
                                label="Rate"
                                placeholder="Rate"
                                onChange={(e) =>
                                  setFieldValue(
                                    `products[${productIndex}].rate`,
                                    e.target.value
                                  )
                                }
                              />
                            </div>

                            {/* Quantity */}
                            <div className="flex-1">
                              <ATMTextField
                                type="number"
                                min={0}
                                name={`products[${productIndex}].quantity`}
                                value={product.quantity?.toString() || ""}
                                label="Quantity"
                                placeholder="Quantity"
                                onChange={(e) =>
                                  setFieldValue(
                                    `products[${productIndex}].quantity`,
                                    e.target.value
                                  )
                                }
                              />
                            </div>

                            {/* BUTTON - Delete */}
                            {values.products?.length > 1 && (
                              <div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    remove(productIndex);
                                  }}
                                  className="p-2 bg-red-500 text-white rounded"
                                >
                                  <MdDeleteOutline className="text-2xl" />
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* BUTTON - Add More Product */}
                    <div className="flex justify-end py-5">
                      <button
                        type="button"
                        onClick={() =>
                          push({
                            product_name: "",
                            rate: null,
                            quantity: null,
                          })
                        }
                        className="bg-primary-main px-3 py-1 text-white rounded"
                      >
                        Add More Product
                      </button>
                    </div>
                  </>
                );
              }}
            </FieldArray>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSaleOrder;
