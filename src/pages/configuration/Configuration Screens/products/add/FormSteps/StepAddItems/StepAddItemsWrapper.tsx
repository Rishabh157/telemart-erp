/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { FormikProps } from "formik";
import { Field, SelectOption } from "src/models/FormField/FormField.model";
import { FormInitialValues } from "../../AddProductWrapper";
import StepAddItems from "./StepAddItems";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
  allItems: any;
};

export type DropdownOptions = {
  itemOptions: SelectOption[];
};

export type FieldType = Field<"companyTypeOptions" | "ownershipTypeOptions">;

const StepAddItemsWrapper = ({ formikProps, allItems }: Props) => {
  const itemOptions = allItems?.map((ele: any) => {
    return { label: ele?.itemName, value: ele?._id };
  });

  const dropdownOptions: DropdownOptions = {
    itemOptions,
  };

  return (
    <>
      <StepAddItems
        formikProps={formikProps}
        dropdownOptions={dropdownOptions}
      />
    </>
  );
};

export default StepAddItemsWrapper;
