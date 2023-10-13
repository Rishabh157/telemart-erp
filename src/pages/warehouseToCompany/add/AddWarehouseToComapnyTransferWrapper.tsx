/// ==============================================
// Filename:AddWarehouseToComapnyTransferWrapper.tsx
// Type: Add Component
// Last Updated: JULY 30, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { Formik, FormikProps } from 'formik'
// import { array, number, object, string } from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import AddWarehouseToComapny from './AddWarehouseToComapnyTransfer'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { showToast } from 'src/utils'
import { useGetAllDealersQuery } from 'src/services/DealerServices'
import { useGetWareHousesQuery } from 'src/services/WareHouseService'
import { useGetAllProductGroupQuery } from 'src/services/ProductGroupService'
import { useAddWarehouseToComapnyMutation } from 'src/services/WarehouseToComapnyService'

// |-- Redux--|
import { setAllItems } from 'src/redux/slices/dealerSlice'
import { setItems as setAllCompany } from 'src/redux/slices/companySlice'

import { setAllItems as setAllWareHouse } from 'src/redux/slices/warehouseSlice'
import { setAllItems as setAllProductGroups } from 'src/redux/slices/productGroupSlice'
import { RootState, AppDispatch } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { useGetAllCompaniesQuery } from 'src/services/CompanyServices'

// |-- Types --|
type Props = {}
interface ProductSalesOrder {
    productGroupId: string
    rate: number
    quantity: number
}

export type FormInitialValues = {
    wtcNumber: string
    fromWarehouseId: string
    toWarehouseId: string
    productSalesOrder: ProductSalesOrder[]
    remark: string
    companyId: string
    toCompanyId: string
}

const AddWarehouseToComapnyTransferWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [AddWarehouseToComapnyApi] = useAddWarehouseToComapnyMutation()

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
    //Warehouse
    useEffect(() => {
        if (!warehouseIsLoading && !warehouseIsFetching) {
            dispatch(setAllWareHouse(warehouseData?.data))
        }
    }, [warehouseData, warehouseIsLoading, warehouseIsFetching, dispatch])

    const { allItems: warehouseItems }: any = useSelector(
        (state: RootState) => state?.warehouse
    )
    const { items: companyAllItems }: any = useSelector(
        (state: RootState) => state?.company
    )
    const companyOption = companyAllItems
        ?.filter((ele: any) => ele._id !== userData?.companyId)
        ?.map((ele: any) => {
            return {
                label: ele.companyName,
                value: ele._id,
            }
        })
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

    const {
        data: companyData,
        isFetching,
        isLoading,
    } = useGetAllCompaniesQuery('', {
        skip: !userData?.companyId,
    })
    useEffect(() => {
        if (!isLoading && !isFetching) {
            dispatch(setAllCompany(companyData?.data))
        }

        // eslint-disable-next-line
    }, [companyData, isLoading, isFetching])

    const dropdownOptions = {
        companyOption: companyOption,
        warehouseOptions: warehouseOptions,
        productGroupOptions: productGroupOptions,
    }

    // Form Initial Values
    const initialValues: FormInitialValues = {
        wtcNumber: '',
        fromWarehouseId: '',
        toWarehouseId: '',
        productSalesOrder: [],
        remark: '',
        companyId: '',
        toCompanyId: '',
    }

    // Form Validation Schema
    // const validationSchema = object({
    //     soNumber: string().required('Sale order number is required'),
    //     dealerId: string().required('Please select a dealer'),
    //     dealerWareHouseId: string().required(
    //         'Please select a  Dealer Warehouse'
    //     ),
    //     companyWareHouseId: string().required('Please select a warehouse'),
    //     productSalesOrder: array().of(
    //         object().shape({
    //             productGroupId: string().required(
    //                 'Please select a product name'
    //             ),
    //             rate: number()
    //                 .min(1, 'Rate must be greater than 0')
    //                 .required('Please enter rate'),
    //             quantity: number()
    //                 .min(1, 'Quantity must be greater than 0')
    //                 .required('Please enter quantity'),
    //         })
    //     ),
    // })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        setTimeout(() => {
            AddWarehouseToComapnyApi({
                wtcNumber: values.wtcNumber,
                fromWarehouseId: values.fromWarehouseId,
                toWarehouseId: values.toWarehouseId,
                productSalesOrder: values.productSalesOrder,
                remark: values.remark,
                toCompanyId: values.toCompanyId,
                companyId: userData?.companyId || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'request added successfully!')
                        navigate('/warehouse-to-company')
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
                // validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => {
                    return (
                        <AddWarehouseToComapny
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

export default AddWarehouseToComapnyTransferWrapper
