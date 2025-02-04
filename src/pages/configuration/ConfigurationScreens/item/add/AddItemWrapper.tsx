/// ==============================================
// Filename:AddItemWrapper.tsx
// Type: Add Component
// Last Updated: JUNE 24, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { object, string } from 'yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import AddItem from './AddItem'

import { useAddItemsMutation } from 'src/services/ItemService'
import { showToast } from 'src/utils'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    itemCode: string
    itemName: string
    itemWeight: string
}

const AddItemWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [addItem] = useAddItemsMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    // Form Initial Values
    const initialValues: FormInitialValues = {
        itemCode: '',
        itemName: '',
        itemWeight: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        itemCode: string().required('Item code is required'),
        itemName: string().required('Item name is required'),
        itemWeight: string().required('Item weight is required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        dispatch(setFieldCustomized(true))
        addItem({
            itemCode: values.itemCode,
            itemName: values.itemName,
            itemWeight: values.itemWeight,
            companyId: userData?.companyId || '',
        }).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Added successfully!')
                    navigate('/configurations/item')
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', 'Something went wrong')
            }
        })
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps) => {
                return <AddItem formikProps={formikProps} />
            }}
        </Formik>
    )
}

export default AddItemWrapper
