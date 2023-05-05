import React from "react";
import { FormikProps } from "formik";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMPageHeading from "src/components/UI/atoms/ATMPageHeading/ATMPageHeading";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { FormInitialValues } from "./AddBarcodeWrapper";
import ATMSelect from "src/components/UI/atoms/formFields/ATMSelect/ATMSelect";
import { SelectOption } from "src/models/FormField/FormField.model";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
  apiStatus: boolean;
  productGroupOption: SelectOption[];
};

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
  {
    label: "Barcode",
    path: "/configurations/barcode",
  },
  {
    label: "Add Barcode",
  },
];

const AddBarcode = ({ formikProps, apiStatus, productGroupOption }: Props) => {
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
          <ATMPageHeading> Add New Product Group </ATMPageHeading>
        </div>

        <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
          <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
            {/* Form Heading */}
            <div className="text-xl font-medium"> Product Group</div>

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
                Add Product Group
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="grow py-8 px-3 ">
            <div className="grid grid-cols-3 gap-4">
              {/* Product Group  */}
              <ATMSelect
                name="productGroup"
                value={values.productGroup}
                label="Product Group"
                onChange={(e) => setFieldValue("productGroup", e.target.value)}
                options={productGroupOption}
              />

              {/* Quantity  */}
              <ATMTextField
                name="quantity"
                value={values.quantity}
                label="Quantity"
                placeholder="Quantity"
                onChange={(e) => setFieldValue("quantity", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBarcode;
