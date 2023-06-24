import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import AddBarcode from './AddBarcode'
import { useAddBarcodeMutation } from 'src/services/BarcodeService'
import { showToast } from 'src/utils'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'
import { v4 as uuidv4 } from 'uuid'
import { useGetAllProductGroupQuery } from 'src/services/ProductGroupService'
import { setAllItems } from 'src/redux/slices/productGroupSlice'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

type Props = {}

export type FormInitialValues = {
    productGroup: string
    quantity: string
    lotNumber: string
}

const AddBarcodeWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState(false)
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { allItems }: any = useSelector(
        (state: RootState) => state?.productGroup
    )

    const [addBarcode] = useAddBarcodeMutation()
    const {
        data: productGroupData,
        isLoading: pgIsLoading,
        isFetching: pgIsFetching,
    } = useGetAllProductGroupQuery(userData?.companyId)

    useEffect(() => {
        dispatch(setAllItems(productGroupData?.data))
    }, [dispatch, productGroupData, pgIsLoading, pgIsFetching])

    // Form Initial Values
    const initialValues: FormInitialValues = {
        productGroup: '',
        quantity: '',
        lotNumber: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        productGroup: string().required('Group Name is required'),
        quantity: string().required('Quantity is required'),
        lotNumber: string().required('Lot number is required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = async (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))

        const uniqueGrouId = uuidv4()

        await addBarcode({
            productGroupId: values.productGroup,
            barcodeGroupNumber: uniqueGrouId,
            quantity: Number(values?.quantity),
            lotNumber: values.lotNumber,
            companyId: userData?.companyId || '',
        }).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Added successfully!')
                    navigate('/configurations/barcode')
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', 'Something went wrong')
            }
            setApiStatus(false)
        })
    }
    const productGroupOption = allItems?.map((ele: any) => {
        return { label: ele?.groupName, value: ele?._id }
    })

    return (
        <ConfigurationLayout>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <AddBarcode
                            formikProps={formikProps}
                            apiStatus={apiStatus}
                            productGroupOption={productGroupOption}
                        />
                    )
                }}
            </Formik>
        </ConfigurationLayout>
    )
}

export default AddBarcodeWrapper
