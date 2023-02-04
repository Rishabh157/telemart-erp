import React from "react";
import { FormikProps } from "formik";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMPageHeading from "src/components/UI/atoms/ATMPageHeading/ATMPageHeading";
import ATMSelect from "src/components/UI/atoms/formFields/ATMSelect/ATMSelect";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { SelectOption } from "src/models/FormField/FormField.model";
import { FormInitialValues } from "./AddProductSubCategoryWrapper";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
  dropdownOptions: {
    subCategoryNameOptions: SelectOption[];
    parentCategoryOptions: SelectOption[];
    applicableTaxesOptions: SelectOption[];
  };
};

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
  {
    label: "Product Sub Category",
    path: "/configurations/product-sub-category/add",
  },
  {
    label: "Add Product Sub Category",
  },
];

const AddProductSubCategory = ({ formikProps ,dropdownOptions}: Props) => {
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
          <ATMPageHeading> Add New Product Sub Category </ATMPageHeading>
        </div>

        <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
          <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
            {/* Form Heading */}
            <div className="text-xl font-medium"> Product Sub Category Details </div>

            {/* BUTTON - Add Button */}
            <div>
              <button
                type="button"
                onClick={() => formikProps.handleSubmit()}
                className="bg-primary-main rounded py-1 px-5 text-white border border-primary-main "
              >
                Add Subcategory
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="grow py-8 px-3 ">
            <div className="grid grid-cols-3 gap-4">
              {/* subCategoryCode */}
              <ATMTextField
                name="subCategoryCode"
                value={values.subCategoryCode}
                label="Sub Category Code"
                placeholder="Sub Category Code"
                onChange={(e) => setFieldValue("subCategoryCode", e.target.value)}
              />

              {/* Field 2 */}
              <ATMSelect
                name="subCategoryName"
                value={values.subCategoryName}
                onChange={(e) => setFieldValue("subCategoryName", e.target.value)}
                options={dropdownOptions.subCategoryNameOptions}
                label="Sub Category Name"
              />

              <ATMSelect
                name="parentCategory"
                value={values.parentCategory}
                onChange={(e) => setFieldValue("parentCategory", e.target.value)}
                options={dropdownOptions.parentCategoryOptions}
                label="Parent Category"
              />

              <ATMSelect
                name="applicableTaxes"
                value={values.applicableTaxes}
                onChange={(e) => setFieldValue("applicableTaxes", e.target.value)}
                options={dropdownOptions.applicableTaxesOptions}
                label="Applicable Taxes"
              />

              {/* Field 3 */}
              <ATMTextField
                name="hsnCode"
                value={values.hsnCode}
                label="HSN Code"
                placeholder="HSN Code"
                onChange={(e) => setFieldValue("hsnCode", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductSubCategory;
