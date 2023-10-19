/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:EditUserWrapper.tsx
// Type: Edit Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'

// |-- External Dependencies --|
import { Formik, FormikProps } from 'formik'
import { object, string } from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import EditUser from './EditUser'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { showToast } from 'src/utils'
import {
    useGetUserByIdQuery,
    useUpdateNewUserMutation,
} from 'src/services/UserServices'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { setSelectedItem } from 'src/redux/slices/userSlice'

// |-- Types --|
type Props = {}

interface UserData {
    firstName: string
    lastName: string
    userName: string
    mobile: string
    email: string
    userDepartment: string
    userRole: string
    companyId: string
    branchId: string
    password?: string
    allowedIp: string[]
}
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
}

export const regIndiaPhone = RegExp(/^[0]?[6789]\d{9}$/)

const EditUserWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const Id: any = params.id
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [updateNewUser] = useUpdateNewUserMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { selectedItem }: any = useSelector((state: RootState) => state?.user)

    const { data, isLoading, isFetching } = useGetUserByIdQuery(Id)

    useEffect(() => {
        if (!isLoading && !isFetching) {
            dispatch(setSelectedItem(data?.data[0]))
        }
    }, [data, isLoading, isFetching])
    let allowedIps: any = []

    selectedItem?.allowedIp?.map((val: any) => {
        return allowedIps.push({ allowedIp: val })
    })
    const initialValues: FormInitialValues = {
        firstName: selectedItem?.firstName || '',
        lastName: selectedItem?.lastName || '',
        userName: selectedItem?.userName || '',

        mobile: selectedItem?.mobile || '',
        email: selectedItem?.email || '',
        branchId: selectedItem?.branchId || '',
        password: '',
        userDepartment: selectedItem?.userDepartment || '',
        userRole: selectedItem?.userRole || '',
        allowedIps: allowedIps || [],
        companyId: userData?.companyId || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        firstName: string().required('First Name is required'),
        lastName: string().required('Last Name is required'),
        userName: string().required('User Name is required'),
        mobile: string()
            .required('Mobile No is required')
            .max(10, 'Mobile number must be 10 digits')
            .min(10, 'Mobile number must be 10 digits')
            .trim()
            .matches(regIndiaPhone, 'Invalid Mobile Number'),
        email: string().email('Invalid Email ID').required('Email is required'),
        branchId: string().required('branch name is required'),
        password: string(),
        userDepartment: string().required('User Department is required'),
        userRole: string().required('User Role is required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        let newAllowedIp = values?.allowedIps.map((ele) => {
            return ele.allowedIp
        })
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            const userDataToSend: UserData = {
                firstName: values.firstName || '',
                lastName: values.lastName || '',
                userName: values.userName || '',
                mobile: values.mobile || '',
                email: values.email || '',
                branchId: values.branchId || '',
                userDepartment: values.userDepartment || '',
                userRole: values.userRole || '',
                companyId: values.companyId || '',
                allowedIp: newAllowedIp[0]?.length ? newAllowedIp : [],
            }

            if (values?.password) {
                userDataToSend.password = values.password // Corrected line
            }

            updateNewUser({
                body: userDataToSend,
                id: Id,
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'User Updated successfully!')
                        dispatch(setSelectedItem(null))
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
    return (
        <SideNavLayout>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => {
                    return (
                        <EditUser
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </SideNavLayout>
    )
}

export default EditUserWrapper
