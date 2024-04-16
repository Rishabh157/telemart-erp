/// ==============================================
// Filename:AddASRWrapper.tsx
// Type: ADD Wrapper Component
// Last Updated: JUNE 22, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { array, object, string, number } from 'yup'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import AddASR from './AddASR'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { useAddAsrMutation } from 'src/services/AsrService'
import { showToast } from 'src/utils'
import { useGetAllProductGroupQuery } from 'src/services/ProductGroupService'
// import { setItems } from 'src/redux/slices/productGroupSlice'

// |-- Redux --|
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { useCustomOptions } from 'src/hooks/useCustomOptions'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    asrDetails: {
        productName: string
        productId: string
        quantity: number
    }[]
}

const AddASRWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [addAsr] = useAddAsrMutation()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useSelector((state: RootState) => state?.auth)

    const { options } = useCustomOptions({
        useEndPointHook: useGetAllProductGroupQuery(''),
        keyName: 'groupName',
        value: '_id',
    })

    // Form Initial Values
    const initialValues: FormInitialValues = {
        asrDetails: [
            {
                productName: '',
                productId: '',
                quantity: 0,
            },
        ],
    }

    // Form Validation Schema
    const validationSchema = object({
        asrDetails: array().of(
            object().shape({
                productName: string().required('Product name is required'),
                quantity: number()
                    .min(1, 'Quantity must be greater than 0')
                    .required('Quantity is required'),
            })
        ),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        addAsr({
            asrDetails: values.asrDetails,
            companyId: userData?.companyId || '',
        }).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Asr added successfully!')
                    navigate('/asr')
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', 'Something went wrong')
            }
            setApiStatus(false)
        })
    }

    return (
        <SideNavLayout>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <AddASR
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                            dropDownOptions={options}
                        />
                    )
                }}
            </Formik>
        </SideNavLayout>
    )
}

export default AddASRWrapper
