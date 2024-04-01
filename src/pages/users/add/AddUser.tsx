/// ==============================================
// Filename:AddUser.tsx
// Type: Add Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { FormikProps, FieldArray } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddUserWrapper'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMSelectSearchable, {
    SelectOption,
} from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { userDepartmentTypeOptions } from 'src/utils/constants/customeTypes'
import {
    GetHierarchByDeptProps,
    getHierarchyByDept,
} from 'src/utils/GetHierarchyByDept'
import MainLayout from 'src/components/layouts/MainLayout/MainLayout'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { HiPlus } from 'react-icons/hi'
import { MdDeleteOutline } from 'react-icons/md'
import { CompanyBranchListResponse } from 'src/models'
import { useGetAllCompaniesBranchQuery } from 'src/services/CompanyBranchService'
import ATMSwitchButton from 'src/components/UI/atoms/formFields/ATMSwitchButton/ATMSwitchButton'
import {
    useGetFloorMangerUserByCallCenterIdQuery,
    useGetSeniorUsersQuery,
    useGetTeamLeadrUserByCallCenterIdQuery,
} from 'src/services/UserServices'
import { RootState } from 'src/redux/store'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    dropDownOption: {
        callCenterOptions: SelectOption[]
    }
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'User',
        path: '/users',
    },
    {
        label: 'Add User',
    },
]

const AddUser = ({ formikProps, apiStatus, dropDownOption }: Props) => {
    const { values, setFieldValue } = formikProps
    const [userRole, setuserRole] = useState<any[]>([])
    const [userSeniorOptions, setSenoirRole] = useState<any[]>([])

    const { userData } = useSelector((state: RootState) => state?.auth)
    const [branchOptionList, setBranchOptionList] = useState([])

    const [florManagerOptionList, setFlorManagerOptionList] = useState([])
    const [teamLeadOptionList, setTeamLeadOptionList] = useState([])

    const { data, isFetching, isLoading } = useGetAllCompaniesBranchQuery('')

    useEffect(() => {
        if (!isFetching && !isLoading) {
            const companyBranchList = data?.data?.map(
                (ele: CompanyBranchListResponse) => {
                    return {
                        label: ele?.branchName,
                        value: ele?._id,
                    }
                }
            )
            setBranchOptionList(companyBranchList)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching, data])

    useEffect(() => {
        const departmentroles = getHierarchyByDept({
            department: values?.userDepartment as GetHierarchByDeptProps,
        })

        setuserRole(departmentroles)
    }, [values])
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string | boolean) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }

    const {
        data: floorMangers,
        isFetching: floorManagerIsFetching,
        isLoading: floorManagerIsLoading,
    } = useGetFloorMangerUserByCallCenterIdQuery(
        {
            companyId: userData?.companyId as string,
            callCenterId: values?.callCenterId as any,
            departmentId: values?.userDepartment as any,
        },
        {
            skip: !values?.callCenterId,
        }
    )
    React.useEffect(() => {
        if (!floorManagerIsFetching && !floorManagerIsLoading) {
            const filteredFloor = floorMangers?.data?.map((ele: any) => {
                return {
                    label: ele?.userName,
                    value: ele?._id,
                }
            })
            setFlorManagerOptionList(filteredFloor)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [floorManagerIsFetching, floorManagerIsLoading, floorMangers])

    const {
        data: teamLeadData,
        isFetching: teamLeadIsFetching,
        isLoading: teamLeadIsLoading,
    } = useGetTeamLeadrUserByCallCenterIdQuery(
        {
            companyId: userData?.companyId as string,
            callCenterId: values?.callCenterId as any,
            departmentId: values?.userDepartment as any,
        },
        {
            skip: !values?.callCenterId,
        }
    )
    React.useEffect(() => {
        if (!teamLeadIsFetching && !teamLeadIsLoading) {
            const filteredFloor = teamLeadData?.data?.map((ele: any) => {
                return {
                    label: ele?.userName,
                    value: ele?._id,
                }
            })
            setTeamLeadOptionList(filteredFloor)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teamLeadIsFetching, teamLeadIsLoading, floorMangers])

    // senior Apidata
    const {
        data: seniorData,
        isFetching: seniorIsFetching,
        isLoading: seniorIsLoading,
    } = useGetSeniorUsersQuery(
        {
            userrole: values?.userRole,
        },
        {
            skip: !values?.userRole,
        }
    )
    React.useEffect(() => {
        if (!seniorIsLoading && !seniorIsFetching) {
            const senoirOptions = seniorData?.data?.map((ele: any) => {
                return {
                    label: ele?.userName,
                    value: ele?._id,
                }
            })
            setSenoirRole(senoirOptions)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seniorIsLoading, seniorIsFetching, seniorData])

    return (
        <MainLayout>
            <div className="flex flex-col gap-2 p-4 ">
                {/* Breadcrumbs */}
                <div className="font-bold text-black ">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Add New User </ATMPageHeading>
                </div>

                <div className="max-h-full bg-white bg-no-repeat bg-cover border rounded shadow grow bg-1 bg-form-bg">
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
                    <div className="px-3 py-8 grow ">
                        <div className="grid grid-cols-3 gap-4 pb-3">
                            {/* FirstName */}
                            <ATMTextField
                                required
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
                                required
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
                                required
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
                                required={false}
                                name="email"
                                value={values.email}
                                label="Email"
                                placeholder="Email"
                                onChange={(e) =>
                                    handleSetFieldValue('email', e.target.value)
                                }
                            />

                            {/* Branch Name */}
                            <ATMSelectSearchable
                                required
                                name="branchId"
                                value={values.branchId}
                                onChange={(e) =>
                                    handleSetFieldValue('branchId', e)
                                }
                                options={branchOptionList}
                                label="Branch Name"
                            />

                            {/* Password */}
                            <ATMTextField
                                required
                                name="password"
                                type="password"
                                value={values.password}
                                label="Password"
                                placeholder="Password"
                                className="mt-2 rounded"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'password',
                                        e.target.value
                                    )
                                }
                            />
                            {/* Mobile */}
                            <ATMTextField
                                required={false}
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
                                required
                                name="userDepartment"
                                value={values.userDepartment}
                                onChange={(e) =>
                                    handleSetFieldValue('userDepartment', e)
                                }
                                options={userDepartmentTypeOptions()}
                                fontSizePlaceHolder="14px"
                                label="User Department"
                            />
                            <ATMSelectSearchable
                                required
                                name="userRole"
                                value={values.userRole}
                                onChange={(e) =>
                                    handleSetFieldValue('userRole', e)
                                }
                                options={userRole}
                                fontSizePlaceHolder="14px"
                                label="User Role"
                            />
                            <ATMSelectSearchable
                                required
                                name="mySenior"
                                value={values.mySenior || ''}
                                onChange={(e) =>
                                    handleSetFieldValue('mySenior', e)
                                }
                                options={userSeniorOptions}
                                label="senior"
                            />

                            {/* user admin  */}
                            <ATMSwitchButton
                                required
                                hidden={
                                    !(
                                        values.userDepartment ===
                                            GetHierarchByDeptProps.SALES_DEPARTMENT ||
                                        values.userDepartment ===
                                            GetHierarchByDeptProps.CUSTOMER_CARE_DEPARTMENT
                                    )
                                }
                                label="Agent"
                                name="isAgent"
                                value={values.isAgent}
                                onChange={(e) =>
                                    handleSetFieldValue('isAgent', e)
                                }
                            />

                            <ATMSelectSearchable
                                required={false}
                                name="callCenterId"
                                value={values.callCenterId}
                                onChange={(e) =>
                                    handleSetFieldValue('callCenterId', e)
                                }
                                options={dropDownOption.callCenterOptions}
                                label="Call Center"
                            />
                            {/* Floor Manager Name */}
                            <ATMSelectSearchable
                                isHidden={!values.isAgent}
                                required
                                name="floorManagerId"
                                value={values.floorManagerId}
                                onChange={(e) =>
                                    handleSetFieldValue('floorManagerId', e)
                                }
                                options={florManagerOptionList}
                                label="Floor Manager"
                            />

                            {/* Team Lead Name */}
                            <ATMSelectSearchable
                                isHidden={!values.isAgent}
                                required
                                name="teamLeadId"
                                value={values.teamLeadId}
                                onChange={(e) =>
                                    handleSetFieldValue('teamLeadId', e)
                                }
                                options={teamLeadOptionList}
                                label="Team Lead"
                            />
                        </div>
                        <FieldArray name="allowedIps">
                            {({ push, remove }) => {
                                return (
                                    <>
                                        <div className="grid grid-cols-3 gap-4">
                                            {values?.allowedIps?.map(
                                                (item: any, itemIndex: any) => {
                                                    let { allowedIp } = item

                                                    return (
                                                        <div
                                                            key={itemIndex}
                                                            className="flex"
                                                        >
                                                            {/* Phone */}
                                                            <div className="flex flex-1">
                                                                <ATMTextField
                                                                    type="text"
                                                                    required={
                                                                        false
                                                                    }
                                                                    name={`allowedIps[${itemIndex}].allowedIp`}
                                                                    value={
                                                                        allowedIp
                                                                    }
                                                                    textTransform=""
                                                                    label="Allowed IPS"
                                                                    placeholder="Allowed IPS"
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
                                                                        className="p-1.5 bg-red-500 text-white rounded mt-[44px] ml-[10px] "
                                                                    >
                                                                        <MdDeleteOutline className="text-2xl " />
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
                                                className="flex items-center px-2 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded-full "
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

export default AddUser
