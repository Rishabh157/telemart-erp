/// ==============================================
// Filename:EditItemWrapper.tsx
// Type: Edit Component
// Last Updated: JUNE 24, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { object, string } from 'yup'

// |-- Internal Dependencies --|
import EditItem from './EditItem'

import {
    useGetItemsByIdQuery,
    useUpdateItemsMutation,
} from 'src/services/ItemService'
import { showToast } from 'src/utils'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { ItemListResponse } from 'src/models'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    itemCode: string
    itemName: string
    itemWeight: string
}

const EditItemWrapper = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const params = useParams()
    const Id = params.id
    const [EditItems] = useUpdateItemsMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState(false)

    const { items: selectedItem } = useGetDataByIdCustomQuery<ItemListResponse>(
        {
            useEndPointHook: useGetItemsByIdQuery(Id),
        }
    )
    // Form Initial Values
    const initialValues: FormInitialValues = {
        itemCode: selectedItem?.itemCode || '',
        itemName: selectedItem?.itemName || '',
        itemWeight: selectedItem?.itemWeight || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        itemCode: string().required('Item code is required'),
        itemName: string().required('Item name is required'),
        itemWeight: string().required('Item weight is required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        EditItems({
            body: {
                itemCode: values.itemCode,
                itemName: values.itemName,
                itemWeight: values.itemWeight,
                companyId: userData?.companyId || '',
            },
            id: Id || '',
        }).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Updated successfully!')
                    navigate('/configurations/item')
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
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps) => {
                return (
                    <EditItem formikProps={formikProps} apiStatus={apiStatus} />
                )
            }}
        </Formik>
    )
}

export default EditItemWrapper
