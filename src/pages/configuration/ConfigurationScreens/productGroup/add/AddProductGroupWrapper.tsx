// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { number, object, string } from 'yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import AddProductGroup from './AddProductGroup'
import { useAddProductGroupMutation } from 'src/services/ProductGroupService'
import { showToast } from 'src/utils'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
export type FormInitialValues = {
    groupName: string
    productGroupCode: string
    dealerSalePrice: number
    productSubCategoryId: string
    gst: number
    sgst: number
    cgst: number
    igst: number
    utgst: number
}

const AddProductGroupWrapper: React.FC<{}> = () => {
    // Form Initial Values
    const [apiStatus, setApiStatus] = useState<boolean>(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [addProductGroup] = useAddProductGroupMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const initialValues: FormInitialValues = {
        groupName: '',
        productGroupCode: '',
        dealerSalePrice: 0,
        productSubCategoryId: '',
        gst: 0,
        sgst: 0,
        cgst: 0,
        igst: 0,
        utgst: 0,
    }

    // Form Validation Schema
    const validationSchema = object({
        groupName: string().required('Group name is required'),
        productGroupCode: string()
            .required('Product group code is required').min(4, 'Product group code must be at least 4 characters long')
            .max(4, 'Product group code must be at most 4 characters long'),
        productSubCategoryId: string().required('Product sub category is required'),
        dealerSalePrice: number().required('Dealer sale price is required'),
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
            addProductGroup({
                dealerSalePrice: values.dealerSalePrice,
                productGroupCode: values.productGroupCode,
                groupName: values.groupName,
                productSubCategoryId: values.productSubCategoryId,
                gst: values.gst,
                sgst: values.sgst,
                cgst: values.cgst,
                igst: values.igst,
                utgst: values.utgst,
                companyId: userData?.companyId || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Added successfully!')
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

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps) => {
                return (
                    <AddProductGroup
                        apiStatus={apiStatus}
                        formikProps={formikProps}
                    />
                )
            }}
        </Formik>
    )
}

export default AddProductGroupWrapper
