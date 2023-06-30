/// ==============================================
// Filename:OrderListing.tsx
// Type: List Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import ATMTable, {
    columnTypes,
} from 'src/components/UI/atoms/ATMTable/ATMTable'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import { OrderListResponse } from 'src/models'
import { useGetOrderQuery } from 'src/services/OrderService'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'


// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import {
    setRowsPerPage,
    setIsTableLoading,
    setItems,
    setPage,
    setSearchValue,
    setTotalItems,
    setFilterValue,
} from 'src/redux/slices/orderSlice'


const OrderListing = () => {
    // Hooks
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    // States
    const [selectedRows, setSelectedRows] = useState([])
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const orderState: any = useSelector((state: RootState) => state.order)
    const {
        page,
        rowsPerPage,
        searchValue,
        items,
        totalItems,
        isTableLoading,
    } = orderState
    const { data, isLoading, isFetching } = useGetOrderQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['didNo', 'mobileNo'],
        page: page,
        filterBy: [],
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
            field: 'orderNumber',
            headerName: 'Order No',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: OrderListResponse) => (
                <span className="text-primary-main "># {row.orderNumber} </span>
            ),
        },
        {
            field: 'didNo',
            headerName: 'DID No',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: OrderListResponse) => <span> {row.didNo} </span>,
        },

        {
            field: 'mobileNo',
            headerName: 'Mobile No',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: OrderListResponse) => (
                <span> {row.mobileNo} </span>
            ),
        },
        {
            field: 'deliveryCharges',
            headerName: 'Delivery Charges',
            flex: 'flex-[2_2_0%]',
            renderCell: (row: OrderListResponse) => (
                <span className="text-primary-main ">
                    {' '}
                    {row.deliveryCharges}{' '}
                </span>
            ),
        },
        {
            field: 'discount',
            headerName: 'Discount',
            flex: 'flex-[2_2_0%]',
            renderCell: (row: OrderListResponse) => (
                <span className="text-primary-main "> {row.discount} </span>
            ),
        },
        {
            field: 'total',
            headerName: 'Total',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: OrderListResponse) => (
                <span className="text-slate-800"> &#8377; {row.total} </span>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    isView
                    isEdit
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleViewActionButton={() => {
                        navigate(`/orders/view/${currentId}`)
                    }}
                    handleEditActionButton={() => {
                        navigate(`/orders/${currentId}`)
                    }}
                />
            ),
            align: 'end',
        },
    ]

    return (
        <SideNavLayout>
            <div className="px-4 h-[calc(100vh-55px)]  ">
                <div className="flex justify-between items-center h-[45px]">
                    <ATMPageHeading> Order </ATMPageHeading>
                </div>                

                <div className="border flex flex-col h-[calc(100%-75px)] rounded bg-white">
                    {/*Table Header */}
                    <ATMTableHeader
                        searchValue={searchValue}
                        page={page}
                        rowCount={totalItems}
                        rowsPerPage={rowsPerPage}
                        rows={items}
                        onRowsPerPageChange={(newValue) =>
                            dispatch(setRowsPerPage(newValue))
                        }
                        onSearch={(newValue) =>
                            dispatch(setSearchValue(newValue))
                        }
                        isFilter
                        isRefresh
                        onFilterDispatch={() => dispatch(setFilterValue([]))}
                    />

                    {/* Table */}
                    <div className="grow overflow-auto  ">
                        <ATMTable
                            columns={columns}
                            rows={items}
                            // isCheckbox={true}
                            selectedRows={selectedRows}
                            onRowSelect={(selectedRows) =>
                                setSelectedRows(selectedRows)
                            }
                            isLoading={isTableLoading}
                        />
                    </div>

                    <div className="h-[60px] flex items-center justify-end border-t border-slate-300">
                        <ATMPagination
                            page={page}
                            rowCount={totalItems}
                            rows={items}
                            rowsPerPage={rowsPerPage}
                            onPageChange={(newPage) =>
                                dispatch(setPage(newPage))
                            }
                        />
                    </div>
                </div>
            </div>
        </SideNavLayout>
    )
}

export default OrderListing
