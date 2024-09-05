// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { object, string } from 'yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import AddEcomMaster from './AddEcomMaster'

import { useAddEcomMasterMutation } from 'src/services/EcomMasterService'
import { showToast } from 'src/utils'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    ecomDisplayName: string
}

const AddEcomMasterWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addEcomMaster] = useAddEcomMasterMutation()

    const initialValues: FormInitialValues = {
        ecomDisplayName: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        ecomDisplayName: string().required('Ecom Name name is required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            addEcomMaster(values).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Added successfully!')
                        navigate('/configurations/ecom-master')
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
            {(formikProps) => {
                return (
                    <AddEcomMaster
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                    />
                )
            }}
        </Formik>
    )
}

export default AddEcomMasterWrapper
