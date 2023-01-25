import React from "react";
import { FormikProps } from "formik";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMPageHeading from "src/components/UI/atoms/ATMPageHeading/ATMPageHeading";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { FormInitialValues } from "./AddDealersCategoryWrapper";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
};

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
  {
    label: "List Page",
    path: "/list-page",
  },
  {
    label: "Add Form",
  },
];

const AddDealersCategory = ({ formikProps }: Props) => {
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
          <ATMPageHeading> Add New Form </ATMPageHeading>
        </div>

        <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
          <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
            {/* Form Heading */}
            <div className="text-xl font-medium"> Form Heading </div>

            {/* BUTTON - Add Button */}
            <div>
              <button
                type="button"
                onClick={() => formikProps.handleSubmit()}
                className="bg-primary-main rounded py-1 px-5 text-white border border-primary-main "
              >
                Add Button
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="grow py-8 px-3 ">
            <div className="grid grid-cols-3 gap-4">
              {/* dealersCategory */}
              <ATMTextField
                name="dealersCategory"
                value={values.dealersCategory}
                label="Dealers Category"
                placeholder="Dealers Category"
                onChange={(e) => setFieldValue("dealersCategory", e.target.value)}
              />

              {/* Invest Amount */}
              <ATMTextField
                name="investAmount"
                value={values.investAmount}
                label="Invest Amount"
                placeholder="Invest Amount"
                onChange={(e) => setFieldValue("investAmount", e.target.value)}
              />

               {/* Number of Orders */}
              <ATMTextField
                name="noOfOrders"
                value={values.noOfOrders}
                label="Number Of Orders"
                placeholder="Number Of Orders"
                onChange={(e) => setFieldValue("noOfOrders", e.target.value)}
              />
               {/* Delivery Percentage */}
              <ATMTextField
                name="deliveryPercantage"
                value={values.deliveryPercantage}
                label="Delivery Percentage"
                placeholder="Delivery Percentage"
                onChange={(e) => setFieldValue("deliveryPercantage", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDealersCategory;
