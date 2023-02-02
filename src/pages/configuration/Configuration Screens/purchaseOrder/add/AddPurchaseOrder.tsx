import React from "react";
import { FormikProps, FieldArray } from "formik";
import { MdDeleteOutline } from "react-icons/md";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMPageHeading from "src/components/UI/atoms/ATMPageHeading/ATMPageHeading";
import ATMSelect from "src/components/UI/atoms/formFields/ATMSelect/ATMSelect";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { DropdownOptions, FormInitialValues } from "./AddPurchaseOrderWrapper";
import ATMDatePicker from "src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
  dropdownOptions: DropdownOptions;
};

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
  {
    label: "Purchase Order",
    path: "/configurations/purchase-order",
  },
  {
    label: "Add Purchase Order",
  },
];

const AddPurchaseOrder = ({ formikProps, dropdownOptions }: Props) => {
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
          <ATMPageHeading> Add New Purchase Order </ATMPageHeading>
        </div>

        <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
          <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
            {/* Form Step Label */}
            <div className="text-xl font-medium"> PO Details </div>

            {/* BUTTON - Add SO */}
            <div>
              <button
                type="button"
                onClick={() => formikProps.handleSubmit()}
                className="bg-primary-main rounded py-1 px-5 text-white border border-primary-main "
              >
                Add PO
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="grow py-8 px-3 ">
            <div className="grid grid-cols-3 gap-4">
              {/* PO Code */}
              <ATMTextField
                name="purchase_order_code"
                value={values.purchase_order_code}
                label="PO Code"
                placeholder="PO Code"
                onChange={(e) =>
                  setFieldValue("purchase_order_code", e.target.value)
                }
              />

              {/* Vendor */}
              <ATMSelect
                name="vendor"
                value={values.vendor}
                onChange={(e) => setFieldValue("vendor", e.target.value)}
                options={dropdownOptions.vendorOptions}
                label="Vendor"
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

          {/*  Items  */}
          <div className="px-3">
            <div className=" text-lg pb-2 font-medium text-primary-main">
              Add item to purchase order
            </div>

            <FieldArray name="items">
              {({ push, remove }) => {
                return (
                  <>
                    <div className="flex flex-col gap-y-5">
                      {values.items?.map((item, itemIndex) => {
                        const {
                          item_name,
                          rate,
                          quantity,
                          est_receiving_date,
                        } = item;

                        return (
                          <div
                            key={itemIndex}
                            className="flex gap-3 items-end "
                          >
                            {/* Item Name */}
                            <div className="flex-[3_3_0%]">
                              <ATMSelect
                                name={`items[${itemIndex}].item_name`}
                                value={item_name}
                                onChange={(e) =>
                                  setFieldValue(
                                    `items[${itemIndex}].item_name`,
                                    e.target.value
                                  )
                                }
                                options={dropdownOptions.itemOptions}
                                label="Item Name"
                              />
                            </div>

                            {/* Rate */}
                            <div className="flex-[2_2_0%]">
                              <ATMTextField
                                type="number"
                                min={0}
                                name={`items[${itemIndex}].rate`}
                                value={rate?.toString() || ""} 
                                label="Rate"
                                placeholder="Rate"
                                onChange={(e) =>
                                  setFieldValue(
                                    `items[${itemIndex}].rate`,
                                    e.target.value
                                  )
                                }
                              />
                            </div>

                            {/* Quantity */}
                            <div className="flex-[2_2_0%]">
                              <ATMTextField
                                type="number"
                                min={0}
                                name={`items[${itemIndex}].quantity`}
                                value={quantity?.toString() || ""}
                                label="Quantity"
                                placeholder="Quantity"
                                onChange={(e) =>
                                  setFieldValue(
                                    `items[${itemIndex}].quantity`,
                                    e.target.value
                                  )
                                }
                              />
                            </div>

                            {/* Est. Receiving Date */}
                            <div className="flex-[3_3_0%]">
                              <ATMDatePicker
                                name={`items[${itemIndex}].est_receiving_date`}
                                value={est_receiving_date}
                                label="Est. Receiving Date"
                                onChange={(newValue) =>
                                  setFieldValue(
                                    `items[${itemIndex}].est_receiving_date`,
                                    newValue
                                  )
                                }
                              />
                            </div>

                            {/* BUTTON - Delete */}
                            {values.items?.length > 1 && (
                              <div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    remove(itemIndex);
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
                            item_name: "",
                            rate: null,
                            quantity: null,
                            est_receiving_date:null

                          })
                        }
                        className="bg-primary-main px-3 py-1 text-white rounded"
                      >
                        Add More Item
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

export default AddPurchaseOrder;
