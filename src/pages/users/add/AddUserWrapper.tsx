/// ==============================================
// Filename:AddUserWrapper.tsx
// Type: Add Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { Formik, FormikProps } from 'formik'
import { object, string } from 'yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import AddUser from './AddUser'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { useAddNewUserMutation } from 'src/services/UserServices'
import { showToast } from 'src/utils'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

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
}

export const regIndiaPhone = RegExp(/^[0]?[6789]\d{9}$/)

const AddUserWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addNewUser] = useAddNewUserMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

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
        userDepartment: string().required('User Department is required'),
        userRole: string().required('User Role is required'),
        password: string().required('Password is required'),
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
    return (
        <SideNavLayout>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => {
                    return (
                        <AddUser
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </SideNavLayout>
    )
}

export default AddUserWrapper
