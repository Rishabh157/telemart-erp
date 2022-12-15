import { Divider } from "@mui/material";
import { FieldArray, FieldArrayRenderProps } from "formik";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { AddDealerFormValues } from "src/pages/dealers/add/AddDealerWrapper";
import { twMerge } from "tailwind-merge";

type ChildrenField = {
    name: string,
    label: string,
    placeholder: string,
    required: boolean,
    extraClasses?: string;
}

type FormFieldType = {
    groupName: string;
    className: string;
    children: ChildrenField[]


}

const formFields: FormFieldType[] = [

    {
        groupName: "Personal Details",
        className: "",
        children: [
            {
                name: "lastName",
                label: "Last Name",
                placeholder: "enter last name",
                required: false,

            },
            {
                name: "dealerCode",
                label: "Dealer Code",
                placeholder: "Enter dealer code",
                required: false,

            },
            {
                name: "contactNo",
                label: "Contact No",
                placeholder: "Enter contact number",
                required: false,

            },
            {
                name: "mobile",
                label: "Mobile",
                placeholder: "enter mobile number",
                required: false,

            },
            {
                name: "email",
                label: "Email",
                placeholder: "Enter email",
                required: false,

            },
        ]
    },
    {
        groupName: "Address",
        className: "",
        children: [
            {
                name: "firmName",
                label: "Firm Name",
                placeholder: "Enter firm name",
                required: false,

            },
            {
                name: "registeredAddress",
                label: "Regd. Address",
                placeholder: "Enter registered address",
                required: false,

            },

            {
                name: "state",
                label: "State",
                placeholder: "Enter state",
                required: false,

            },
            {
                name: "district",
                label: "District",
                placeholder: "Enter district",
                required: false,

            },
            {
                name: "pincode",
                label: "Pincode",
                placeholder: "Enter pincode",
                required: false,

            },
            {
                name: "shippingAddresses",
                label: "Shipping Address",
                placeholder: "Enter shipping address",
                required: false,

            },
        ]
    },
    {
        groupName: "Other Details",
        className: "",
        children: [
            {
                name: "gstNo",
                label: "GST No",
                placeholder: "Enter GSt number",
                required: false,

            },
            {
                name: "pan",
                label: "Pan No",
                placeholder: "Enter PAN number",
                required: false,

            },
            {
                name: "aadharNo",
                label: "Aadhar No",
                placeholder: "Enter aadhar number",
                required: false,

            },
        ]
    }
]

export const renderFormFields = (values: AddDealerFormValues, setFieldValue: (fieldName: string, value: string) => void) => {
    return (

        formFields.map((field: FormFieldType) => {

            const { groupName, className, children } = field

            return (
                <div className={`col-span-12  ${className}`} >
                    <div className="py-6" >
                        <Divider className="text-primary-main" >{groupName}</Divider>
                    </div>
                    <div className="grid grid-cols-12 gap-3" >

                        {
                            children.map((childField, childFieldIndex) => {

                                const { name, label, placeholder, required, extraClasses } = childField
                                switch (name) {
                                    case 'shippingAddresses':
                                        return (
                                            <FieldArray name={'shippingAddresses'} >

                                                {
                                                    ({ form, name }: FieldArrayRenderProps) => (

                                                        <div key={name} className={twMerge(`lg:col-span-12 md:col-span-12 col-span-12 h-fit  ${extraClasses}`)}>
                                                            <div className=" gap-4 grid grid-cols-2" >

                                                                {
                                                                    values.shippingAddresses.map((ele, index) => (
                                                                        <ATMTextField
                                                                            name={`shippingAddresses[${index}]`}
                                                                            value={values.shippingAddresses[index]}
                                                                            onChange={(e) => setFieldValue(`shippingAddresses[${index}]`, e.target.value)}
                                                                            label={label}
                                                                            placeholder={placeholder}
                                                                            required={required}
                                                                            
                                                                        />

                                                                    ))
                                                                }

                                                            </div>

                                                            <div>
                                                                <button> Add </button>
                                                            </div>

                                                        </div>
                                                    )
                                                }
                                            </FieldArray >
                                        );

                                    default:
                                        return (
                                            <div key={name} className={twMerge(`lg:col-span-4 md:col-span-6 col-span-12 h-fit ${extraClasses} `)}>

                                                <ATMTextField
                                                    name={name}
                                                    value={values[name as keyof typeof values]}
                                                    onChange={(e) => setFieldValue(name, e.target.value)}
                                                    label={label}
                                                    placeholder={placeholder}
                                                    required={required}
                                                />
                                            </div>
                                        )

                                }
                            })
                        }

                    </div>
                </div>

            )


        })
    )
}