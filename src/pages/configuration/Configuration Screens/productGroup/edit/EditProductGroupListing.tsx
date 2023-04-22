import React from "react";
import { FormikProps } from "formik";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMPageHeading from "src/components/UI/atoms/ATMPageHeading/ATMPageHeading";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { FormInitialValues } from "./EditProductGroupWrapper";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
  apiStatus:boolean
};

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
  {
    label: "Product Group",
    path: "/configurations/product-group",
  },
  {
    label: "Edit Product Group",
  },
];

const EditProductGroupListing = ({ formikProps, apiStatus }: Props) => {
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
          <ATMPageHeading> Edit Product Group </ATMPageHeading>
        </div>

        <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
          <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
            {/* Form Heading */}
            <div className="text-xl font-medium"> Product-Group Details</div>

            {/* BUTTON - Add Button */}
            <div>
              <button
                type="button"
                disabled={apiStatus}
                onClick={() => formikProps.handleSubmit()}
                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${true?"disabled:opacity-25":""}`}

              >
                Update
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="grow py-8 px-3 ">
            <div className="grid grid-cols-3 gap-4">
              {/* Field1 */}
              <ATMTextField
                name="groupName"
                value={values.groupName}
                label="Group Name"
                placeholder="Group Name"
                onChange={(e) => setFieldValue("groupName", e.target.value)}
              />       
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditProductGroupListing;
