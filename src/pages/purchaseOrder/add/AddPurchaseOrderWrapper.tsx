import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import { array, date, number, object, string } from 'yup'
import AddPurchaseOrder from './AddPurchaseOrder'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { RootState, AppDispatch } from 'src/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { useAddPurchaseOrderMutation } from 'src/services/PurchaseOrderService'
import { showToast } from 'src/utils'
import { useNavigate } from 'react-router-dom'
import { useGetVendorsQuery } from 'src/services/VendorServices'
import { useGetWareHousesQuery } from 'src/services/WareHoouseService'
import { useGetAllItemsQuery } from 'src/services/ItemService'
import { setAllItems } from 'src/redux/slices/vendorSlice'
import { setAllItems as setAllWareHouse } from 'src/redux/slices/warehouseSlice'
import { setAllItems as setAllItem } from 'src/redux/slices/itemSlice'
import moment from 'moment'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

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

// export type DropdownOptions = {
// vendorOptions : SelectOption[]
// warehouseOptions : SelectOption[]
// itemOptions : SelectOption[]
// }

const AddPurchaseOrderWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [addPurchaseOrder] = useAddPurchaseOrderMutation()
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
        dispatch(setAllItems(vendorData?.data))
    }, [vendorData, vendorIsLoading, VendorIsFetching, dispatch])

    //warehouse
    useEffect(() => {
        dispatch(setAllWareHouse(warehouseData?.data))
    }, [warehouseData, warehouseIsLoading, warehouseIsFetching, dispatch])

    useEffect(() => {
        dispatch(setAllItem(itemsData?.data))
    }, [itemsData, dispatch, itemsIsLoading, itemsIsFetching])
    //itemOption

    // Form Initial Values
    const initialValues: FormInitialValues = {
        poCode: '',
        vendorId: '',
        wareHouseId: '',
        isEditable: true,
        purchaseOrder: [
            {
                itemId: '',
                rate: 0,
                quantity: 0,
                estReceivingDate: '',
            },
        ],
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
                    .min(1, 'Rate must be greater than 0')
                    .required('Please enter rate'),
                quantity: number()
                    .min(1, 'Quantity must be greater than 0')
                    .required('Please enter quantity'),
                estReceivingDate: date()
                    .typeError('Invalid Date')
                    .required('Please select date'),
            })
        ),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        const purchaseOrder = values.purchaseOrder.map((ele: any) => {
            return {
                ...ele,
                estReceivingDate: moment(ele.estReceivingDate).format(
                    'YYYY/MM/D'
                ),
            }
        })

        setTimeout(() => {
            addPurchaseOrder({
                poCode: values.poCode,
                vendorId: values.vendorId,
                wareHouseId: values.wareHouseId,
                isEditable: values.isEditable,
                purchaseOrder: purchaseOrder,
                companyId: userData?.companyId || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast(
                            'success',
                            'purchase-order added successfully!'
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
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <AddPurchaseOrder
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
export default AddPurchaseOrderWrapper
