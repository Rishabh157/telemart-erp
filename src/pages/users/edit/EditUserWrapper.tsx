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

export type FormInitialValues = {
    firstName: string
    lastName: string
    mobile: string
    email: string
    userDepartment: string
    userRole: string
    companyId: string
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
        // if (!isLoading && isFetching) {
        dispatch(setSelectedItem(data?.data))
        //}
    }, [data, isLoading, isFetching])

    //console.log(selectedItem)

    const initialValues: FormInitialValues = {
        firstName: selectedItem?.firstName || '',
        lastName: selectedItem?.lastName || '',
        mobile: selectedItem?.mobile || '',
        email: selectedItem?.email || '',
        userDepartment: selectedItem?.userDepartment || '',
        userRole: selectedItem?.userRole || '',
        companyId: userData?.companyId || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        firstName: string().required('First Name is required'),
        lastName: string().required('Last Name is required'),
        mobile: string()
            .required('Mobile No is required')
            .max(10, 'Mobile number must be 10 digits')
            .min(10, 'Mobile number must be 10 digits')
            .trim()
            .matches(regIndiaPhone, 'Invalid Mobile Number'),
        email: string().email('Invalid Email ID').required('Email is required'),
        userDepartment: string().required('User Department is required'),
        userRole: string().required('User Role is required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            updateNewUser({
                body: {
                    firstName: values.firstName || '',
                    lastName: values.lastName || '',
                    mobile: values.mobile || '',
                    email: values.email || '',
                    userDepartment: values.userDepartment || '',
                    userRole: values.userRole || '',
                    companyId: values.companyId || '',
                },
                id: Id,
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'User Updated successfully!')
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
