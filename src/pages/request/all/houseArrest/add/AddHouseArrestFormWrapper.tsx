// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { Formik, FormikProps } from 'formik'
import { object, string } from 'yup'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import AddHouseArrestForm from './AddHouseArrestForm'
import { showToast } from 'src/utils'

// |-- Redux--|
import { AppDispatch } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { useAddHouseArrestMutation } from 'src/services/HouseArrestServices'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    orderNumber: string
    initialCallOne: string
    initialCallTwo: string
    initialCallThree: string
    remark: string
}

const AddHouseArrestFormWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addHouseArrest] = useAddHouseArrestMutation()

    // Form Initial Values
    const initialValues: FormInitialValues = {
        orderNumber: '',
        initialCallOne: 'DELIVERYBOYHOUSEARRESTCASE',
        initialCallTwo: '',
        initialCallThree: '',
        remark: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        orderNumber: string().required('Order number is required'),
        initialCallTwo: string().required('IC2 is required'),
        initialCallThree: string().required('IC3 is required'),
        remark: string().required('Remark is required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            addHouseArrest({
                orderNumber: values.orderNumber,
                ic2: values.initialCallTwo,
                ic3: values.initialCallThree,
                remark: values.remark,
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'House Arrest added successfully!')
                        navigate('/request/house-arrest')
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
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps: FormikProps<FormInitialValues>) => {
                return (
                    <AddHouseArrestForm
                        formikProps={formikProps}
                        apiStatus={apiStatus}
                    />
                )
            }}
        </Formik>
    )
}

export default AddHouseArrestFormWrapper
