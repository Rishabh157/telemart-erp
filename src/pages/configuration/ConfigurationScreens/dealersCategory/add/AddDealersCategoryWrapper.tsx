/// ==============================================
// Filename:AddDealerCategoryWrapper.tsx
// Type: ADD Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { number, object, string } from 'yup'
import { useDispatch, useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import AddDealersCategory from './AddDealersCategory'

import { useAddDealerCategoryMutation } from 'src/services/DealerCategoryService'

// |-- Utils  --|
import { showToast } from 'src/utils'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    dealersCategory: string
    investAmount: number
    numberOfOrders: number
    deliveryPercentage: number
}

const AddDealersCategoryWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [apiStatus, setApiStatus] = useState(false)

    const [addDealerscategory] = useAddDealerCategoryMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    // Form Initial Values
    const initialValues: FormInitialValues = {
        dealersCategory: '',
        investAmount: 0,
        numberOfOrders: 0,
        deliveryPercentage: 0,
    }

    // Form Validation Schema
    const validationSchema = object({
        dealersCategory: string().required('Deal seller category is required'),
        investAmount: number().required(' Invest amount is required'),
        numberOfOrders: number().required('Number of offers is required'),
        deliveryPercentage: number().required('Delivery percentage is required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))

        addDealerscategory({
            dealersCategory: values.dealersCategory,
            investAmount: values.investAmount,
            numberOfOrders: values.numberOfOrders,
            deliveryPercentage: values.deliveryPercentage,
            companyId: userData?.companyId || '',
        }).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Added successfully!')
                    navigate('/configurations/dealers-category')
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
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps) => {
                return (
                    <AddDealersCategory
                        formikProps={formikProps}
                        apiStatus={apiStatus}
                    />
                )
            }}
        </Formik>
    )
}

export default AddDealersCategoryWrapper
