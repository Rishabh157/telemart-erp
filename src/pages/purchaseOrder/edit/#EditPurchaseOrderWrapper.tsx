/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import { array, date, number, object, string } from 'yup'
import EditPurchaseOrder from './EditPurchaseOrder'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { RootState, AppDispatch } from 'src/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import {
    useGetPurchaseOrderByIdQuery,
    useUpdatePurchaseOrderMutation,
} from 'src/services/PurchaseOrderService'
import { showToast } from 'src/utils'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetVendorsQuery } from 'src/services/VendorServices'
import { useGetWareHousesQuery } from 'src/services/WareHoouseService'
import { useGetAllItemsQuery } from 'src/services/ItemService'
import { setAllItems } from 'src/redux/slices/vendorSlice'
import { setAllItems as setAllWareHouse } from 'src/redux/slices/warehouseSlice'
import { setAllItems as setAllItem } from 'src/redux/slices/itemSlice'
import moment from 'moment'
import { setSelectedItems } from 'src/redux/slices/PurchaseOrderSlice'

type Props = {}

export type FormInitialValues = {
    poCode: string
    vendorId: string
    wareHouseId: string
    isEditable: boolean
    purchaseOrder: {
        itemId: string
        rate: number
        quantity: number
        estReceivingDate: string
    }[]
}

const EditPurchaseOrderWrapper = (props: Props) => {
    const params = useParams()
    const Id = params.id

    const navigate = useNavigate()
    const disptach = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [UpdatePurchaseOrder] = useUpdatePurchaseOrderMutation()

    const {
        data: poData,
        isFetching: poIsFetching,
        isLoading: poIsLoading,
    } = useGetPurchaseOrderByIdQuery(Id)
    console.log(poData?.data, 'data')

    const { selectedItems }: any = useSelector(
        (state: RootState) => state.purchaseOrder
    )

    useEffect(() => {
        console.log('Effect Called')
    }, [])

    useEffect(() => {
        if (!poIsFetching && !poIsLoading) {
            console.log(poData?.data, 'effect')
            disptach(setSelectedItems(poData?.data || []))
        }
    }, [poData, poIsFetching, poIsLoading])

    const {
        data: vendorData,
        isLoading: vendorIsLoading,
        isFetching: VendorIsFetching,
    } = useGetVendorsQuery(userData?.companyId)
    const { allItems }: any = useSelector((state: RootState) => state.vendor)

    const {
        data: warehouseData,
        isLoading: warehouseIsLoading,
        isFetching: warehouseIsFetching,
    } = useGetWareHousesQuery(userData?.companyId)

    const { allItems: warehouseItems }: any = useSelector(
        (state: RootState) => state?.warehouse
    )
    const {
        data: itemsData,
        isLoading: itemsIsLoading,
        isFetching: itemsIsFetching,
    } = useGetAllItemsQuery(userData?.companyId)

    const { allItems: itemsList }: any = useSelector(
        (state: RootState) => state.item
    )

    const vendorOptions = allItems?.map((ele: any) => {
        return {
            label: ele.companyName,
            value: ele._id,
        }
    })

    const warehouseOptions = warehouseItems?.map((ele: any) => {
        return {
            label: ele.wareHouseName,
            value: ele._id,
        }
    })

    const itemOptions = itemsList?.map((ele: any) => {
        return {
            label: ele.itemName,
            value: ele._id,
        }
    })

    //vendor
    useEffect(() => {
        disptach(setAllItems(vendorData?.data))
    }, [vendorData, vendorIsLoading, VendorIsFetching, disptach])

    //warehouse
    useEffect(() => {
        disptach(setAllWareHouse(warehouseData?.data))
    }, [warehouseData, warehouseIsLoading, warehouseIsFetching, disptach])

    useEffect(() => {
        disptach(setAllItem(itemsData?.data))
    }, [itemsData, disptach, itemsIsLoading, itemsIsFetching])

    var purchaseOrderValue = []
    purchaseOrderValue.push(selectedItems?.purchaseOrder)

    const initialValues: FormInitialValues = {
        poCode: selectedItems?.poCode || '',
        vendorId: selectedItems?.vendorId || '',
        wareHouseId: selectedItems?.wareHouseId || '',
        isEditable: true,
        purchaseOrder: purchaseOrderValue || [],
    }

    // Form Validation Schema
    const validationSchema = object({
        poCode: string().required('Purchase order code is required'),
        vendorId: string().required('Please select a vendor'),
        wareHouseId: string().required('Please select a warehouse'),
        purchaseOrder: array().of(
            object().shape({
                itemId: string().required('Please select a Item'),
                rate: number()
                    .min(0, 'Rate must be greater than 0')
                    .required('Please enter rate'),
                quantity: number()
                    .min(0, 'Quantity must be greater than 0')
                    .required('Please enter quantity'),
                estReceivingDate: date().required('Please select date'),
            })
        ),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        console.log(values?.purchaseOrder)
        const purchaseOrder = values?.purchaseOrder?.map((ele: any) => {
            return {
                id: ele._id,
                itemId: ele.itemId,
                rate: ele.rate,
                quantity: ele.quantity,
                estReceivingDate: moment(ele.estReceivingDate).format(
                    'YYYY/MM/D'
                ),
            }
        })

        setTimeout(() => {
            UpdatePurchaseOrder({
                body: {
                    poCode: values.poCode,
                    vendorId: values.vendorId,
                    wareHouseId: values.wareHouseId,
                    isEditable: values.isEditable,
                    purchaseOrder: purchaseOrder,
                    companyId: userData?.companyId || '',
                },
                id: Id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast(
                            'success',
                            'purchase-order updated successfully!'
                        )
                        navigate('/purchase-order')
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

    // const dropdownOptions : DropdownOptions = {
    //   vendorOptions,
    //   warehouseOptions,
    //   itemOptions,
    // }

    return (
        <SideNavLayout>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <EditPurchaseOrder
                            formikProps={formikProps}
                            vendorOptions={vendorOptions}
                            warehouseOptions={warehouseOptions}
                            itemOptions={itemOptions}
                            apiStatus={apiStatus}
                        />
                    )
                }}
            </Formik>
        </SideNavLayout>
    )
}
export default EditPurchaseOrderWrapper
