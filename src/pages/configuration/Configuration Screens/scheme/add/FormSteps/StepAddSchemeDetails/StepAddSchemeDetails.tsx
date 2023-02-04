import React from "react";
import { FormikProps } from "formik";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { FormInitialValues } from "../../AddSchemeWrapper";
import { DropdownOptions } from "./StepAddSchemeDetailsWrapper";
import ATMTextArea from "src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea";
import ATMSwitchButton from "src/components/UI/atoms/formFields/ATMSwitchButton/ATMSwitchButton";
import ATMDatePicker from "src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
  dropdownOptions: DropdownOptions;
};

const StepAddSchemeDetails = ({ formikProps, dropdownOptions }: Props) => {
  const { values, setFieldValue } = formikProps;

  return (
    <div className="py-6 px-7 flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-4 gap-y-5">
        {/* Scheme Code */}
        <ATMTextField
          name={"scheme_code"}
          value={values.scheme_code}
          onChange={(e) => {
            setFieldValue("scheme_code", e.target.value);
          }}
          label="Scheme Code"
          placeholder="Scheme Code"
          className="shadow bg-white rounded"
        />

        {/* Category */}
        <ATMTextField
          name={"category"}
          value={values.category}
          onChange={(e) => {
            setFieldValue("category", e.target.value);
          }}
          label="Category"
          placeholder="Category"
          className="shadow bg-white rounded"
        />

        {/* Sub Category */}
        <ATMTextField
          name={"sub_category"}
          value={values.sub_category}
          onChange={(e) => {
            setFieldValue("sub_category", e.target.value);
          }}
          label="Sub Category"
          placeholder="Sub Category"
          className="shadow bg-white rounded"
        />

        {/* Scheme Name */}
        <ATMTextField
          name={"scheme_name"}
          value={values.scheme_name}
          onChange={(e) => {
            setFieldValue("scheme_name", e.target.value);
          }}
          label="Scheme Name"
          placeholder="Scheme Name"
          className="shadow bg-white rounded"
        />

        {/* Scheme Price */}
        <ATMTextField
          name={"scheme_price"}
          value={values.scheme_price}
          onChange={(e) => {
            setFieldValue("scheme_price", e.target.value);
          }}
          label="Scheme Price"
          placeholder="Scheme Price"
          className="shadow bg-white rounded"
        />

        {/* Dimensions */}
        <div>
          <label className="text-slate-700 font-medium"> Dimensions </label>
          <div className="flex gap-2 mt-2">
            {/* Height */}
            <ATMTextField
              name="dimensions.height"
              value={values.dimensions.height}
              onChange={(e) =>
                setFieldValue("dimensions.height", e.target.value)
              }
              placeholder="H"
              className="shadow bg-white rounded"
            />

            {/* Weight */}
            <ATMTextField
              name="dimensions.width"
              value={values.dimensions.width}
              onChange={(e) =>
                setFieldValue("dimensions.width", e.target.value)
              }
              placeholder="W"
              className="shadow bg-white rounded"
            />

            {/* Depth */}
            <ATMTextField
              name="dimensions.depth"
              value={values.dimensions.depth}
              onChange={(e) =>
                setFieldValue("dimensions.depth", e.target.value)
              }
              placeholder="D"
              className="shadow bg-white rounded"
            />
          </div>
        </div>

        {/* Weight */}
        <ATMTextField
          name={"weight"}
          value={values.weight}
          onChange={(e) => {
            setFieldValue("weight", e.target.value);
          }}
          label="Weight"
          placeholder="Weight"
          className="shadow bg-white rounded"
        />

        {/* Delivery Charges */}
        <ATMTextField
          name={"delivery_charges"}
          value={values.delivery_charges}
          onChange={(e) => {
            setFieldValue("delivery_charges", e.target.value);
          }}
          label="Delivery Charges"
          placeholder="Delivery Charges"
          className="shadow bg-white rounded"
        />

        {/* Combo Packaging */}
        <ATMSwitchButton
          name="is_combo_packaging"
          value={values.is_combo_packaging}
          onChange={(newValue) => setFieldValue("is_combo_packaging", newValue)}
          label="Combo Packaging"
        />

        {/* Start Date */}
        <ATMDatePicker
          name={"start_date"}
          value={values.start_date}
          onChange={(newValue) => {
            setFieldValue("start_date", newValue);
          }}
          label="Start Date"
        />

        {/* End Date */}
        <ATMDatePicker
          name={"end_date"}
          value={values.end_date}
          onChange={(newValue) => {
            setFieldValue("end_date", newValue);
          }}
          label="End Date"
        />
      </div>

      {/* Scheme Description */}
      <div>
        <ATMTextArea
          name={"scheme_description"}
          value={values.scheme_description}
          onChange={(newValue) => {
            setFieldValue("scheme_description", newValue);
          }}
          label="Scheme Description"
          placeholder="Scheme Description"
          className="shadow bg-white rounded"
        />
      </div>
    </div>
  );
};

export default StepAddSchemeDetails;
