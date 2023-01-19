import { Divider } from "@mui/material";
import { FieldArray, FieldArrayRenderProps } from "formik";
import ATMTextArea from "src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea";
import ATMSelect from "src/components/UI/atoms/formFields/ATMSelect/ATMSelect";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { AddWarehouseFormValues } from "src/pages/warehouses/add/AddWarehouseWrapper";
import { twMerge } from "tailwind-merge";
import ATMCheckbox from "src/components/UI/atoms/formFields/ATMCheckbox/ATMCheckbox";

type ChildrenField = {
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  extraClasses?: string;
  fieldType?:
    | "text"
    | "number"
    | "password"
    | "textarea"
    | "select"
    | "multiselect"
    | "checkbox"
    | "dynamic";
};

type FormFieldType = {
  groupName: string;
  className: string;
  children: ChildrenField[];
};

const formFields: FormFieldType[] = [
  {
    groupName: "Basic Details",
    className: "",
    children: [
      {
        name: "name",
        label: "Name",
        placeholder: "Enter name",
        required: false,
        fieldType: "text",
      },
      {
        name: "contactNo",
        label: "Contact No",
        placeholder: "Enter contact no.",
        required: false,
        fieldType: "text",
      },
      {
        name: "mobile",
        label: "Mobile",
        placeholder: "Enter mobile number",
        required: false,
        fieldType: "text",
      },
      {
        name: "pincode",
        label: "Pincode",
        placeholder: "Enter pincode",
        required: false,
        fieldType: "text",
      },
      {
        name: "state",
        label: "State",
        placeholder: "Enter state",
        required: false,
        fieldType: "select",
      },
      {
        name: "district",
        label: "District",
        placeholder: "Enter district",
        required: false,
        fieldType: "select",
      },
      {
        name: "gst_no",
        label: "GST No",
        placeholder: "Enter gst number",
        required: false,
        fieldType: "text",
      },
      {
        name: "address",
        label: "Address",
        placeholder: "Enter address",
        required: false,
        fieldType: "textarea",
        extraClasses: "lg:col-span-8",
      },
    ],
  },
  {
    groupName: "Other Details",
    className: "",
    children: [
      {
        name: "type",
        label: "Type",
        placeholder: "Enter type",
        required: false,
        fieldType: "select",
      },
      {
        name: "vendor",
        label: "Vendor",
        placeholder: "Enter vendor",
        required: false,
        fieldType: "text",
      },
      {
        name: "invoicePrefix",
        label: "Invoice Prefix",
        placeholder: "Enter invoice prefix",
        required: false,
        fieldType: "text",
      },
      {
        name: "invoiceNo",
        label: "Invoice No",
        placeholder: "Enter invoice number",
        required: false,
        fieldType: "number",
      },
      {
        name: "barcodePrefix",
        label: "Barcode Prefix",
        placeholder: "Enter barcode prefix",
        required: false,
        fieldType: "text",
      },
      {
        name: "cancellationHours",
        label: "Cancellation Hours",
        placeholder: "Enter cancellation hours",
        required: false,
        fieldType: "number",
      },
      {
        name: "comapny",
        label: "Company",
        placeholder: "Enter company",
        required: false,
        fieldType: "text",
      },
      {
        name: "againstCForm",
        label: "Against C-Form",
        placeholder: "Enter Against c-form",
        required: false,
        fieldType: "checkbox",
      },
      {
        name: "isBranchOffice",
        label: "Is branch office",
        placeholder: "Enter is branch office",
        required: false,
        fieldType: "checkbox",
      },
    ],
  },
  {
    groupName: "Courier Details",
    className: "",
    children: [
      {
        name: "blueDartAreaCode",
        label: "Bluedart area code",
        placeholder: "Enter area code",
        required: false,
        fieldType: "text",
      },
      {
        name: "blueDartRouteCode",
        label: "Bluedart route code",
        placeholder: "Enter route code",
        required: false,
        fieldType: "text",
      },
      {
        name: "blueDartCustomerName",
        label: "Bluedart customer name",
        placeholder: "Enter customer name",
        required: false,
        fieldType: "text",
      },
      {
        name: "delhiverySurfacePickupLocation",
        label: "Delhivery surface pickup location",
        placeholder: "Enter surface pickup location",
        required: false,
        fieldType: "text",
      },
      {
        name: "delhiveryAirPickupLocation",
        label: "Delhivery air pickup location",
        placeholder: "Enter air pickup location",
        required: false,
        fieldType: "text",
      },
    ],
  },
];

export const renderFormFields = (
  values: AddWarehouseFormValues,
  setFieldValue: (fieldName: string, value: string | boolean) => void
) => {
  return formFields.map((field: FormFieldType, fieldIndex: number) => {
    const { groupName, className, children } = field;

    return (
      <div key={fieldIndex} className={`col-span-12  ${className}`}>
        <div className="py-6">
          <Divider className="text-primary-main">{groupName}</Divider>
        </div>
        <div className="grid grid-cols-12 gap-6 py-3">
          {children.map((childField, childFieldIndex) => {
            const {
              name,
              label,
              placeholder,
              required,
              extraClasses,
              fieldType = "text",
            } = childField;
            switch (fieldType) {
              case "select":
                return (
                  <div
                    key={name}
                    className={twMerge(
                      `lg:col-span-4 md:col-span-6 col-span-12 h-fit ${extraClasses}`
                    )}
                  >
                    <ATMSelect
                      value={values[name as keyof typeof values]}
                      onChange={(newValue) => setFieldValue(name, newValue)}
                      options={[]}
                      label={label}
                    />
                  </div>
                );

              case "textarea":
                return (
                  <div
                    key={name}
                    className={twMerge(
                      `lg:col-span-4 md:col-span-6 col-span-12 h-fit ${extraClasses}`
                    )}
                  >
                    <ATMTextArea
                      value={`${values[name as keyof typeof values]}`}
                      onChange={(newValue) => setFieldValue(name, newValue)}
                      label={label}
                      placeholder={placeholder}
                    />
                  </div>
                );

              case "checkbox":
                return (
                  <div
                    key={name}
                    className={twMerge(
                      `lg:col-span-4 md:col-span-6 col-span-12 h-fit ${extraClasses}`
                    )}
                  >
                    <ATMCheckbox
                      name={name}
                      value={`${values[name as keyof typeof values]}`}
                      onChange={(checked) => setFieldValue(name, checked)}
                      checked={values[name as keyof typeof values] as boolean}
                      label={label}
                    />
                  </div>
                );

              default:
                return (
                  <div
                    key={name}
                    className={twMerge(
                      `lg:col-span-4 md:col-span-6 col-span-12 h-fit ${extraClasses} `
                    )}
                  >
                    <ATMTextField
                      name={name}
                      value={`${values[name as keyof typeof values]}`}
                      onChange={(e) => setFieldValue(name, e.target.value)}
                      label={label}
                      placeholder={placeholder}
                      required={required}
                    />
                  </div>
                );
            }
          })}
        </div>
      </div>
    );
  });
};
