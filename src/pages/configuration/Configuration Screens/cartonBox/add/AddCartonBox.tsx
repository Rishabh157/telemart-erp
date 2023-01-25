import React from "react";
import { FormikProps } from "formik";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMPageHeading from "src/components/UI/atoms/ATMPageHeading/ATMPageHeading";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { FormInitialValues } from "./AddCartonBoxWrapper";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
};

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
  {
    label: "Outer Pack Box",
    path: "/configurations/carton-box/add",
  },
  {
    label: "Add Outer Pack Box",
  },
];

const AddCartonBox = ({ formikProps }: Props) => {
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
          <ATMPageHeading> Add New Outer Packaging Box </ATMPageHeading>
        </div>

        <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
          <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
            {/* Form Heading */}
            <div className="text-xl font-medium"> Outer Pack Box Details </div>

            {/* BUTTON - Add Button */}
            <div>
              <button
                type="button"
                onClick={() => formikProps.handleSubmit()}
                className="bg-primary-main rounded py-1 px-5 text-white border border-primary-main "
              >
                Add Box
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="grow py-8 px-3 ">
            <div className="grid grid-cols-3 gap-4">
              {/* boxName */}
              <ATMTextField
                name="boxName"
                value={values.boxName}
                label="Box Name"
                placeholder="Box Name"
                onChange={(e) => setFieldValue("boxName", e.target.value)}
              />

              {/* Inner Items Count */}
              <ATMTextField
                name="innerItemsCount"
                value={values.innerItemsCount}
                label="Inner Items Count"
                placeholder="Inner Items Count"
                onChange={(e) => setFieldValue("innerItemsCount", e.target.value)}
              />

              {/* Box Weight */}
              <ATMTextField
                name="boxWeight"
                value={values.boxWeight}
                label="Box Weight"
                placeholder="Box Weight"
                onChange={(e) => setFieldValue("boxWeight", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCartonBox;
