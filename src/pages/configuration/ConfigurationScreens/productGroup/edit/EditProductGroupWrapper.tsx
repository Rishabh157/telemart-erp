// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { number, object, string } from 'yup'

// |-- Internal Dependencies --|

import {
    useGetProductGroupByIdQuery,
    useUpdateProductGroupMutation,
} from 'src/services/ProductGroupService'
import { showToast } from 'src/utils'
import EditProductGroupListing from './EditProductGroupListing'

// |-- Redux --|
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch, RootState } from 'src/redux/store'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    groupName: string
    dealerSalePrice: number
    productSubCategoryId: string
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

    const { items } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetProductGroupByIdQuery(Id),
    })

    const { userData } = useSelector((state: RootState) => state?.auth)

    const [EditProductGroup] = useUpdateProductGroupMutation()
    const [apiStatus, setApiStatus] = useState<boolean>(false)

    const initialValues: FormInitialValues = {
        groupName: items?.groupName || '',
        dealerSalePrice: items?.dealerSalePrice || 0,
        productSubCategoryId: items?.productSubCategoryId,
        gst: items?.gst || 0,
        sgst: items?.sgst || 0,
        cgst: items?.cgst || 0,
        igst: items?.igst || 0,
        utgst: items?.utgst || 0,
    }

    // Form Validation Schema
    const validationSchema = object({
        groupName: string().required('Group name is required'),
        dealerSalePrice: number().required('Dealer sale price is required'),
        productSubCategoryId: string().required('Product sub category is required'),
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
                    productSubCategoryId: values.productSubCategoryId,
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
