/// ==============================================
// Filename:EditUser.tsx
// Type: Edit Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { FormikProps, FieldArray } from 'formik'
import { useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './EditUserWrapper'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { userDepartmentOptions } from 'src/utils'
import {
    GetHierarchByDeptProps,
    getHierarchyByDept,
} from 'src/utils/GetHierarchyByDept'
import MainLayout from 'src/components/layouts/MainLayout/MainLayout'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { HiPlus } from 'react-icons/hi'
import { MdDeleteOutline } from 'react-icons/md'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'User',
        path: '/users',
    },
    {
        label: 'Update User',
    },
]

const EditUser = ({ formikProps, apiStatus }: Props) => {
    const { values, setFieldValue } = formikProps
    const [userRole, setuserRole] = useState<any[]>([])

    useEffect(() => {
        const departmentroles = getHierarchyByDept({
            department: values?.userDepartment as GetHierarchByDeptProps,
        })

        setuserRole(departmentroles)
    }, [values])

    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }
    return (
        <MainLayout>
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div className=" text-black font-bold">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Update User </ATMPageHeading>
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
                                Submit
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
                                InfoTitle="please Enter full name "
                                value={values.firstName}
                                label="First Name"
                                placeholder="First Name"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'firstName',
                                        e.target.value
                                    )
                                }
                            />

                            {/* Last Name */}
                            <ATMTextField
                                name="lastName"
                                value={values.lastName}
                                label="Last Name"
                                placeholder="Last Name"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'lastName',
                                        e.target.value
                                    )
                                }
                            />
                            {/* User Name */}
                            <ATMTextField
                                name="userName"
                                value={values.userName}
                                label="User Name"
                                placeholder="User Name"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'userName',
                                        e.target.value
                                    )
                                }
                            />

                            {/* Email */}
                            <ATMTextField
                                name="email"
                                value={values.email}
                                label="Email"
                                placeholder="Email"
                                onChange={(e) =>
                                    handleSetFieldValue('email', e.target.value)
                                }
                            />

                            {/* Password */}
                            <ATMTextField
                                name="password"
                                type="password"
                                value={values.password}
                                label="Password"
                                placeholder="Password"
                                className="rounded mt-2"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'password',
                                        e.target.value
                                    )
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
                                        handleSetFieldValue(
                                            'mobile',
                                            e.target.value
                                        )
                                    }
                                }}
                            />
                            <ATMSelectSearchable
                                name="userDepartment"
                                required
                                value={values.userDepartment}
                                onChange={(e) =>
                                    handleSetFieldValue('userDepartment', e)
                                }
                                options={userDepartmentOptions}
                                label="User Department"
                            />
                            <ATMSelectSearchable
                                name="userRole"
                                required
                                value={values.userRole}
                                onChange={(e) =>
                                    handleSetFieldValue('userRole', e)
                                }
                                options={userRole}
                                label="User Role"
                            />
                        </div>
                        <FieldArray name="allowedIps">
                            {({ push, remove }) => {
                                return (
                                    <>
                                        <div className="grid grid-cols-3 gap-9 ">
                                            {values?.allowedIps?.map(
                                                (item: any, itemIndex: any) => {
                                                    let { allowedIp } = item

                                                    return (
                                                        <div
                                                            key={itemIndex}
                                                            className="flex "
                                                        >
                                                            {/* Phone */}
                                                            <div className="flex">
                                                                <ATMTextField
                                                                    type="text"
                                                                    required
                                                                    name={`allowedIps[${itemIndex}].allowedIp`}
                                                                    value={
                                                                        allowedIp
                                                                    }
                                                                    label="Allowed Ips"
                                                                    placeholder="Allowed Ips"
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        handleSetFieldValue(
                                                                            `allowedIps[${itemIndex}].allowedIp`,
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }}
                                                                />

                                                                {/* BUTTON - Delete */}
                                                                {values
                                                                    .allowedIps
                                                                    ?.length >
                                                                    1 && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            remove(
                                                                                itemIndex
                                                                            )
                                                                        }}
                                                                        className="p-2 bg-red-500 text-white rounded my-[48px] mx-[10px]"
                                                                    >
                                                                        <MdDeleteOutline className="text-2xl" />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            )}
                                        </div>

                                        {/* BUTTON - Add More Product */}
                                        <div className="flex justify-self-start py-7">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    push({
                                                        allowedIp: '',
                                                    })
                                                }
                                                className="bg-transparent text-blue-700 font-semibold py-2 px-2 border border-blue-500 rounded-full flex items-center "
                                            >
                                                <HiPlus size="20" /> Add More
                                            </button>
                                        </div>
                                    </>
                                )
                            }}
                        </FieldArray>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default EditUser
