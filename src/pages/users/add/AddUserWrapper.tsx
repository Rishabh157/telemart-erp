import React, { useState } from 'react'
import { Formik, FormikProps } from 'formik'
import { object, string } from 'yup'
import AddUser from './AddUser'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { useAddNewUserMutation } from 'src/services/UserServices'
import { showToast } from 'src/utils'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'

type Props = {}

export type FormInitialValues = {
    firstName: string
    lastName: string
    mobile: string
    email: string
    password: string
    companyId: string
}

export const regIndiaPhone = RegExp(/^[0]?[6789]\d{9}$/)

const AddUserWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addNewUser] = useAddNewUserMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const initialValues: FormInitialValues = {
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        password: '',
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
        password: string().required('Password is required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            addNewUser({
                firstName: values.firstName || '',
                lastName: values.lastName || '',
                mobile: values.mobile || '',
                email: values.email || '',
                password: values.password || '',
                companyId: values.companyId || '',
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
