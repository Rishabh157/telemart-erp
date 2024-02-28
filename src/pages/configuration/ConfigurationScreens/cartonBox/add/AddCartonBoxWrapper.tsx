/// ==============================================
// Filename:AddCartonBoxWrapper.tsx
// Type: Add Component
// Last Updated: JUNE 24, 2023
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
import AddCartonBox from './AddCartonBox'

import { useAddCartonBoxMutation } from 'src/services/CartonBoxService'

// |-- Utils --|
import { showToast } from 'src/utils'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { RootState } from 'src/redux/store'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    boxName: string
    innerItemsCount: number
    boxWeight: number
    dimensions: {
        height: number
        width: number
        depth: number
    }
}

const AddCartonBoxWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [addCartonBox] = useAddCartonBoxMutation()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useSelector((state: RootState) => state?.auth)

    // Form Initial Values
    const initialValues: FormInitialValues = {
        boxName: '',
        innerItemsCount: 0,
        boxWeight: 0,
        dimensions: {
            height: 0,
            width: 0,
            depth: 0,
        },
    }

    // Form Validation Schema
    const validationSchema = object({
        boxName: string().required('Required'),
        innerItemsCount: number()
            .min(1, 'Item count should be greater than 0')
            .required('Please select a innerItemsCount'),
        boxWeight: number()
            .min(1, 'Box weight should be greater than 0')
            .required('Required'),
        dimensions: object().shape({
            height: number()
                .min(1, 'Height should be greter than 0')
                .required('Required'),
            width: number()
                .min(1, 'Weight should be greater than 0')
                .required('Required'),
            depth: number()
                .min(1, 'depth should be greater than 0')
                .required('Required'),
        }),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        addCartonBox({
            boxName: values.boxName,
            innerItemCount: values.innerItemsCount,
            dimension: values.dimensions,
            boxWeight: values.boxWeight,
            companyId: userData?.companyId || '',
        }).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Added successfully!')
                    navigate('/configurations/carton-box')
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
                        <AddCartonBox
                            formikProps={formikProps}
                            apiStatus={apiStatus}
                        />
                    )
                }}
            </Formik>
       
    )
}

export default AddCartonBoxWrapper
