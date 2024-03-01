/// ==============================================
// Filename:DealerSaleOrderTabWrapper.tsx
// Type: Tab Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
//import { useNavigate } from "react-router-dom";
//import { showConfirmationDialog } from "src/utils/showConfirmationDialog";
//import { showToast } from "src/utils";

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { SaleOrderListResponse } from 'src/models/SaleOrder.model'
import SaleOrderListing from 'src/pages/saleOrder/list/SaleOrderListing'
import { useGetPaginationSaleOrderQuery } from 'src/services/SalesOrderService'

// |-- Redux --|
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/saleOrderSlice'
import { AppDispatch, RootState } from 'src/redux/store'

// |-- Types --|
type Props = {}

const DealerSaleOrderTabWrapper = (props: Props) => {
    const params = useParams()
    const dealerId: any = params.dealerId
    const dispatch = useDispatch<AppDispatch>()
    // const { page, rowsPerPage, searchValue, items } = salesOrderState;

    //const navigate = useNavigate();
    //const [currentId, setCurrentId] = useState("");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [showDropdown, setShowDropdown] = useState(false)
    //const [deleteSaleOrder] = useDeleteSalesOrderMutation();
    const salesOrderState: any = useSelector(
        (state: RootState) => state.saleOrder
    )
    const { page, rowsPerPage, searchValue, items } = salesOrderState
    // const { data, isFetching, isLoading } =
    //     useGetSalesOrderByDealerIdQuery(dealerId)

    // useEffect(() => {
    //     if (!isFetching && !isLoading) {
    //         dispatch(setIsTableLoading(false))
    //         dispatch(setItems(data?.data || []))
    //         dispatch(setTotalItems(data?.totalItems || 4))
    //     } else {
    //         dispatch(setIsTableLoading(true))
    //     }
    // }, [isLoading, isFetching, data, dispatch])

    const {
        data: soData,
        isFetching: soIsFetching,
        isLoading: soIsLoading,
    } = useGetPaginationSaleOrderQuery({
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
    })
    useEffect(() => {
        if (!soIsFetching && !soIsLoading) {
            dispatch(setIsTableLoading(false))
            dispatch(setItems(soData?.data || []))
            dispatch(setTotalItems(soData?.totalItem || 4))
        } else {
            dispatch(setIsTableLoading(true))
        }
    }, [soIsLoading, soIsFetching, soData, dispatch])

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
