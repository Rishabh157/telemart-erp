/// ==============================================
// Filename:AddOrderAssigneeFormWrapper.tsx
// Type: Add Component
// Last Updated: FEB 07, 2024
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'

// |-- External Dependencies --|
import { Formik } from 'formik'
import { object, mixed } from 'yup'
// import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import AddPurchaseOrder from './AddOrderAssigneeForm'
import { showToast } from 'src/utils'

// |-- Redux --|
// import { RootState } from 'src/redux/store'
import {
    useGetDealerOfOrderQuery,
    useAssignOrderToDealerOrWarehouseMutation,
} from 'src/services/OrderService'

// |-- Types --|
type Props = {
    selectedOrder: any
    handleClose: () => void
}

export type FormInitialValues = {
    dealerId: string
    wareHouseId: string
}

const AddOrderAssigneeFormWrapper = ({ selectedOrder, handleClose }: Props) => {
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [companyWarehouse, setCompanyWarehouse] = useState<any[]>([])
    const [dealer, setDealer] = useState<any>([])
    // const { userData } = useSelector((state: RootState) => state?.auth)
    const [assignOrderToDealerOrWarehouse] =
        useAssignOrderToDealerOrWarehouseMutation()

    const {
        data: dealerOfOrderData,
        isLoading: isDealerOfOrderDataFetching,
        isFetching: isDealerOfOrderDataLoading,
    } = useGetDealerOfOrderQuery(
        {
            schemeId: selectedOrder?.schemeId,
            pincodeId: selectedOrder?.pincodeLabel,
        },
        {
            skip: !selectedOrder?.schemeId || !selectedOrder?.pincodeLabel,
        }
    )

    useEffect(() => {
        if (!isDealerOfOrderDataLoading && !isDealerOfOrderDataFetching) {
            setCompanyWarehouse(dealerOfOrderData?.companyWarehouse)
            setDealer(dealerOfOrderData?.dealerData)
        }
    }, [
        dealerOfOrderData,
        isDealerOfOrderDataFetching,
        isDealerOfOrderDataLoading,
    ])

    const dealerOptions = dealer?.map((ele: any) => {
        return {
            label: ele?.dealerName,
            value: ele?.dealerId,
        }
    })
    const warehouseOptions = companyWarehouse?.map((ele: any) => {
        return {
            label: ele?.wareHouseName,
            value: ele?._id,
        }
    })

    // Form Initial Values
    const initialValues: FormInitialValues = {
        dealerId: selectedOrder?.assignDealerId || '',
        wareHouseId: selectedOrder?.assignWarehouseId || '',
    }

    const validationSchema = object({
        dealerId: mixed().test(
            'dealerOrWarehouse',
            'Please select either a vendor or a warehouse',
            function (value) {
                const wareHouseId = this.parent.wareHouseId
                return (value || wareHouseId) && !(value && wareHouseId)
            }
        ),
        wareHouseId: mixed().test(
            'dealerOrWarehouse',
            'Please select either a vendor or a warehouse',
            function (value) {
                const dealerId = this.parent.dealerId
                return (value || dealerId) && !(value && dealerId)
            }
        ),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)

        setTimeout(() => {
            assignOrderToDealerOrWarehouse({
                dealerId: values.dealerId || null,
                warehouseId: values.wareHouseId || null,
                orderId: selectedOrder?._id,
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'assign order successfully!')
                        handleClose()
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
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
        >
            {(formikProps) => {
                return (
                    <AddPurchaseOrder
                        formikProps={formikProps}
                        dealerOptions={dealerOptions}
                        warehouseOptions={warehouseOptions}
                        apiStatus={apiStatus}
                    />
                )
            }}
        </Formik>
    )
}

export default AddOrderAssigneeFormWrapper
