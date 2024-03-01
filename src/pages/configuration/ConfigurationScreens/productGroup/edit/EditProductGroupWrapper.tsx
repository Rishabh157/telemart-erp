// Filename:EditProductGroupWrapper.tsx
// Type: Edit Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { number, object, string } from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|

import { showToast } from 'src/utils'
import { setSelectedProductGroup } from 'src/redux/slices/productGroupSlice'
import {
    useGetProductGroupByIdQuery,
    useUpdateProductGroupMutation,
} from 'src/services/ProductGroupService'
import EditProductGroupListing from './EditProductGroupListing'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    groupName: string
    dealerSalePrice: number
    gst: number
    sgst: number
    cgst: number
    igst: number
    utgst: number
}

const EditProductGroupWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const Id = params.id
    const { selectedProductGroup }: any = useSelector(
        (state: RootState) => state.productGroup
    )

    const { userData } = useSelector((state: RootState) => state?.auth)

    const [EditProductGroup] = useUpdateProductGroupMutation()
    const [apiStatus, setApiStatus] = useState<boolean>(false)

    const { data, isLoading } = useGetProductGroupByIdQuery(Id)

    const initialValues: FormInitialValues = {
        groupName: selectedProductGroup?.groupName || '',
        dealerSalePrice: selectedProductGroup?.dealerSalePrice,
        gst: selectedProductGroup?.gst,
        sgst: selectedProductGroup?.sgst,
        cgst: selectedProductGroup?.cgst,
        igst: selectedProductGroup?.igst,
        utgst: selectedProductGroup?.utgst,
    }

    // Form Validation Schema
    const validationSchema = object({
        groupName: string().required('Required'),
        dealerSalePrice: number(),
        gst: number(),
        sgst: number(),
        cgst: number(),
        igst: number(),
        utgst: number(),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))

        setTimeout(() => {
            EditProductGroup({
                body: {
                    groupName: values.groupName,
                    dealerSalePrice: values.dealerSalePrice,
                    gst: values.gst,
                    sgst: values.sgst,
                    cgst: values.cgst,
                    igst: values.igst,
                    utgst: values.utgst,
                    companyId: userData?.companyId || '',
                },
                id: Id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Updated successfully!')
                        navigate('/configurations/product-group')
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

    useEffect(() => {
        dispatch(setSelectedProductGroup(data?.data))
    }, [dispatch, data, isLoading])
    return (
        
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <EditProductGroupListing
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
       
    )
}

export default EditProductGroupWrapper
