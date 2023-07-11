/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:EditInventoryManagementWrapper.tsx
// Type: Edit Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
//import { date, number, object, string } from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useNavigate, useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import EditInventoryManagement from './EditInventoryManagement'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import {
    useGetByIdInventoryManagementQuery,
    useUpdateInventoryManagementMutation,
} from 'src/services/InventoryManagementService'
import { showToast } from 'src/utils'
// import { useGetVendorsQuery } from 'src/services/VendorServices'
// import { useGetWareHousesQuery } from 'src/services/WareHouseService'
// import { useGetAllItemsQuery } from 'src/services/ItemService'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import { setSelectedItems } from 'src/redux/slices/InventoryManagementSlice'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
// import { setAllItems } from 'src/redux/slices/vendorSlice'
// import { setAllItems as setAllWareHouse } from 'src/redux/slices/warehouseSlice'
// import { setAllItems as setAllItem } from 'src/redux/slices/itemSlice'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    dummy1: string
    dummy2: string
    dummy3: string
    dummy4: boolean
    dummy: {
        id: string
        itemId: string
        rate: number
        quantity: number
        estReceivingDate: string
    }
}

const EditInventoryManagementWrapper = (props: Props) => {
    const params = useParams()
    const Id = params.id

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [UpdateInventoryManagement] = useUpdateInventoryManagementMutation()

    const {
        data: imData,
        isLoading: imIsLoading,
        isFetching: imIsFetching,
    }: any = useGetByIdInventoryManagementQuery(Id)

    const { selectedItems }: any = useSelector(
        (state: RootState) => state?.inventoryManagement
    )

    useEffect(() => {
        if (!imIsFetching && !imIsLoading) {
            dispatch(setSelectedItems(imData?.data || []))
        }
    }, [imData, imIsLoading, imIsFetching])

    const initialValues: FormInitialValues = {
        dummy1: selectedItems?.dummy1 || 'dummy ',
        dummy2: selectedItems?.dummy2 || '',
        dummy3: selectedItems?.dummy3 || '',
        dummy4: selectedItems?.dummy4 || true,
        // purchaseOrder: selectedItems?.purchaseOrder || {},
        dummy:
            {
                id: selectedItems?.dummy?._id,
                itemId: selectedItems?.dummy?.itemId,
                rate: selectedItems?.dummy?.rate,
                quantity: selectedItems?.dummy?.quantity,
                estReceivingDate: selectedItems?.dummy?.estReceivingDate,
            } || {},
    }

    // const {
    //     data: vendorData,
    //     isLoading: vendorIsLoading,
    //     isFetching: VendorIsFetching,
    // } = useGetVendorsQuery(userData?.companyId)
    // const { allItems }: any = useSelector((state: RootState) => state.vendor)

    // const {
    //     data: warehouseData,
    //     isLoading: warehouseIsLoading,
    //     isFetching: warehouseIsFetching,
    // } = useGetWareHousesQuery(userData?.companyId)

    // const { allItems: warehouseItems }: any = useSelector(
    //     (state: RootState) => state?.warehouse
    // )
    // const {
    //     data: itemsData,
    //     isLoading: itemsIsLoading,
    //     isFetching: itemsIsFetching,
    // } = useGetAllItemsQuery(userData?.companyId)

    // const { allItems: itemsList }: any = useSelector(
    //     (state: RootState) => state.item
    // )

    // const vendorOptions = allItems?.map((ele: any) => {
    //     return {
    //         label: ele.companyName,
    //         value: ele._id,
    //     }
    // })

    // const warehouseOptions = warehouseItems?.map((ele: any) => {
    //     return {
    //         label: ele.wareHouseName,
    //         value: ele._id,
    //     }
    // })

    // const itemOptions = itemsList?.map((ele: any) => {
    //     return {
    //         label: ele.itemName,
    //         value: ele._id,
    //     }
    // })

    // //vendor
    // useEffect(() => {
    //     dispatch(setAllItems(vendorData?.data))
    // }, [vendorData, vendorIsLoading, VendorIsFetching, dispatch])

    // //warehouse
    // useEffect(() => {
    //     dispatch(setAllWareHouse(warehouseData?.data))
    // }, [warehouseData, warehouseIsLoading, warehouseIsFetching, dispatch])

    // useEffect(() => {
    //     dispatch(setAllItem(itemsData?.data))
    // }, [itemsData, dispatch, itemsIsLoading, itemsIsFetching])

    // // Form Validation Schema
    // const validationSchema = object({
    //     poCode: string().required('Purchase order code is required'),
    //     vendorId: string().required('Please select a vendor'),
    //     wareHouseId: string().required('Please select a warehouse'),
    //     purchaseOrder: object({
    //         id: string(),
    //         itemId: string().required('Please select a Item'),
    //         rate: number()
    //             .min(0, 'Rate must be greater than 0')
    //             .required('Please enter rate'),
    //         quantity: number()
    //             .min(0, 'Quantity must be greater than 0')
    //             .required('Please enter quantity'),
    //         estReceivingDate: date().required('Please select date'),
    //     }),
    // })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        let iid = values?.dummy?.id

        const dummy0: any = {
            id: iid,
            itemId: values?.dummy?.itemId,
            rate: values?.dummy?.rate,
            quantity: values?.dummy?.quantity,
            estReceivingDate: moment(values?.dummy?.estReceivingDate).format(
                'YYYY/MM/D'
            ),
        }

        setTimeout(() => {
            UpdateInventoryManagement({
                body: {
                    dummy1: values?.dummy1,
                    dummy2: values?.dummy2,
                    dummy3: values?.dummy3,
                    dummy4: values?.dummy4,
                    dummy: dummy0,
                    companyId: userData?.companyId || '',
                },
                id: Id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Inventory updated successfully!')
                        navigate('/inventory-management')
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
                //validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <EditInventoryManagement
                            formikProps={formikProps}
                            // vendorOptions={vendorOptions}
                            // warehouseOptions={warehouseOptions}
                            // itemOptions={itemOptions}
                            apiStatus={apiStatus}
                        />
                    )
                }}
            </Formik>
        </SideNavLayout>
    )
}

export default EditInventoryManagementWrapper
