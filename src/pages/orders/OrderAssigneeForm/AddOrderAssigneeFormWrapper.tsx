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
import { object, string } from 'yup'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import AddPurchaseOrder from './AddOrderAssigneeForm'
import { showToast } from 'src/utils'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import {
    useGetDealerOfOrderQuery,
    useAssignOrderToDealerOrWarehouseMutation,
} from 'src/services/OrderService'

// |-- Types --|
type Props = {
    selectedOrder: any
}

export type FormInitialValues = {
    dealerId: string
    wareHouseId: string
}

const AddOrderAssigneeFormWrapper = ({ selectedOrder }: Props) => {
    const navigate = useNavigate()
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [companyWarehouse, setCompanyWarehouse] = useState<any[]>([])
    const [dealer, setDealer] = useState<any>([])
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [assignOrderToDealerOrWarehouse] =
        useAssignOrderToDealerOrWarehouseMutation()
    console.log('selectedOrder', selectedOrder)

    const {
        data: dealerOfOrderData,
        isLoading: isDealerOfOrderDataFetching,
        isFetching: isDealerOfOrderDataLoading,
    } = useGetDealerOfOrderQuery(
        {
            schemeId: selectedOrder?.schemeId,
            pincodeId: selectedOrder?.pincodeId,
        },
        {
            skip: !selectedOrder?.schemeId || !selectedOrder?.pincodeId,
        }
    )

    useEffect(() => {
        if (!isDealerOfOrderDataLoading && !isDealerOfOrderDataFetching) {
            console.log('dealerOfOrderData', dealerOfOrderData)
            // dealerAndCompanyWarehouse,
            setCompanyWarehouse(dealerOfOrderData?.companyWarehouse)
            setDealer(dealerOfOrderData?.dealerData)
        }
    }, [
        dealerOfOrderData,
        isDealerOfOrderDataFetching,
        isDealerOfOrderDataLoading,
    ])

    const dealerOptions = [
        {
            label: '',
            value: '',
        },
    ]
    // const dealerOptions = dealer?.map((ele: any) => {
    //     return {
    //         label: ele?.dealerName,
    //         value: ele?._id,
    //     }
    // })

    const warehouseOptions = companyWarehouse?.map((ele: any) => {
        return {
            label: ele?.wareHouseName,
            value: ele?._id,
        }
    })

    // Form Initial Values
    const initialValues: FormInitialValues = {
        dealerId: '',
        wareHouseId: '',
    }

    // Form Validation Schema
    const validationSchema = object({
        // eslint-disable-next-line no-useless-escape
        dealerId: string().required('Please select a vendor'),
        wareHouseId: string().required('Please select a warehouse'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)

        setTimeout(() => {
            assignOrderToDealerOrWarehouse({
                dealerId: values.dealerId,
                warehouseId: values.wareHouseId,
                orderId: selectedOrder?._id,
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'assign order successfully!')
                        navigate('/orders')
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
