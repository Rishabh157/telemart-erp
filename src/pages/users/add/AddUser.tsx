import React from 'react'
import { FormikProps } from 'formik'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddUserWrapper'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Add User',
        path: '/users',
    },
    {
        label: 'Add User',
    },
]

const AddUser = ({ formikProps, apiStatus }: Props) => {
    const { values, setFieldValue } = formikProps

    return (
        <div className="">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div className="">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Add New User </ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium"> User Details</div>

                        {/* BUTTON - Add Button */}
                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => formikProps.handleSubmit()}
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
                                    apiStatus ? 'opacity-50' : ''
                                }`}
                            >
                                Add User
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow py-8 px-3 ">
                        <div className="grid grid-cols-3 gap-4">
                            {/* FirstName */}
                            <ATMTextField
                                name="firstName"
                                isInfo
                                InfoTitle='please Enter full name '
                                value={values.firstName}
                                label="First Name"
                                placeholder="First Name"
                                onChange={(e) =>
                                    setFieldValue('firstName', e.target.value)
                                }
                            />

                            {/* Last Name */}
                            <ATMTextField
                                name="lastName"
                                value={values.lastName}
                                label="Last Name"
                                placeholder="Last Name"
                                onChange={(e) =>
                                    setFieldValue('lastName', e.target.value)
                                }
                            />

                            {/* Email */}
                            <ATMTextField
                                name="email"
                                value={values.email}
                                label="Email"
                                placeholder="Email"
                                onChange={(e) =>
                                    setFieldValue('email', e.target.value)
                                }
                            />
                            {/* Password */}
                            <ATMTextField
                                name="password"
                                type="password"
                                value={values.password}
                                label="Password"
                                placeholder="Password"
                                onChange={(e) =>
                                    setFieldValue('password', e.target.value)
                                }
                            />

                            {/* Mobile */}
                            <ATMTextField
                                name="mobile"
                                value={values.mobile}
                                label="Mobile Number"
                                placeholder="Mobile Number"
                                onChange={(e) => {
                                    const inputValue = e.target.value
                                    if (!isNaN(Number(inputValue))) {
                                        setFieldValue('mobile', e.target.value)
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddUser
