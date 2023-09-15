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
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import { OrderListResponse, SingleOrderFlowResponse } from 'src/models'
import {
    useGetOrderQuery,
    useGetOrderFlowQuery,
} from 'src/services/OrderService'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import { getAllowedAuthorizedColumns } from 'src/userAccess/getAuthorizedModules'
import { UserModuleNameTypes } from 'src/models/userAccess/UserAccess.model'
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
// import ActionAuthHOC from 'src/ActionAuthHoc'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import { Chrono } from 'react-chrono'

const OrderListing = ({
    tabName,
    orderStatus,
}: {
    tabName: string
    orderStatus: string
}) => {
    // Hooks
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    // States
    const [selectedRows, setSelectedRows] = useState([])
    const [currentId, setCurrentId] = useState<string>('')
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const [isFlowDialogShow, setIsFlowDialogShow] = useState<boolean>(false)
    const [orderFlowList, setOrderFlowList] = useState([])
    const orderState: any = useSelector((state: RootState) => state.order)
    const { checkUserAccess } = useSelector(
        (state: RootState) => state.userAccess
    )
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
        filterBy: [
            {
                fieldName: 'approved',
                value: orderStatus === 'approved' ? true : false,
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

    // Get Order Flow
    const {
        data: orderFlowData,
        isLoading: isOrderFlowLoading,
        isFetching: isOrderFlowFetching,
    } = useGetOrderFlowQuery(currentId, { skip: !currentId })

    function formatDateString(inputDateStr: string) {
        const months = [
            'Jan',
            'Feb',
            'March',
            'Apr',
            'May',
            'June',
            'July',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ]

        const inputDate = new Date(inputDateStr)

        if (isNaN(inputDate as any)) {
            return 'Invalid Date'
        }

        const year = inputDate.getUTCFullYear()
        const month = months[inputDate.getUTCMonth()]
        const day = inputDate.getUTCDate()
        const hours = inputDate.getUTCHours()
        const minutes = inputDate.getUTCMinutes()
        const seconds = inputDate.getUTCSeconds()

        const formattedDate = `${
            day < 10 ? '0' : ''
        }${day} ${month} ${year} : ${hours < 10 ? '0' : ''}${hours}-${
            minutes < 10 ? '0' : ''
        }${minutes}-${seconds < 10 ? '0' : ''}${seconds}`

        return formattedDate
    }

    useEffect(() => {
        if (!isOrderFlowFetching && !isOrderFlowLoading) {
            const filterdOrderFlow = orderFlowData?.data?.map(
                (ele: SingleOrderFlowResponse) => {
                    return {
                        title: formatDateString(ele.createdAt),
                        cardTitle: 'Dunkirk',
                        // url: 'http://www.history.com',
                        cardSubtitle: ' ',
                        cardDetailedText: ' ',
                        // media: {
                        //     type: 'IMAGE',
                        //     source: {
                        //         url: '',
                        //     },
                        // },
                    }
                }
            )
            setOrderFlowList(filterdOrderFlow)
            // console.log('items to show', filterdOrderFlow)
        }
    }, [isOrderFlowLoading, isOrderFlowFetching, orderFlowData])

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
                    moduleName={UserModuleNameTypes.order}
                    isView
                    // isEdit
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleViewActionButton={() => {
                        navigate(`view/${currentId}`)
                    }}
                    children={
                        <button
                            onClick={() => {
                                setIsFlowDialogShow(true)
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            Flow
                        </button>
                    }
                    // handleEditActionButton={() => {
                    //     navigate(`${currentId}`)
                    // }}
                />
            ),
            align: 'end',
        },
    ]

    return (
        <div className="px-4 h-[calc(100vh-150px)]  ">
            <div className="flex justify-between items-center h-[45px]">
                <ATMPageHeading> Order </ATMPageHeading>
            </div>

            <div className="border flex flex-col h-[calc(100%-45px)] rounded bg-white">
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
                    onSearch={(newValue) => dispatch(setSearchValue(newValue))}
                    // isFilter
                    isRefresh
                    onFilterDispatch={() => dispatch(setFilterValue([]))}
                />

                {/* Table */}
                <div className="grow overflow-auto  ">
                    <ATMTable
                        columns={getAllowedAuthorizedColumns(
                            checkUserAccess,
                            columns,
                            UserModuleNameTypes.order,
                            tabName
                        )}
                        rows={items}
                        // isCheckbox={true}
                        selectedRows={selectedRows}
                        onRowSelect={(selectedRows) =>
                            setSelectedRows(selectedRows)
                        }
                        isLoading={isTableLoading}
                    />
                </div>
                <DialogLogBox
                    maxWidth="sm"
                    handleClose={() => setIsFlowDialogShow(false)}
                    isOpen={isFlowDialogShow}
                    component={
                        <div className="py-4 flex justify-center">
                            <Chrono items={orderFlowList} mode="VERTICAL" />
                        </div>
                    }
                />

                <div className="h-[60px] flex items-center justify-end border-t border-slate-300">
                    <ATMPagination
                        page={page}
                        rowCount={totalItems}
                        rows={items}
                        rowsPerPage={rowsPerPage}
                        onPageChange={(newPage) => dispatch(setPage(newPage))}
                    />
                </div>
            </div>
        </div>
    )
}

export default OrderListing
