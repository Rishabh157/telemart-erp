/// ==============================================
// Filename:AddUserWrapper.tsx
// Type: Add Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useRef, useState } from 'react'

// |-- External Dependencies --|
import { Formik, FormikProps } from 'formik'
import { boolean, object, string } from 'yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import AddUser from './AddUser'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import {
    useAddNewUserMutation,
    // useGetFloorMangerUserByCallCenterIdQuery,
} from 'src/services/UserServices'
import { showToast } from 'src/utils'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { useGetAllCallCenterMasterQuery } from 'src/services/CallCenterMasterServices'
import { setItems } from 'src/redux/slices/CallCenterMasterSlice'
import { CallCenterMasterListResponse } from 'src/models'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    firstName: string
    lastName: string
    userName: string
    mobile: string
    email: string
    branchId: string
    password: string
    userDepartment: string
    userRole: string
    companyId: string
    allowedIps: { allowedIp: string }[]
    isAgent: boolean
    callCenterId: string
    floorManagerId: string
    teamLeadId: string
}

export const regIndiaPhone = RegExp(/^[0]?[6789]\d{9}$/)

const AddUserWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addNewUser] = useAddNewUserMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { items } = useSelector((state: RootState) => state?.callCenter)
    const ref = useRef<any>(null)

    const initialValues: FormInitialValues = {
        firstName: '',
        lastName: '',
        userName: '',
        mobile: '',
        email: '',
        branchId: '',
        password: '',
        userDepartment: '',
        userRole: '',
        companyId: userData?.companyId || '',
        allowedIps: [
            {
                allowedIp: '',
            },
        ],
        isAgent: false,

        callCenterId: '',
        floorManagerId: '',
        teamLeadId: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        firstName: string().required('First Name is required'),
        lastName: string().required('Last Name is required'),
        userName: string().required('User Name is required'),

        isAgent: boolean(),
        teamLeadId: string().when(['isAgent'], (isAgent, schema) => {
            return isAgent[0]
                ? schema.required('Team Lead ID is required')
                : schema.notRequired()
        }),
        floorManagerId: string().when(['isAgent'], (isAgent, schema) => {
            return isAgent[0]
                ? schema.required('Floor Manager is required')
                : schema.notRequired()
        }),
        callCenterId: string().when(
            'userDepartment',
            (userDepartment: any, schema: any) => {
                return userDepartment.includes('SALES_DEPARTMENT')
                    ? schema.required(
                          'Call Center ID is required for Sales department'
                      )
                    : schema.notRequired()
            }
        ),

        branchId: string().required('branch name is required'),
        userDepartment: string().required('User Department is required'),
        userRole: string().required('User Role is required'),
        password: string().required('Password is required'),
        // email: string().email('Invalid Email ID'),
        // .required('Email is required'),
        // mobile: string()
        //     .required('Mobile No is required')
        //     .max(10, 'Mobile number must be 10 digits')
        //     .min(10, 'Mobile number must be 10 digits')
        //     .trim()
        //     .matches(regIndiaPhone, 'Invalid Mobile Number'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        let newAllowedIp = values?.allowedIps.map((ele) => {
            return ele.allowedIp
        })

        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            addNewUser({
                firstName: values.firstName || '',
                lastName: values.lastName || '',
                userName: values.userName || '',
                mobile: values.mobile || '',
                email: values.email || '',
                branchId: values.branchId || '',
                password: values.password || '',
                userDepartment: values.userDepartment || '',
                userRole: values.userRole || '',
                companyId: values.companyId || '',
                allowedIp: newAllowedIp[0]?.length ? newAllowedIp : [],
                isAgent: values.isAgent,

                callCenterId: values.callCenterId || null,
                floorManagerId: values.floorManagerId || null,
                teamLeadId: values.teamLeadId || null,
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'User added successfully!')
                        navigate('/users')
                    } else {
                        showToast('error', res?.data?.message)
                    }
                } else {
                    showToast('error', 'Something went wrong')
                }
                setApiStatus(false)
            })
        }, 1000)
    }

    const { isLoading, isFetching, data } = useGetAllCallCenterMasterQuery(
        userData?.companyId,
        {
            skip: !userData?.companyId,
        }
    )

    React.useEffect(() => {
        if (!isLoading && !isFetching) {
            dispatch(setItems(data?.data))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching])
    const dropDownOption = {
        callCenterOptions: items?.map(
            (assetCategory: CallCenterMasterListResponse) => {
                return {
                    label: assetCategory.callCenterName,
                    value: assetCategory._id,
                }
            }
        ),
    }
    // console.log(ref?.current, 'ref?.callCenterId')
    // console.log(ref?.current?.values?.callCenterId, 'ref?.callCenterId')
    // const {
    //     data: floorMangers,
    //     isFetching: floorManagerIsFetching,
    //     isLoading: floorManagerIsLoading,
    // } = useGetFloorMangerUserByCallCenterIdQuery(
    //     {
    //         companyId: userData?.companyId as string,
    //         callCenterId: ref?.current?.values?.callCenterId as any,
    //     },
    //     {
    //         skip: !(userData?.companyId && ref?.current?.values?.callCenterId),
    //     }
    // )
    // React.useEffect(() => {
    //     if (!floorManagerIsFetching && !floorManagerIsLoading) {
    //         dispatch(setItems(floorMangers?.data))
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [floorManagerIsFetching, floorManagerIsLoading])
    return (
        <SideNavLayout>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
                innerRef={ref as any}
            >
                {(formikProps: FormikProps<FormInitialValues>) => {
                    return (
                        <AddUser
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                            dropDownOption={dropDownOption}
                        />
                    )
                }}
            </Formik>
        </SideNavLayout>
    )
}

export default AddUserWrapper
