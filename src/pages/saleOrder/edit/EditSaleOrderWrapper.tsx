/* eslint-disable array-callback-return */
/// ==============================================
// Filename:EditSaleOrderWrapper.tsx
// Type: Edit Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { Formik, FormikProps } from 'formik'
import { array, number, object, string } from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import EditSaleOrder from './EditSaleOrder'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { showToast } from 'src/utils'
import { useGetAllDealersQuery } from 'src/services/DealerServices'
import { useGetWareHousesQuery } from 'src/services/WareHouseService'
import { useGetAllProductGroupQuery } from 'src/services/ProductGroupService'
import {
    useGetSalesOrderByIdQuery,
    useUpdateSalesOrderMutation,
} from 'src/services/SalesOrderService'

// |-- Redux --|
import { setAllItems } from 'src/redux/slices/dealerSlice'
import { setAllItems as setAllWareHouse } from 'src/redux/slices/warehouseSlice'
import { setAllItems as setAllProductGroups } from 'src/redux/slices/productGroupSlice'
import { RootState, AppDispatch } from 'src/redux/store'
import { setSelectedItem } from 'src/redux/slices/saleOrderSlice'

// |-- Types --|
type Props = {}

// interface ProductSalesOrder {
//     productGroupId: string
//     rate: number
//     quantity: number
//     _id: string
//     groupName: string
// }

// interface ProductSalesOrderListResponseType {
//     _id: string
//     soNumber: string
//     dealerId: string
//     dealerWareHouseId: string
//     companyWareHouseId: string
//     dhApprovedById: string | null
//     dhApproved: boolean | null
//     dhApprovedActionBy: string
//     dhApprovedAt: string
//     accApprovedById: string | null
//     accApproved: boolean | null
//     accApprovedActionBy: string
//     accApprovedAt: string
//     productSalesOrder: ProductSalesOrder
//     status: string
//     companyId: string
//     isDeleted: boolean
//     isActive: boolean
//     __v: number
//     createdAt: string
//     updatedAt: string
//     dealerLabel: string
//     companyWarehouseLabel: string
//     warehouseLabel: string
// }

export type FormInitialValues = {
    soNumber: string | ''
    dealerId: string | ''
    dealerWareHouseId: string | ''
    companyWareHouseId: string | ''
    companyId: string | ''
    productSalesOrder: {
        soId: string
        productGroupId: string
        rate: number | 0
        quantity: number | 0
    }[]
    id: string
    dhApproved: string
    dhApprovedActionBy: string
    dhApprovedAt: string
    accApproved: string
    accApprovedActionBy: string
    accApprovedAt: string
    dhApprovedById: string
    accApprovedById: string
}

const EditSaleOrderWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const [editSaleOrder, setEditSaleOrder] = useState<FormInitialValues>({
        soNumber: '',
        dealerId: '',
        dealerWareHouseId: '',
        companyWareHouseId: '',
        productSalesOrder: [],
        companyId: '',
        id: '',
        dhApproved: '',
        dhApprovedActionBy: '',
        dhApprovedAt: '',
        accApproved: '',
        accApprovedActionBy: '',
        accApprovedAt: '',
        dhApprovedById: '',
        accApprovedById: '',
    })
    const Id = params.id
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [updateSaleOrder] = useUpdateSalesOrderMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { selectedItem }: any = useSelector(
        (state: RootState) => state?.saleOrder
    )

    const { data, isLoading, isFetching } = useGetSalesOrderByIdQuery(Id)
    useEffect(() => {
        if (!isLoading && !isFetching) {
            dispatch(setSelectedItem(data?.data))
        }
    }, [dispatch, data, isLoading, isFetching])

    const {
        data: dealerData,
        isLoading: dealerIsLoading,
        isFetching: dealerIsFetching,
    } = useGetAllDealersQuery(userData?.companyId)
    const { allItems }: any = useSelector((state: RootState) => state?.dealer)

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
    const dealerOptions = allItems?.map((ele: any) => {
        return {
            label: ele.firstName + ' ' + ele.lastName,
            value: ele._id,
        }
    })

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
        dispatch(setAllItems(dealerData?.data))
    }, [dealerData, dealerIsLoading, dealerIsFetching, dispatch])

    //Warehouse
    useEffect(() => {
        dispatch(setAllWareHouse(warehouseData?.data))
    }, [warehouseData, warehouseIsLoading, warehouseIsFetching, dispatch])

    //ProductGroup
    useEffect(() => {
        dispatch(setAllProductGroups(productGroupData?.data))
    }, [
        productGroupData,
        productGroupIsLoading,
        productGroupIsFetching,
        dispatch,
    ])

    const dropdownOptions = {
        dealerOptions: dealerOptions,
        warehouseOptions: warehouseOptions,
        productGroupOptions: productGroupOptions,
    }

    useEffect(() => {
        if (selectedItem?.length) {
            let product: FormInitialValues = {
                soNumber: '',
                dealerId: '',
                dealerWareHouseId: '',
                companyWareHouseId: '',
                productSalesOrder: [],
                companyId: '',
                id: '',
                dhApproved: '',
                dhApprovedActionBy: '',
                dhApprovedAt: '',
                accApproved: '',
                accApprovedActionBy: '',
                accApprovedAt: '',
                dhApprovedById: '',
                accApprovedById: '',
            }

            selectedItem?.map((ele: any) => {
                product = {
                    ...product,
                    soNumber: ele?.soNumber,
                    dealerId: ele?.dealerId,
                    dealerWareHouseId: ele?.dealerWareHouseId,
                    companyWareHouseId: ele?.companyWareHouseId,
                    companyId: ele?.companyId,
                    dhApproved: ele?.dhApproved,
                    dhApprovedActionBy: ele?.dhApprovedActionBy,
                    dhApprovedAt: ele?.dhApprovedAt,
                    accApproved: ele?.accApproved,
                    accApprovedActionBy: ele?.accApprovedActionBy,
                    accApprovedAt: ele?.accApprovedAt,
                    dhApprovedById: ele?.dhApprovedById,
                    accApprovedById: ele?.accApprovedById,
                    productSalesOrder: [
                        ...product.productSalesOrder,
                        {
                            soId: ele?._id,
                            productGroupId:
                                ele?.productSalesOrder?.productGroupId,
                            rate: ele?.productSalesOrder?.rate,
                            quantity: ele?.productSalesOrder?.quantity,
                        },
                    ],
                }
            })
            setEditSaleOrder(product)
        }
    }, [selectedItem])

    // Form Initial Values
    const initialValues: FormInitialValues = {
        soNumber: editSaleOrder?.soNumber || '',
        dealerId: editSaleOrder?.dealerId || '',
        dealerWareHouseId: editSaleOrder?.dealerWareHouseId || '',
        companyWareHouseId: editSaleOrder?.companyWareHouseId || '',
        companyId: editSaleOrder?.companyId || '',
        productSalesOrder: editSaleOrder.productSalesOrder,
        id: '',
        dhApproved: editSaleOrder.dhApproved,
        dhApprovedActionBy: editSaleOrder.dhApprovedActionBy,
        dhApprovedAt: editSaleOrder.dhApprovedAt,
        accApproved: editSaleOrder.accApproved,
        accApprovedActionBy: editSaleOrder.accApprovedActionBy,
        accApprovedAt: editSaleOrder.accApprovedAt,
        dhApprovedById: editSaleOrder.dhApprovedById,
        accApprovedById: editSaleOrder.accApprovedById,
    }

    // Form Validation Schema
    const validationSchema = object({
        soNumber: string().required('Sale order number is required'),
        dealerId: string().required('Please select a dealer'),
        dealerWareHouseId: string().required(
            'Please select a  Dealer Warehouse'
        ),
        companyWareHouseId: string().required('Please select a warehouse'),
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
        let newValues = {
            soNumber: values?.soNumber || '',
            dealerId: values?.dealerId || '',
            dealerWareHouseId: values?.dealerWareHouseId || '',
            companyWareHouseId: values?.companyWareHouseId || '',
            companyId: values?.companyId || '',
            productSalesOrder: {},
            id: '',
            dhApproved: values.dhApproved,
            dhApprovedActionBy: values.dhApprovedActionBy,
            dhApprovedAt: values.dhApprovedAt,
            accApproved: values.accApproved,
            accApprovedActionBy: values.accApprovedActionBy,
            accApprovedAt: values.accApprovedAt,
            dhApprovedById: values.dhApprovedById,
            accApprovedById: values.accApprovedById,
        }

        const finalValues: any = []
        values.productSalesOrder.map((ele) => {
            finalValues.push({
                ...newValues,
                id: ele.soId ? ele.soId : '',
                productSalesOrder: {
                    productGroupId: ele.productGroupId,
                    rate: ele.rate,
                    quantity: ele.quantity,
                },
            })
        })

        setApiStatus(true)
        setTimeout(() => {
            updateSaleOrder({
                body: finalValues,
                id: Id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Sale-Order Updated successfully!')
                        navigate('/sale-order')
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
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => {
                    return (
                        <EditSaleOrder
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

export default EditSaleOrderWrapper
