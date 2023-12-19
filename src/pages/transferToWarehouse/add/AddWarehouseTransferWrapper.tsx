/* eslint-disable no-useless-escape */
/// ==============================================
// Filename:AddWarehouseTransferWrapper.tsx
// Type: Add Component
// Last Updated: JULY 30, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { Formik, FormikProps } from 'formik'
import { array, number, object, string } from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import AddWarehouseTransfer from './AddWarehouseTransfer'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { showToast } from 'src/utils'
import { useGetAllDealersQuery } from 'src/services/DealerServices'
import { useGetWareHousesQuery } from 'src/services/WareHouseService'
import { useGetAllProductGroupQuery } from 'src/services/ProductGroupService'
import { useAddWarehouseTransferMutation } from 'src/services/WarehouseTransferService'

// |-- Redux--|
import { setAllItems } from 'src/redux/slices/dealerSlice'
import { setAllItems as setAllWareHouse } from 'src/redux/slices/warehouseSlice'
import { setAllItems as setAllProductGroups } from 'src/redux/slices/productGroupSlice'
import { RootState, AppDispatch } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
type Props = {}
interface ProductSalesOrder {
    productGroupId: string
    rate: number
    quantity: number
}

export type FormInitialValues = {
    wtNumber: string
    fromWarehouseId: string
    toWarehouseId: string
    productSalesOrder: ProductSalesOrder[]
    remark: string
    companyId: string
}

const AddWarehouseTransferWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [AddWarehouseTransferApi] = useAddWarehouseTransferMutation()

    const {
        data: dealerData,
        isLoading: dealerIsLoading,
        isFetching: dealerIsFetching,
    } = useGetAllDealersQuery(userData?.companyId)
    // const { allItems }: any = useSelector((state: RootState) => state?.dealer)

    const {
        data: warehouseData,
        isLoading: warehouseIsLoading,
        isFetching: warehouseIsFetching,
    } = useGetWareHousesQuery(userData?.companyId)
    const { allItems: warehouseItems }: any = useSelector(
        (state: RootState) => state?.warehouse
    )

    const {
        data: productGroupData,
        isLoading: productGroupIsLoading,
        isFetching: productGroupIsFetching,
    } = useGetAllProductGroupQuery(userData?.companyId)
    const { allItems: productGroupItems }: any = useSelector(
        (state: RootState) => state?.productGroup
    )

    // const dealerOptions = allItems?.map((ele: any) => {
    //     return {
    //         label: ele.firstName + ' ' + ele.lastName,
    //         value: ele._id,
    //     }
    // })

    const warehouseOptions = warehouseItems?.map((ele: any) => {
        return {
            label: ele.wareHouseName,
            value: ele._id,
        }
    })

    const productGroupOptions = productGroupItems?.map((ele: any) => {
        return {
            label: ele.groupName,
            value: ele._id,
        }
    })

    const productPriceOptions: any = productGroupItems?.map((ele: any) => {
        return {
            key: ele._id,
            value: ele.dealerSalePrice,
        }
    })

    //Dealer
    useEffect(() => {
        if (!dealerIsLoading && !dealerIsFetching) {
            dispatch(setAllItems(dealerData?.data))
        }
    }, [dealerData, dealerIsLoading, dealerIsFetching, dispatch])

    //Warehouse
    useEffect(() => {
        if (!warehouseIsLoading && !warehouseIsFetching) {
            dispatch(setAllWareHouse(warehouseData?.data))
        }
    }, [warehouseData, warehouseIsLoading, warehouseIsFetching, dispatch])

    //ProductGroup
    useEffect(() => {
        if (!productGroupIsLoading && !productGroupIsFetching) {
            // dispatch(setAllWareHouse(warehouseData?.data))
            dispatch(setAllProductGroups(productGroupData?.data))
        }
    }, [
        productGroupData,
        productGroupIsLoading,
        productGroupIsFetching,
        dispatch,
    ])

    const dropdownOptions = {
        // dealerOptions: dealerOptions,
        warehouseOptions: warehouseOptions,
        productGroupOptions: productGroupOptions,
    }

    // Form Initial Values
    const initialValues: FormInitialValues = {
        wtNumber: '',
        fromWarehouseId: '',
        toWarehouseId: '',
        productSalesOrder: [
            {
                productGroupId: '',
                rate: 0,
                quantity: 0,
            },
        ],
        remark: '',
        companyId: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        wtNumber: string()
            .required('WTW number is required')
            .matches(
                /^[a-zA-Z]+[^\/\\]*$/,
                'Only alphabetical characters are allowed, except / and \\'
            ),
        fromWarehouseId: string().required('please select warehouse'),
        toWarehouseId: string().required('please select warehouse'),
        remark: string(),
        productSalesOrder: array().of(
            object().shape({
                productGroupId: string().required(
                    'Please select a product name'
                ),
                rate: number()
                    .min(1, 'Rate must be greater than 0')
                    .required('Please enter rate'),
                quantity: number()
                    .min(1, 'Quantity must be greater than 0')
                    .required('Please enter quantity'),
            })
        ),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            AddWarehouseTransferApi({
                wtNumber: values.wtNumber,
                fromWarehouseId: values.fromWarehouseId,
                toWarehouseId: values.toWarehouseId,
                productSalesOrder: values.productSalesOrder,
                remark: values.remark,
                companyId: userData?.companyId || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'request added successfully!')
                        navigate('/warehouse-transfer')
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
        <SideNavLayout>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => {
                    return (
                        <AddWarehouseTransfer
                            formikProps={formikProps}
                            dropdownOptions={dropdownOptions}
                            apiStatus={apiStatus}
                            productPriceOptions={productPriceOptions}
                        />
                    )
                }}
            </Formik>
        </SideNavLayout>
    )
}

export default AddWarehouseTransferWrapper
