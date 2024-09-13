// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { Formik, FormikProps } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { object, string } from 'yup'

// |-- Internal Dependencies --|
import CreateOrder from './CreateOrder'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch } from 'src/redux/store'
import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    userName: string
    didNumber: string
    campaignName: string
    mobileNumber: string
    callType: string
}

export const regIndiaPhone = RegExp(/^[0]?[6789]\d{9}$/)

const CreateOrderWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useGetLocalStorage()

    const initialValues: FormInitialValues = {
        userName: userData?.userName,
        didNumber: '',
        campaignName: '',
        mobileNumber: '',
        callType: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        userName: string().required('Agent name is required'),
        didNumber: string().required('DID number is required'),
        campaignName: string().required('Campaign name is required'),
        mobileNumber: string()
            .max(10, 'Mobile number must be 10 digits')
            .min(10, 'Mobile number must be 10 digits')
            .matches(regIndiaPhone, 'Invalid Mobile number')
            .required('Mobile number is required'),
        callType: string().required('Calltype is required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            setApiStatus(false)
            navigate('/page-master/order-creation', {
                state: values,
            })
        }, 1000)
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={onSubmitHandler}
        >
            {(formikProps: FormikProps<FormInitialValues>) => {
                return (
                    <CreateOrder
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                    />
                )
            }}
        </Formik>
    )
}

export default CreateOrderWrapper
