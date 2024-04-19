// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { SaleOrderListResponse } from 'src/models/SaleOrder.model'
import SaleOrderListing from 'src/pages/saleOrder/list/SaleOrderListing'
import { useGetPaginationSaleOrderQuery } from 'src/services/SalesOrderService'

// |-- Redux --|

import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import { RootState } from 'src/redux/store'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'

// |-- Types --|
type Props = {}

const DealerSaleOrderTabWrapper = (props: Props) => {
    useUnmountCleanup()
    const params = useParams()
    const dealerId: any = params.dealerId

    const [, setShowDropdown] = useState(false)
    const salesOrderState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue } = salesOrderState
    const { items } = useGetCustomListingData<SaleOrderListResponse>({
        useEndPointHook: useGetPaginationSaleOrderQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['soNumber', 'dealerLabel'],
            page: page,
            filterBy: [
                {
                    fieldName: 'dealerId',
                    value: dealerId,
                },
            ],
            dateFilter: {},
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        }),
    })

    const columns: columnTypes[] = [
        {
            field: 'soNumber',
            headerName: 'So Number',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: SaleOrderListResponse) => (
                <span> {row?.soNumber} </span>
            ),
        },
        {
            field: 'dealer',
            headerName: 'Dealer',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: SaleOrderListResponse) => (
                <span> {row?.dealerLabel} </span>
            ),
        },
        {
            field: 'warehouse',
            headerName: 'Warehouse',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: SaleOrderListResponse) => {
                return <span> {row?.warehouseLabel} </span>
            },
        },
    ]

    return (
        <SaleOrderListing
            columns={columns}
            rows={items}
            setShowDropdown={setShowDropdown}
        />
    )
}

export default DealerSaleOrderTabWrapper
