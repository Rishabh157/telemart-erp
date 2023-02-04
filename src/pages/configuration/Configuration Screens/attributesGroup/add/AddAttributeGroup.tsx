import React from "react";
import { FormikProps } from "formik";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMPageHeading from "src/components/UI/atoms/ATMPageHeading/ATMPageHeading";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { FormInitialValues } from "./AddAttributeGroupWrapper";
import ATMTransferList from "src/components/UI/atoms/ATMTransferList/ATMTransferList";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
};

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
  {
    label: "Attributes Group",
    path: "/configurations/attributes-group",
  },
  {
    label: "Add Attributes Group",
  },
];

const AddAttributeGroup = ({ formikProps }: Props) => {
  const { values, setFieldValue  } = formikProps;
  const options : { label: string; value: string }[] = [
    { label: "Lable 1 ", value: "1" },
    { label: "Lable 2 ", value: "2" },
    { label: "Lable 3 ", value: "3" },
    { label: "Lable 4 ", value: "4" },
  ]

  const transferListProps = {
    name: "attributes",
    options,
    right: values.attributes,
    setRight: (newValue: {label: string; value: string}[])=> setFieldValue('attributes', newValue),
    leftSideTitle : "All Atrributes",
    rightSideTitle : "Attributes to add", 
  };

  return (
    <div className="h-[calc(100%-55px)]">
      <div className="p-4 flex flex-col gap-2  ">
        {/* Breadcrumbs */}
        <div className="">
          <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
        </div>

        {/* Page Heading */}
        <div className="pt-1">
          <ATMPageHeading> Add New Attribute Group </ATMPageHeading>
        </div>

        <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
          <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
            {/* Form Heading */}
            <div className="text-xl font-medium"> Attribute group details </div>

            {/* BUTTON - Add Button */}
            <div>
              <button
                type="button"
                onClick={() => formikProps.handleSubmit()}
                className={`bg-primary-main border text-white rounded py-1 px-5  border-primary-main `}
              >
                Add Group
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="grow  py-8 px-3 ">
            <div className="grid grid-cols-3 gap-4">
              {/* Field1 */}
              <ATMTextField
                name="group_name"
                value={values.group_name}
                label="Group Name"
                placeholder="Group Name"
                onChange={(e) => setFieldValue("group_name", e.target.value)}
              />
            </div>

            <div className="h-[300px] mt-8">
              <ATMTransferList {...transferListProps} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAttributeGroup;
