/// ==============================================
// Filename:VendorPurchaseOrderTabWrapper.tsx
// Type: View-Tab Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'

// |-- External Dependencies --|
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { PurchaseOrderListResponse } from 'src/models/PurchaseOrder.model'
import PurchaseOrderListing from './PurchaseOrderListing'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import { useGetPurchaseOrderQuery } from 'src/services/PurchaseOrderService'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/PurchaseOrderSlice'

// |-- Types --|
type Props = {}

const VendorPurchaseOrderTabWrapper = (props: Props) => {
    const params = useParams()
    const vendorId: any = params.vendorId
    const dispatch = useDispatch<AppDispatch>()

    const productOrderState: any = useSelector(
        (state: RootState) => state.purchaseOrder
    )
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [showDropdown, setShowDropdown] = useState(false)

    const { page, rowsPerPage, searchValue, items } = productOrderState
    const { userData } = useSelector((state: RootState) => state?.auth)

    const { data, isLoading, isFetching } = useGetPurchaseOrderQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['poCode', 'wareHouseId'],
        page: page,
        filterBy: [
            {
                fieldName: 'companyId',
                value: userData?.companyId as string,
            },
            {
                fieldName: 'vendorId',
                value: vendorId as string,
            },
        ],
        dateFilter: {},
        orderBy: 'createdAt',
        orderByValue: -1,
        isPaginationRequired: true,
    })

    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setIsTableLoading(false))
            dispatch(setItems(data?.data || []))
            dispatch(setTotalItems(data?.totalItem || 4))
        } else {
            dispatch(setIsTableLoading(true))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching, data, dispatch])

    const columns: columnTypes[] = [
        {
            field: 'poCode',
            headerName: 'PO Code',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: PurchaseOrderListResponse) => (
                <span> {row.poCode} </span>
            ),
        },
        {
            field: 'itemName',
            headerName: 'Item Name',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: PurchaseOrderListResponse) => {
                return <span> {row.purchaseOrder.itemName} </span>
            },
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: PurchaseOrderListResponse) => {
                return <span> {row.purchaseOrder.quantity} </span>
            },
        },
        {
            field: 'rate',
            headerName: 'rate',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: PurchaseOrderListResponse) => {
                return <span> {row.purchaseOrder.rate} </span>
            },
        },
        {
            field: 'vendor',
            headerName: 'Vendor',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: PurchaseOrderListResponse) => {
                return <span> {row.vendorLabel} </span>
            },
        },
        {
            field: 'Ware House',
            headerName: 'warer house',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: PurchaseOrderListResponse) => {
                return <span> {row.warehouseLabel} </span>
            },
        },
        {
            field: 'estimateDeliveryDate',
            headerName: 'Est. Delivery Date',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: PurchaseOrderListResponse) => {
                return <span> {row.purchaseOrder.estReceivingDate} </span>
            },
        }
    ]

    return (
        <div className="px-2 h-full shadow rounded border ">
            <PurchaseOrderListing
                columns={columns}
                rows={items}
                setShowDropdown={setShowDropdown}
            />
        </div>
    )
}

export default VendorPurchaseOrderTabWrapper
