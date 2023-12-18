/// ==============================================
// Filename:EditWarehouseToSampleWrapper.tsx
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
import EditWarehouseToSample from './EditWarehouseToSample'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { showToast } from 'src/utils'
import { useGetAllDealersQuery } from 'src/services/DealerServices'
import { useGetWareHousesQuery } from 'src/services/WareHouseService'
import { useGetAllProductGroupQuery } from 'src/services/ProductGroupService'
import {
    useGetWarehouseToSampleByIdQuery,
    useUpdateWarehouseToSampleOrderMutation,
} from 'src/services/WarehouseToSampleService'

// |-- Redux --|
import { setAllItems } from 'src/redux/slices/dealerSlice'
import { setAllItems as setAllWareHouse } from 'src/redux/slices/warehouseSlice'
import { setAllItems as setAllProductGroups } from 'src/redux/slices/productGroupSlice'
import { RootState, AppDispatch } from 'src/redux/store'
import { setSelectedItem } from 'src/redux/slices/warehouseToSampleSlice'

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
//     dhApproved: ''
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

interface ProductSalesOrder {
    productGroupId: string
    rate: number
    quantity: number
    wtNo: string
}

export type FormInitialValues = {
    id: string
    wtsNumber: string
    fromWarehouseId: string
    toName: string
    firstApproved: boolean | null
    firstApprovedActionBy: string
    firstApprovedAt: string
    secondApproved: boolean | null
    secondApprovedActionBy: string
    secondApprovedAt: string
    firstApprovedById: string | null
    secondApprovedById: string | null
    productSalesOrder: ProductSalesOrder[]
    remark: string
    status: string
    companyId: string
}

const EditWarehouseToSampleWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const [editWarehouseTransfer, setEditWarehouseTransfer] =
        useState<FormInitialValues>({
            wtsNumber: '',
            fromWarehouseId: '',
            firstApproved: null,
            toName: '',
            firstApprovedActionBy: '',
            firstApprovedAt: '',
            secondApproved: null,
            secondApprovedActionBy: '',
            secondApprovedAt: '',
            firstApprovedById: '',
            secondApprovedById: '',
            productSalesOrder: [],
            remark: '',
            status: '',
            id: '',
            companyId: '',
        })
    const Id = params.id
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [updateWarehouseToSample] = useUpdateWarehouseToSampleOrderMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { selectedItem }: any = useSelector(
        (state: RootState) => state?.warehouseToSample
    )

    const { data, isLoading, isFetching } = useGetWarehouseToSampleByIdQuery(
        Id || ''
    )
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
        dealerOptions: dealerOptions,
        warehouseOptions: warehouseOptions,
        productGroupOptions: productGroupOptions,
    }

    useEffect(() => {
        if (selectedItem?.length) {
            let product: FormInitialValues = {
                wtsNumber: '',
                fromWarehouseId: '',
                toName: '',
                firstApproved: null,
                firstApprovedActionBy: '',
                firstApprovedAt: '',
                secondApproved: null,
                secondApprovedActionBy: '',
                secondApprovedAt: '',
                firstApprovedById: '',
                secondApprovedById: '',
                productSalesOrder: [],
                remark: '',
                status: '',
                companyId: '',
                id: '',
            }

            selectedItem?.map((ele: any) => {
                return (product = {
                    ...product,
                    wtsNumber: ele?.wtsNumber,
                    fromWarehouseId: ele?.fromWarehouseId,
                    toName: ele?.toName,
                    firstApproved: ele?.firstApproved,
                    firstApprovedActionBy: ele?.firstApprovedActionBy,
                    firstApprovedAt: ele?.firstApprovedAt,
                    secondApproved: ele?.secondApproved,
                    secondApprovedActionBy: ele?.secondApprovedActionBy,
                    secondApprovedAt: ele?.secondApprovedAt,
                    firstApprovedById: ele?.firstApprovedById,
                    secondApprovedById: ele?.secondApprovedById,
                    remark: ele?.remark,
                    status: ele?.status,
                    companyId: ele?.companyId,
                    id: '',
                    productSalesOrder: [
                        ...product.productSalesOrder,
                        {
                            wtNo: ele?._id,
                            productGroupId:
                                ele?.productSalesOrder?.productGroupId,
                            rate: ele?.productSalesOrder?.rate,
                            quantity: ele?.productSalesOrder?.quantity,
                        },
                    ],
                })
            })
            setEditWarehouseTransfer(product)
        }
    }, [selectedItem])

    // Form Initial Values
    const initialValues: FormInitialValues = {
        wtsNumber: editWarehouseTransfer.wtsNumber,
        fromWarehouseId: editWarehouseTransfer.fromWarehouseId,
        firstApproved: editWarehouseTransfer.firstApproved,
        toName: editWarehouseTransfer.toName,
        productSalesOrder: editWarehouseTransfer.productSalesOrder,
        remark: editWarehouseTransfer.remark,
        firstApprovedActionBy: editWarehouseTransfer.firstApprovedActionBy,
        firstApprovedAt: editWarehouseTransfer.firstApprovedAt,
        secondApproved: editWarehouseTransfer.secondApproved,
        secondApprovedActionBy: editWarehouseTransfer.secondApprovedActionBy,
        secondApprovedAt: editWarehouseTransfer.secondApprovedAt,
        firstApprovedById: editWarehouseTransfer.firstApprovedById,
        secondApprovedById: editWarehouseTransfer.secondApprovedById,
        status: editWarehouseTransfer.status,
        companyId: editWarehouseTransfer.companyId,
        id: editWarehouseTransfer.id,
    }

    // // Form Validation Schema
    const validationSchema = object({
        wtsNumber: string()
            .required('wts number is required')
            .matches(
                // eslint-disable-next-line no-useless-escape
                /^[a-zA-Z]+[^\/\\]*$/,
                'Only alphabetical characters are allowed, except / and \\'
            ),
        fromWarehouseId: string().required('please select warehouse'),
        toName: string().required('please enter receiver'),
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
            wtsNumber: values.wtsNumber,
            fromWarehouseId: values.fromWarehouseId,
            toName: values.toName,
            remark: values.remark,
            firstApproved: values.firstApproved,
            firstApprovedActionBy: values.firstApprovedActionBy,
            firstApprovedAt: values.firstApprovedAt,
            secondApproved: values.secondApproved,
            secondApprovedActionBy: values.secondApprovedActionBy,
            secondApprovedAt: values.secondApprovedAt,
            firstApprovedById: values.firstApprovedById,
            secondApprovedById: values.secondApprovedById,
            // status: values.status,
            companyId: values.companyId,
            id: '',
        }

        const finalValues: any = []
        values?.productSalesOrder?.map((ele) => {
            return finalValues.push({
                ...newValues,
                id: ele.wtNo ? ele.wtNo : '',
                productSalesOrder: {
                    productGroupId: ele.productGroupId,
                    rate: ele.rate,
                    quantity: ele.quantity,
                },
            })
        })

        setApiStatus(true)
        setTimeout(() => {
            updateWarehouseToSample({
                body: finalValues,
                id: Id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', ' Updated successfully!')
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
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => {
                    return (
                        <EditWarehouseToSample
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

export default EditWarehouseToSampleWrapper
