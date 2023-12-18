/* eslint-disable array-callback-return */
/// ==============================================
// Filename:EditRTVendorWrapper.tsx
// Type: Edit Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { Formik, FormikProps } from 'formik'
// import { number, object, string } from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import EditRTVendor from './EditRTVendor'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { showToast } from 'src/utils'
import { useGetWareHousesQuery } from 'src/services/WareHouseService'
import { useGetAllProductGroupQuery } from 'src/services/ProductGroupService'
import {
    useGetReturnToOrderByIdQuery,
    useUpdateReturnToVendorOrderMutation,
} from 'src/services/ReturnToVendorService'

// |-- Redux --|
import { setAllItems as setAllVendor } from 'src/redux/slices/vendorSlice'
import { setAllItems as setAllWareHouse } from 'src/redux/slices/warehouseSlice'
import { setAllItems as setAllProductGroups } from 'src/redux/slices/productGroupSlice'
import { RootState, AppDispatch } from 'src/redux/store'
import { setSelectedItem } from 'src/redux/slices/returnToVendorSlice'
import { useGetVendorsQuery } from 'src/services/VendorServices'
import { array, number, object, string } from 'yup'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    rtvNo: string
    vendorId: string
    warehouseId: string
    remark: string
    companyId: string
    productSalesOrder: {
        soId: string
        productGroupId: string
        rate: number
        quantity: number
    }[]
    id: string
    firstApproved: boolean
    firstApprovedActionBy: string
    firstApprovedAt: string
    firstApprovedById: string
    secondApproved: boolean | null
    secondApprovedActionBy: string
    secondApprovedById: string | null
    secondApprovedAt: string
}

const EditRTVendorWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const [editSaleOrder, setEditSaleOrder] = useState<FormInitialValues>({
        rtvNo: '',
        vendorId: '',
        warehouseId: '',
        remark: '',
        productSalesOrder: [],
        companyId: '',
        id: '',
        firstApproved: false,
        firstApprovedActionBy: '',
        firstApprovedAt: '',
        firstApprovedById: '',
        secondApproved: false,
        secondApprovedActionBy: '',
        secondApprovedById: '',
        secondApprovedAt: '',
    })
    const Id = params.id
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [updateReturnToVendor] = useUpdateReturnToVendorOrderMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { selectedItem }: any = useSelector(
        (state: RootState) => state?.returnToVendor
    )
    // all vendor query
    const { allItems: allVendor }: any = useSelector(
        (state: RootState) => state.vendor
    )

    const { data, isLoading, isFetching } = useGetReturnToOrderByIdQuery(Id)
    useEffect(() => {
        if (!isLoading && !isFetching) {
            dispatch(setSelectedItem(data?.data))
        }
    }, [dispatch, data, isLoading, isFetching])

    const {
        data: vendorData,
        isLoading: vendorIsLoading,
        isFetching: VendorIsFetching,
    } = useGetVendorsQuery(userData?.companyId)

    //vendor
    useEffect(() => {
        if (!vendorIsLoading && !VendorIsFetching) {
            dispatch(setAllVendor(vendorData?.data))
        }
    }, [vendorData, vendorIsLoading, VendorIsFetching, dispatch])

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

    const vendorOptions = allVendor?.map((ele: any) => {
        return {
            label: ele?.companyName,
            value: ele?._id,
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

    //Warehouse
    useEffect(() => {
        if (!warehouseIsLoading && !warehouseIsFetching) {
            dispatch(setAllWareHouse(warehouseData?.data))
        }
    }, [warehouseData, warehouseIsLoading, warehouseIsFetching, dispatch])

    //ProductGroup
    useEffect(() => {
        if (!productGroupIsLoading && !productGroupIsFetching) {
            dispatch(setAllProductGroups(productGroupData?.data))
        }
    }, [
        productGroupData,
        productGroupIsLoading,
        productGroupIsFetching,
        dispatch,
    ])

    const dropdownOptions = {
        warehouseOptions: warehouseOptions,
        productGroupOptions: productGroupOptions,
        vendorOptions: vendorOptions,
    }

    useEffect(() => {
        if (selectedItem?.length) {
            let product: FormInitialValues = {
                rtvNo: '',
                remark: '',
                vendorId: '',
                warehouseId: '',
                productSalesOrder: [],
                companyId: '',
                id: '',
                firstApproved: false,
                firstApprovedActionBy: '',
                firstApprovedAt: '',
                firstApprovedById: '',
                secondApproved: false,
                secondApprovedActionBy: '',
                secondApprovedById: '',
                secondApprovedAt: '',
            }

            selectedItem?.map((ele: any) => {
                product = {
                    ...product,
                    rtvNo: ele?.rtvNumber,
                    vendorId: ele?.vendorId,
                    warehouseId: ele?.warehouseId,
                    remark: ele?.remark,
                    companyId: ele?.companyId,
                    firstApproved: ele?.firstApproved,
                    firstApprovedActionBy: ele?.firstApprovedActionBy,
                    firstApprovedAt: ele?.firstApprovedAt,
                    firstApprovedById: ele?.firstApprovedById,
                    secondApproved: ele?.secondApproved,
                    secondApprovedActionBy: ele?.secondApprovedActionBy,
                    secondApprovedById: ele?.secondApprovedById,
                    secondApprovedAt: ele?.secondApprovedAt,
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
        rtvNo: editSaleOrder?.rtvNo || '',
        vendorId: editSaleOrder?.vendorId || '',
        warehouseId: editSaleOrder?.warehouseId || '',
        companyId: editSaleOrder?.companyId || '',
        remark: editSaleOrder?.remark,
        productSalesOrder: editSaleOrder.productSalesOrder,
        id: '',
        firstApproved: editSaleOrder.firstApproved,
        firstApprovedActionBy: editSaleOrder.firstApprovedActionBy,
        firstApprovedAt: editSaleOrder.firstApprovedAt,
        firstApprovedById: editSaleOrder.firstApprovedById,
        secondApproved: editSaleOrder.secondApproved,
        secondApprovedActionBy: editSaleOrder.secondApprovedActionBy,
        secondApprovedById: editSaleOrder.secondApprovedById,
        secondApprovedAt: editSaleOrder.secondApprovedAt,
    }

    // Form Validation Schema
    const validationSchema = object({
        rtvNo: string()
            .required('return to vendor number is required')
            .matches(
                // eslint-disable-next-line no-useless-escape
                /^[a-zA-Z]+[^\/\\]*$/,
                'Only alphabetical characters are allowed, except / and \\'
            ),
        remark: string(),
        vendorId: string().required('please select a vendor'),
        warehouseId: string().required('please select warehouse'),
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
            rtvNumber: values?.rtvNo || '',
            vendorId: values?.vendorId || '',
            warehouseId: values?.warehouseId || '',
            remark: values?.remark,
            companyId: values?.companyId || '',
            productSalesOrder: {},
            id: '',
            firstApproved: values.firstApproved,
            firstApprovedActionBy: values.firstApprovedActionBy,
            firstApprovedAt: values.firstApprovedAt,
            firstApprovedById: values.firstApprovedById,
            secondApproved: values.secondApproved,
            secondApprovedActionBy: values.secondApprovedActionBy,
            secondApprovedById: values.secondApprovedById,
            secondApprovedAt: values.secondApprovedAt,
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
            updateReturnToVendor({
                body: finalValues,
                id: Id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Updated successfully!')
                        navigate('/return-to-vendor')
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
                        <EditRTVendor
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

export default EditRTVendorWrapper
