import React from "react";
import { FormikProps } from "formik";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMPageHeading from "src/components/UI/atoms/ATMPageHeading/ATMPageHeading";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { FormInitialValues } from "./EditTaxesWrapper";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
  apiStatus:boolean
};

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
  {
    label: "Taxes",
    path: "/configurations/taxes",
  },
  {
    label: "Edit Taxes",
  },
];

const EditTaxesListing = ({ formikProps, apiStatus }: Props) => {
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
          <ATMPageHeading> Edit Taxes </ATMPageHeading>
        </div>

        <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
          <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
            {/* Form Heading */}
            <div className="text-xl font-medium"> Taxes Details</div>

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
                name="taxName"
                value={values.taxName}
                label="Taxes Name"
                placeholder="Taxes Name"
                onChange={(e) => setFieldValue("taxName", e.target.value)}
              />       
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditTaxesListing;
