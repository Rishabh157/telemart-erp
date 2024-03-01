/// ==============================================
// Filename:AddBarcodeWrapper.tsx
// Type: ADD Component
// Last Updated: JUNE 24, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { object, string, number } from 'yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

// |-- Internal Dependencies --|

import AddBarcode from './AddBarcode'
import { useAddBarcodeMutation } from 'src/services/BarcodeService'
import { showToast } from 'src/utils'
import { useGetAllProductGroupQuery } from 'src/services/ProductGroupService'
import { WarehousesListResponse } from 'src/models'
import { useGetWareHousesQuery } from 'src/services/WareHouseService'
import { SelectOption } from 'src/models/FormField/FormField.model'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import { setAllItems } from 'src/redux/slices/productGroupSlice'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    productGroup: string
    // wareHouseId: string
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

    const [wareHouseOption, setWareHouseOption] = useState<SelectOption[] | []>(
        []
    )

    const {
        data: whData,
        isLoading: whIsLoading,
        isFetching: whIsFetching,
    } = useGetWareHousesQuery(userData?.companyId)

    useEffect(() => {
        if (!whIsFetching && !whIsLoading) {
            const options = whData?.data?.map((ele: WarehousesListResponse) => {
                return {
                    label: ele?.wareHouseName,
                    value: ele?._id,
                }
            })
            setWareHouseOption(options)
        }
    }, [whData, whIsLoading, whIsFetching])

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
        // wareHouseId: '',
        quantity: '',
        lotNumber: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        productGroup: string().required('Group Name is required'),
        quantity: number()
            .moreThan(0, 'Quantity must be greater than 0')
            .required('Quantity is required'),
        lotNumber: string().required('Batch number is required'),
        // wareHouseId: string().required('Warehouse is required'),
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
            // wareHouseId: null,
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
                            wareHouseOption={wareHouseOption}
                        />
                    )
                }}
            </Formik>
       
    )
}

export default AddBarcodeWrapper
