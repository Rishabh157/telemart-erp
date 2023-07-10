/// ==============================================
// Filename:AddInventoryManagementWrapper.tsx
// Type: Add Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
//import { array, date, number, object, string } from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

// |-- Internal Dependencies --|
import AddInventoryManagement from './AddInventoryManagement'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { useAddInventoryManagementMutation } from 'src/services/InventoryManagementService'
import { showToast } from 'src/utils'
//import { useGetVendorsQuery } from 'src/services/VendorServices'
//import { useGetWareHousesQuery } from 'src/services/WareHouseService'
//import { useGetAllItemsQuery } from 'src/services/ItemService'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
//import { setAllItems } from 'src/redux/slices/vendorSlice'
//import { setAllItems as setAllWareHouse } from 'src/redux/slices/warehouseSlice'
//import { setAllItems as setAllItem } from 'src/redux/slices/itemSlice'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
type Props = {}

export type FormInitialValues = {
    dummy1: string
    dummy2: string
    dummy3: string
    dummy4: boolean
    dummy: {
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

const AddInventoryManagementWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [addInventoryManagement] = useAddInventoryManagementMutation()
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
    // //itemOption

    // Form Initial Values
    const initialValues: FormInitialValues = {
        dummy1: '',
        dummy2: '',
        dummy3: '',
        dummy4: true,
        dummy: [
            {
                itemId: '',
                rate: 0,
                quantity: 0,
                estReceivingDate: '',
            },
        ],
    }

    // Form Validation Schema
    // const validationSchema = object({
    //     poCode: string().required('Purchase order code is required'),
    //     vendorId: string().required('Please select a vendor'),
    //     wareHouseId: string().required('Please select a warehouse'),
    //     purchaseOrder: array().of(
    //         object().shape({
    //             itemId: string().required('Please select a Item'),
    //             rate: number()
    //                 .min(1, 'Rate must be greater than 0')
    //                 .required('Please enter rate'),
    //             quantity: number()
    //                 .min(1, 'Quantity must be greater than 0')
    //                 .required('Please enter quantity'),
    //             estReceivingDate: date()
    //                 .typeError('Invalid Date')
    //                 .required('Please select date'),
    //         })
    //     ),
    // })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        dispatch(setFieldCustomized(false))
        const dummy0 = values.dummy.map((ele: any) => {
            return {
                ...ele,
                estReceivingDate: moment(ele.estReceivingDate).format(
                    'YYYY/MM/D'
                ),
            }
        })

        setTimeout(() => {
					addInventoryManagement({
                dummy1: values.dummy1,
                dummy2: values.dummy2,
                dummy3: values.dummy3,
                dummy4: values.dummy4,
                dummy: dummy0,
                companyId: userData?.companyId || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast(
                            'success',
                            'Inventory added successfully!'
                        )
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

    // const dropdownOptions : DropdownOptions = {
    //   vendorOptions,
    //   warehouseOptions,
    //   itemOptions,
    // }

    return (
        <SideNavLayout>
            <Formik
                initialValues={initialValues}
                //validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <AddInventoryManagement
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
export default AddInventoryManagementWrapper
