import React from "react";
import { FormikProps } from "formik";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMPageHeading from "src/components/UI/atoms/ATMPageHeading/ATMPageHeading";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { FormInitialValues } from "./EditItemWrapper";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
  apiStatus: boolean;
};

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
  {
    label: "Items",
    path: "/configurations/item",
  },
  {
    label: "Update Item",
  },
];

const EditItem = ({ formikProps, apiStatus }: Props) => {
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
          <ATMPageHeading> Update Item </ATMPageHeading>
        </div>

        <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
          <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
            {/* Form Heading */}
            <div className="text-xl font-medium"> Item Details </div>

            {/* BUTTON - Add Button */}
            <div>
              <button
                type="button"
                disabled={apiStatus}
                onClick={() => formikProps.handleSubmit()}
                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
                  apiStatus ? "opacity-50" : ""
                }`}
              >
                Update
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="grow py-8 px-3 ">
            <div className="grid grid-cols-3 gap-4">
              {/* itemCode */}
              <ATMTextField
                name="itemCode"
                value={values.itemCode}
                label="Item Code"
                placeholder="Item Code"
                onChange={(e) => setFieldValue("itemCode", e.target.value)}
              />
              {/* itemName */}
              <ATMTextField
                name="itemName"
                value={values.itemName}
                label="Item Name"
                placeholder="Item Name"
                onChange={(e) => setFieldValue("itemName", e.target.value)}
              />
              {/* itemWeight */}
              <ATMTextField
                name="itemWeight"
                value={values.itemWeight}
                label="Item Weight (in gms)"
                placeholder="Item Weight"
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (!isNaN(Number(inputValue))) {
                    setFieldValue("itemWeight", inputValue);
                  }
                }}
              />              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItem;
