/// ==============================================
// Filename:AddWarehouseToSampleWrapper.tsx
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
import AddWarehouseTransfer from './AddWarehouseToSample'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { showToast } from 'src/utils'
import { useGetAllDealersQuery } from 'src/services/DealerServices'
import { useGetWareHousesQuery } from 'src/services/WareHouseService'
import { useGetAllProductGroupQuery } from 'src/services/ProductGroupService'
import { useAddWarehouseToSampleMutation } from 'src/services/WarehouseToSampleService'

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
    wtsNumber: string
    fromWarehouseId: string
    toName: string
    companyId: string
    remark: string
    productSalesOrder: ProductSalesOrder[]
}

const AddWarehouseToSampleWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [AddWarehouseToSample] = useAddWarehouseToSampleMutation()

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
        wtsNumber: '',
        fromWarehouseId: '',
        toName: '',
        companyId: '',
        remark: '',
        productSalesOrder: [
            {
                productGroupId: '',
                rate: 0,
                quantity: 0,
            },
        ],
    }

    // Form Validation Schema
    const validationSchema = object({
        wtsNumber: string()
            .required(
                'warehouse to sample order number is required'
                // eslint-disable-next-line no-useless-escape
            )
            .matches(
                /^[a-zA-Z]+[^\\/\\]*$/,
                'Only alphabetical characters are allowed, except / and \\'
            ),
        fromWarehouseId: string().required('please select a warehouse'),
        toName: string().required('please enter receiver name'),
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
            AddWarehouseToSample({
                wtsNumber: values.wtsNumber,
                fromWarehouseId: values.fromWarehouseId,
                toName: values.toName,
                companyId: userData?.companyId || '',
                remark: values.remark || '',
                productSalesOrder: values.productSalesOrder,
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'request added successfully!')
                        navigate('/warehouse-to-sample')
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

export default AddWarehouseToSampleWrapper
