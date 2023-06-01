import React, { useState, useEffect } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { BiSearchAlt2 } from 'react-icons/bi'
import ATMTable, {
    columnTypes,
} from 'src/components/UI/atoms/ATMTable/ATMTable'
import { renderorderStatus } from 'src/utils/renderOrderStatus'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import ATMInputAdormant from 'src/components/UI/atoms/formFields/ATMInputAdormant/ATMInputAdormant'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import { OrderListResponse } from 'src/models'
import { useGetOrderQuery } from 'src/services/OrderService'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import {
    setIsTableLoading,
    setItems,
    setPage,
    setSearchValue,
    setTotalItems,
} from 'src/redux/slices/orderSlice'

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
        renderCell: (row: OrderListResponse) => <span> {row.mobileNo} </span>,
    },
    {
        field: 'batchNo',
        headerName: 'Batch Assigned',
        flex: 'flex-[1.5_1.5_0%]',
        renderCell: (row: OrderListResponse) => {
            return renderorderStatus(row.batchNo?.length)
        },
    },
    {
        field: 'deliveryCharges',
        headerName: 'Delivery Charges',
        flex: 'flex-[2_2_0%]',
        renderCell: (row: OrderListResponse) => (
            <span className="text-primary-main "> {row.deliveryCharges} </span>
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
        renderCell: (row: OrderListResponse) => (
            <button className="text-slate-600 font-bold  transition-all duration-[600ms] hover:bg-slate-100 p-2 rounded-full">
                {' '}
                <HiDotsHorizontal className="text-xl text-slate-600 font-bold " />{' '}
            </button>
        ),
        align: 'end',
    },
]

const OrderListing = () => {
    // Hooks

    // States
    const [selectedRows, setSelectedRows] = useState([])
    const dispatch = useDispatch<AppDispatch>()

    const orderState: any = useSelector((state: RootState) => state.order)
    const { page, rowsPerPage, searchValue, items, filterValue, totalItems } =
        orderState

    const { data, isLoading, isFetching } = useGetOrderQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['didNo', 'mobileNo'],
        page: page,
        filterBy: [
            {
                fieldName: 'poCode',
                value: filterValue,
            },
        ],
        dateFilter: {},
        orderBy: 'createdAt',
        orderByValue: 1,
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
    return (
        <SideNavLayout>
            <div className="px-4 h-[calc(100vh-55px)] pt-3 ">
                <div className="h-[100px] ">
                    <div className="mb-5 text-2xl text-slate-700 font-bold ">
                        Orders
                    </div>
                    <div className="flex justify-between">
                        <div className="flex gap-2">
                            <ATMInputAdormant
                                name=""
                                value={searchValue}
                                onChange={(newValue) =>
                                    dispatch(
                                        setSearchValue(newValue.target.value)
                                    )
                                }
                                placeholder="Search"
                                adormant={
                                    <BiSearchAlt2 className="text-slate-400" />
                                }
                                adormantProps={{
                                    position: 'end',
                                    extraClasses: 'bg-white border-none',
                                }}
                                className="h-[33px]"
                            />

                            {selectedRows.length ? (
                                <div>
                                    <button className="bg-primary-main text-white p-2 rounded animate-[fade_0.3s_ease-in-out]">
                                        {' '}
                                        Actions{' '}
                                    </button>
                                </div>
                            ) : null}
                        </div>

                        {/* <div>
                            <button
                                type="button"
                                className="flex items-center gap-2 bg-primary-main text-white text-sm h-[33px] px-4 rounded font-bold"
                                onClick={() => {
                                    navigate('add-order')
                                }}
                            >
                                <span className="text-xl"> + </span> Add Orders
                            </button>
                        </div> */}
                    </div>
                </div>

                <ATMTable
                    columns={columns}
                    rows={items}
                    isCheckbox={true}
                    selectedRows={selectedRows}
                    onRowSelect={(selectedRows) =>
                        setSelectedRows(selectedRows)
                    }
                    extraClasses="max-h-[calc(100%-150px)] overflow-auto"
                />

                <div className=" border-t  h-[50px] flex items-end ">
                    <div className="w-full">
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
