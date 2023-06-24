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
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import AddItem from './AddItem'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import { useAddItemsMutation } from 'src/services/ItemService'
import { showToast } from 'src/utils'


// |-- Redux --|
import { RootState } from 'src/redux/store'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    itemCode: string
    itemName: string
    itemWeight: string
}

const AddItemWrapper = (props: Props) => {
    const navigate = useNavigate()
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
        itemCode: string().required('Required'),
        itemName: string().required('Required'),
        itemWeight: string().required('Required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
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
        <ConfigurationLayout>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return <AddItem formikProps={formikProps} />
                }}
            </Formik>
        </ConfigurationLayout>
    )
}

export default AddItemWrapper
