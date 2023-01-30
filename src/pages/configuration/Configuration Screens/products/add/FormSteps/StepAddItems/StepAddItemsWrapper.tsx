import React from "react";
import { FormikProps } from "formik";
import { Field, SelectOption } from "src/models/FormField/FormField.model";
import { FormInitialValues } from "../../AddProductWrapper";
import StepAddItems from "./StepAddItems";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
};

export type DropdownOptions = {
  itemOptions: SelectOption[];
};

export type FieldType = Field<"companyTypeOptions" | "ownershipTypeOptions">;

const itemOptions = [{ label: "Item 1", value: "item1" }];

const StepAddItemsWrapper = ({ formikProps }: Props) => {
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
