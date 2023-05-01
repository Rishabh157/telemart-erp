/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { FormikProps } from "formik";
import { Field, SelectOption } from "src/models/FormField/FormField.model";
import { FormInitialValues } from "../../EditProductWrapper";
import StepEditItems from "./StepEditItems";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
  allItems: any;
};

export type DropdownOptions = {
  itemOptions: SelectOption[];
};

export type FieldType = Field<"companyTypeOptions" | "ownershipTypeOptions">;

const StepEditItemsWrapper = ({ formikProps, allItems }: Props) => {
  const itemOptions = allItems?.map((ele: any) => {
    return { label: ele?.itemName, value: ele?._id };
  });

  const dropdownOptions: DropdownOptions = {
    itemOptions,
  };

  return (
    <>
      <StepEditItems
        formikProps={formikProps}
        dropdownOptions={dropdownOptions}
      />
    </>
  );
};

export default StepEditItemsWrapper;
