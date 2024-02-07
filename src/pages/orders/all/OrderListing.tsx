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
import { OrderListResponse } from 'src/models'
import {
    useGetOrderQuery,
    useGetOrderFlowQuery,
    useDispatchedOrderBarcodeMutation,
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
// import AuthenticationHOC from 'src/AuthenticationHOC'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'

// Dispatching imports
import { showToast } from 'src/utils'
import { IoRemoveCircle } from 'react-icons/io5'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import { useGetAllBarcodeOfDealerOutWardDispatchMutation } from 'src/services/BarcodeService'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { AlertText } from 'src/pages/callerpage/components/constants'
import AddOrderAssigneeFormWrapper from '../OrderAssigneeForm/AddOrderAssigneeFormWrapper'

// Types
type BarcodeListResponseType = {
    _id: string
    productGroupId: string
    barcodeNumber: string
    barcodeGroupNumber: string
    lotNumber: string
    isUsed: boolean
    wareHouseId: string
    dealerId: string | null
    status: string
    companyId: string
    isDeleted: boolean
    isActive: boolean
    __v: number
    createdAt: string
    updatedAt: string
}


const OrderListing = ({
    tabName,
    orderStatus,
    currentStatus,
}: {
    tabName: string
    orderStatus: string
    currentStatus: string
}) => {
    // Hooks
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    // Dispatching State
    const [isShow, setIsShow] = useState<boolean>(false)
    const [barcodeNumber, setBarcodeNumber] = useState<any>([])
    const [barcodeQuantity, setBarcodeQuantity] = useState<number>(0)
    const [barcodeList, setBarcodeList] = useState<any>([])
    const [selectedItemsTobeDispatch, setSelectedItemsTobeDispatch] =
        useState<OrderListResponse | null>(null)
    const { customized, userData } = useSelector(
        (state: RootState) => state?.auth
    )

    // States
    const [selectedRows, setSelectedRows] = useState([])
    const [currentId, setCurrentId] = useState<string>('')
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    // const [isFlowDialogShow, setIsFlowDialogShow] = useState<boolean>(false)
    const [selectedOrder, setSelectedOrder] = useState<any>(null)
    const [isOrderAssigneeFormOpen, setIsOrderAssigneeFormOpen] =
        useState<boolean>(false)
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
            {
                fieldName: 'status',
                value: currentStatus,
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

    useEffect(() => {
        if (!isOrderFlowFetching && !isOrderFlowLoading) {
            return orderFlowData
        }
    }, [isOrderFlowLoading, isOrderFlowFetching, orderFlowData])

    const columns: columnTypes[] = [
        {
            field: 'orderNumber',
            headerName: 'Order No',
            flex: 'flex-[0.6_0.6_0%]',
            renderCell: (row: OrderListResponse) => (
                <span className="text-primary-main "># {row.orderNumber} </span>
            ),
        },
        {
            field: 'didNo',
            headerName: 'DID No',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            renderCell: (row: OrderListResponse) => <span> {row.didNo} </span>,
        },
        {
            field: 'schemeName',
            headerName: 'Scheme Name',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            renderCell: (row: OrderListResponse) => (
                <span> {row?.schemeName} </span>
            ),
        },
        {
            field: 'shcemeQuantity',
            headerName: 'Quantity',
            flex: 'flex-[0.5_0.5_0%]',
            align: 'center',
            renderCell: (row: OrderListResponse) => (
                <span> {row?.shcemeQuantity} </span>
            ),
        },
        {
            field: 'gender',
            headerName: 'Gender',
            flex: 'flex-[0.6_0.6_0%]',
            align: 'center',
            renderCell: (row: OrderListResponse) => (
                <span> {row?.gender} </span>
            ),
        },
        {
            field: 'price',
            headerName: 'Price',
            flex: 'flex-[0.7_0.7_0%]',
            align: 'center',
            renderCell: (row: OrderListResponse) => <span> {row?.price} </span>,
        },
        {
            field: 'mobileNo',
            headerName: 'Mobile No',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            renderCell: (row: OrderListResponse) => (
                <span> {row.mobileNo} </span>
            ),
        },
        {
            field: 'deliveryCharges',
            headerName: 'Delivery Charges',
            flex: 'flex-[0.6_0.6_0%]',
            align: 'center',
            renderCell: (row: OrderListResponse) => (
                <span className="text-primary-main ">
                    &#8377; {row.deliveryCharges}
                </span>
            ),
        },
        {
            field: 'discount',
            headerName: 'Discount',
            flex: 'flex-[0.6_0.6_0%]',
            align: 'center',
            // renderCell: (row: OrderListResponse) => (
            //     <span className="text-primary-main "> {row?.dis} </span>
            // ),
        },
        {
            field: 'total',
            headerName: 'Total',
            flex: 'flex-[0.6_0.6_0%]',
            renderCell: (row: OrderListResponse) => (
                <span className="text-slate-800">
                    &#8377; {row?.totalAmount}
                </span>
            ),
        },
        {
            field: 'orderStatus',
            headerName: 'Status',
            flex: 'flex-[0.6_0.6_0%]',
            renderCell: (row: OrderListResponse) => (
                <span className="text-slate-800">{row?.orderStatus}</span>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: OrderListResponse) => (
                <ActionPopup
                    moduleName={UserModuleNameTypes.order}
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    children={
                        <>
                            {/* <button
                                onClick={() => {
                                    setIsFlowDialogShow(true)
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Flow
                            </button> */}
                            {/* <button
                                onClick={() => {
                                    // navigate(`view/${row?._id}`)
                                    navigate(`/orders/view/${row?._id}`)
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                View
                            </button> */}
                            <button
                                onClick={() => {
                                    setIsOrderAssigneeFormOpen(true)
                                    setSelectedOrder(row)
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Order Assignee
                            </button>
                            <button
                                onClick={() => {
                                    setIsShow(true)
                                    setBarcodeQuantity(row?.shcemeQuantity)
                                    setSelectedItemsTobeDispatch(row)
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Dispatch
                            </button>
                        </>
                    }
                />
            ),
            align: 'end',
        },
        // {
        //     field: 'actions',
        //     headerName: 'Actions',
        //     flex: 'flex-[0.5_0.5_0%]',
        //     renderCell: (row: OrderListResponse) =>
        //         row?.orderStatus !== 'NOT_DISPATCHED' ? (
        //             ''
        //         ) : (
        //             <ActionPopup
        //                 moduleName={UserModuleNameTypes.order}
        //                 handleOnAction={() => {
        //                     setShowDropdown(!showDropdown)
        //                     setCurrentId(row?._id)
        //                 }}
        //                 children={
        //                     <>
        //                         <button
        //                             onClick={() => {
        //                                 setIsFlowDialogShow(true)
        //                             }}
        //                             className="w-full text-left px-4 py-2 hover:bg-gray-100 hidden"
        //                         >
        //                             Flow
        //                         </button>
        //                         <button
        //                             onClick={() => {
        //                                 setIsFlowDialogShow(true)
        //                             }}
        //                             className="w-full text-left px-4 py-2 hover:bg-gray-100 hidden"
        //                         >
        //                             Order Assignee
        //                         </button>
        //                         <button
        //                             onClick={() => {
        //                                 setIsShow(true)
        //                                 setBarcodeQuantity(row?.shcemeQuantity)
        //                                 setSelectedItemsTobeDispatch(row)
        //                             }}
        //                             className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        //                         >
        //                             Dispatch
        //                         </button>
        //                     </>
        //                 }
        //             />
        //         ),
        //     align: 'end',
        // },
    ]

    // Dispatching Methods
    const [getBarCode] = useGetAllBarcodeOfDealerOutWardDispatchMutation()
    const [barcodeDispatch, barcodeDispatchInfo] =
        useDispatchedOrderBarcodeMutation<any>()

    const handleReload = () => {
        if (customized) {
            const confirmValue: boolean = window.confirm(AlertText)
            if (confirmValue) {
                dispatch(setFieldCustomized(false))
                setIsShow(!isShow)
                setSelectedItemsTobeDispatch(null)
            }
        } else {
            setIsShow(!isShow)
            setSelectedItemsTobeDispatch(null)
        }
    }

    // remove barcode
    const handleRemoveBarcode = (barcodeNumber: string) => {
        // eslint-disable-next-line array-callback-return
        const filteredObj = barcodeList?.filter((item: any) => {
            if (item?.barcodeNumber !== barcodeNumber) {
                return item
            }
        })
        setBarcodeList(filteredObj)
    }

    // barcode calling api
    const handleBarcodeSubmit = (
        barcodeNumber: string,
        productGroupId: string
    ) => {
        dispatch(setFieldCustomized(true))
        getBarCode({
            id: barcodeNumber,
            groupId: productGroupId,
            status: 'AT_WAREHOUSE',
            companyId: userData?.companyId as string,
        })
            .then((res: any) => {
                if (res?.data?.status) {
                    if (res?.data?.data) {
                        let newBarcode = [...barcodeList]
                        if (!newBarcode.length) {
                            newBarcode = [...res?.data?.data]
                        } else {
                            newBarcode = [...newBarcode, ...res?.data?.data]
                            const uniqueArray = Array.from(
                                new Set(newBarcode?.map((obj: any) => obj._id))
                            ).map((id) =>
                                newBarcode?.find((obj: any) => obj._id === id)
                            )
                            newBarcode = [...uniqueArray]
                        }
                        setBarcodeList([...newBarcode])
                    }
                }
            })
            .catch((err) => console.error(err))
    }

    // Dispatching order
    const handleDispatchBarcode = () => {
        const filterValue = barcodeList?.flat(1)?.map((ele: any) => {
            if (!ele) return ele

            const {
                wareHouseLabel,
                productGroupLabel,
                cartonBoxId,
                outerBoxbarCodeNumber,
                vendorId,
                createdAt,
                isActive,
                isDeleted,
                updatedAt,
                status,
                __v,
                ...rest
            } = ele
            return {
                ...rest,
                // vendorId: selectedItemsTobeDispatch?.documents[0]?.vendorId,
            }
        })

        barcodeDispatch({
            barcodedata: [...filterValue],
            orderId: selectedItemsTobeDispatch?._id,
        })
            .then((res: any) => {
                if (res?.data?.status) {
                    showToast('success', 'dispatched successfully')
                    setIsShow(false)
                    dispatch(setFieldCustomized(false))
                } else {
                    showToast('error', res?.data?.message)
                }
            })
            .catch((err: any) => {
                console.error(err)
            })
    }

    const handleDisableDispatchButton = () => {
        return barcodeQuantity === barcodeList?.length
    }

    useEffect(() => {
        navigate('/orders?orderStatus=all')
    }, [navigate])

    return (
        <div className="px-4 h-[calc(100vh-150px)]">
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

                {/* Flow */}
                {/* <DialogLogBox
                    maxWidth="sm"
                    handleClose={() => setIsFlowDialogShow(false)}
                    isOpen={isFlowDialogShow}
                    component={<div className="py-4 flex justify-center"></div>}
                /> */}

                <DialogLogBox
                    maxWidth="md"
                    handleClose={() => {
                        setIsOrderAssigneeFormOpen(false)
                        setSelectedOrder(null)
                    }}
                    isOpen={isOrderAssigneeFormOpen}
                    component={<AddOrderAssigneeFormWrapper selectedOrder={selectedOrder} />}
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

            {/* Dispatch Order */}
            <DialogLogBox
                isOpen={isShow}
                fullScreen={true}
                buttonClass="cursor-pointer"
                maxWidth="lg"
                handleClose={() => {
                    handleReload()
                }}
                component={
                    <div className="px-4 pt-2 pb-6">
                        {/* SO NO. & DEALER NAME */}
                        <div className="grid grid-cols-4 border-b-[1px] pb-2 border-black">
                            <div>
                                <div className="flex gap-1 items-center">
                                    <div className="font-bold">
                                        Order Number
                                    </div>
                                    {':'}
                                    <div className="text-primary-main">
                                        {selectedItemsTobeDispatch?.orderNumber}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex gap-1 items-center">
                                    <div className="font-bold">DID No.</div>
                                    {':'}
                                    <div>
                                        {selectedItemsTobeDispatch?.didNo}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pb-6 border-b-[1px] border-black last:border-none">
                            <div className="grid grid-cols-4 mt-2">
                                <div>
                                    <div>
                                        <span className="font-bold">
                                            Scheme Name
                                        </span>
                                        <span className="px-4">:</span>
                                        <span>
                                            {
                                                selectedItemsTobeDispatch?.schemeLabel
                                            }
                                        </span>
                                    </div>

                                    <div>
                                        <span className="font-bold">
                                            Scheme Quantity
                                        </span>
                                        <span className="pl-[2.23rem] pr-[1rem]">
                                            :
                                        </span>
                                        <span>
                                            {
                                                selectedItemsTobeDispatch?.shcemeQuantity
                                            }
                                            {barcodeList?.length ? (
                                                <> / </>
                                            ) : (
                                                ''
                                            )}
                                            {barcodeList?.length
                                                ? barcodeList?.length
                                                : ''}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 grid grid-cols-12 gap-x-4">
                                <div className="col-span-3">
                                    <ATMTextField
                                        disabled={
                                            barcodeList?.length ===
                                            selectedItemsTobeDispatch?.shcemeQuantity
                                        }
                                        name=""
                                        value={barcodeNumber}
                                        label="Barcode Number"
                                        placeholder="enter barcode number"
                                        className="shadow bg-white rounded w-[50%] "
                                        onChange={(e) => {
                                            if (e.target.value?.length > 6) {
                                                handleBarcodeSubmit(
                                                    e.target.value,
                                                    selectedItemsTobeDispatch?.productGroupId ||
                                                        ''
                                                )
                                            }
                                            setBarcodeNumber(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-x-4">
                                {barcodeList?.map(
                                    (
                                        barcode: BarcodeListResponseType,
                                        barcodeIndex: number
                                    ) => {
                                        return (
                                            <div
                                                key={barcodeIndex}
                                                onClick={() => {
                                                    // onBarcodeClick(barcode)
                                                }}
                                                className={`flex flex-col gap-2 my-4 shadow rounded-lg border-[1.5px] relative p-2 cursor-pointer`}
                                            >
                                                <div className="flex justify-between">
                                                    <div>
                                                        <div className="text-[12px] text-slate-500">
                                                            Barcode No.
                                                        </div>
                                                        <div>
                                                            {
                                                                barcode?.barcodeNumber
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="absolute -top-2 -right-2">
                                                        <IoRemoveCircle
                                                            onClick={() => {
                                                                handleRemoveBarcode(
                                                                    barcode?.barcodeNumber
                                                                )
                                                            }}
                                                            fill="red"
                                                            size={20}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="text-primary-main font-medium grow flex items-end">
                                                    {/* {barcode?.productGroupLabel} */}
                                                </div>
                                            </div>
                                        )
                                    }
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <div className="flex items-end">
                                <ATMLoadingButton
                                    disabled={!handleDisableDispatchButton()}
                                    isLoading={barcodeDispatchInfo?.isLoading}
                                    loadingText="Dispatching"
                                    onClick={() => handleDispatchBarcode()}
                                    className="bg-primary-main text-white flex items-center py-1 px-4 rounded"
                                >
                                    Dispatch
                                </ATMLoadingButton>
                            </div>
                        </div>
                    </div>
                }
            />
        </div>
    )
}

export default OrderListing
