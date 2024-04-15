/* eslint-disable @typescript-eslint/no-unused-vars */
// |-- Built-in Dependencies --|
import { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { Chip, Stack } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
// import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { DealerToDealerListResponseTypes } from 'src/models/DealerToDealer.model'
import {
    useGetDealerToDealerOrderQuery,
    useApprovealDealerToDealerOrderMutation,
    useDeleteDealerToDealerOrderMutation,
} from 'src/services/DealerToDealerOrderService'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import DealerToDealerOrderListing from './DealerToDealerOrderListing'

// |-- Redux --|
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/saleOrderSlice'
import { AppDispatch, RootState } from 'src/redux/store'
// import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

const DealerToDealerOrderListingWrapper = () => {
    const salesOrderState: any = useSelector(
        (state: RootState) => state.saleOrder
    )
    const dispatch = useDispatch<AppDispatch>()
    const { page, rowsPerPage, searchValue, items } = salesOrderState
    const navigate = useNavigate()
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const [deleteDealerToDealerOrder] = useDeleteDealerToDealerOrderMutation()
    const [updateDealerToDealerRequest] =
        useApprovealDealerToDealerOrderMutation()
    const { userData }: any = useSelector((state: RootState) => state.auth)

    const { data, isFetching, isLoading } = useGetDealerToDealerOrderQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['dtdNumber', 'fromDealerLabel', 'toDealerLabel'],
        page: page,
        filterBy: [
            {
                fieldName: 'companyId',
                value: userData?.companyId as string,
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
    }, [isLoading, isFetching, data, dispatch])

    const handleDelete = () => {
        setShowDropdown(false)
        deleteDealerToDealerOrder(currentId).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Sale Order deleted successfully!')
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast(
                    'error',
                    'Something went wrong, Please try again later'
                )
            }
        })
    }

    const handleFirstComplete = (
        _id: string,
        value: boolean,
        message: string
    ) => {
        updateDealerToDealerRequest({
            id: _id,
            status: value,
        }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast(
                        'success',
                        `Distributor Head ${message} is successfully!`
                    )
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', 'Something went wrong')
            }
        })
    }

    // const handleAccComplete = (
    //     _id: string,
    //     value: boolean,
    //     message: string
    // ) => {
    //     const currentDate = new Date().toLocaleDateString('en-GB')
    //     updateSalesOrder({
    //         body: {
    //             accApproved: value,
    //             type: 'ACC',
    //             accApprovedById: userData?.userId,
    //             accApprovedAt: currentDate,
    //             accApprovedActionBy: userData?.userName,
    //         },
    //         id: _id,
    //     }).then((res: any) => {
    //         if ('data' in res) {
    //             if (res?.data?.status) {
    //                 showToast('success', `Account ${message} is successfully!`)
    //             } else {
    //                 showToast('error', res?.data?.message)
    //             }
    //         } else {
    //             showToast('error', 'Something went wrong')
    //         }
    //     })
    // }

    const columns: columnTypes[] = [
        // {
        //     field: 'actions',
        //     headerName: 'Actions',
        //     flex: 'flex-[0.5_0.5_0%]',
        //     renderCell: (row: DealerToDealerListResponseTypes) =>
        //         row?.requestApproved === null && (
        //             <ActionPopup
        //                 // isEdit={isAuthorized(
        //                 //     UserModuleNameTypes.ACTION_SALE_ORDER_EDIT
        //                 // )}
        //                 // isDelete={isAuthorized(
        //                 //     UserModuleNameTypes.ACTION_SALE_ORDER_DELETE
        //                 // )}
        //                 handleEditActionButton={() => {
        //                     navigate(`/dealer-to-dealer/${row?._id}`)
        //                 }}
        //                 handleDeleteActionButton={() => {
        //                     showConfirmationDialog({
        //                         title: 'Delete Dealer To Dealer Oreder',
        //                         text: 'Do you want to delete order?',
        //                         showCancelButton: true,
        //                         next: (res: any) => {
        //                             return res.isConfirmed
        //                                 ? handleDelete()
        //                                 : setShowDropdown(false)
        //                         },
        //                     })
        //                 }}
        //                 handleOnAction={() => {
        //                     setShowDropdown(!showDropdown)
        //                     setCurrentId(row?._id)
        //                 }}
        //             />
        //         ),
        // },
        {
            field: '_id',
            headerName: 'Dealer To Dealer Number',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.SALE_ORDER_LIST_SO_NUMBER,
            renderCell: (row: DealerToDealerListResponseTypes) => (
                <span> {row?._id} </span>
            ),
        },
        {
            field: 'fromDealerLabelLabel',
            headerName: 'From Dealer',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.SALE_ORDER_LIST_DEALER_NAME,
            align: 'center',
            renderCell: (row: DealerToDealerListResponseTypes) => (
                <>
                    {row?.documents?.[0]?.fromDealerLabelLabel ? (
                        <span>
                            {row?.documents?.[0]?.fromDealerLabelLabel || '-'}
                        </span>
                    ) : (
                        '-'
                    )}
                </>
            ),
        },
        {
            field: 'toDealerLabelLabel',
            headerName: 'To Dealer',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.SALE_ORDER_LIST_DEALER_NAME,
            align: 'center',
            renderCell: (row: DealerToDealerListResponseTypes) => (
                <>
                    {row?.documents?.[0]?.toDealerLabelLabel ? (
                        <span>
                            {row?.documents?.[0]?.toDealerLabelLabel || '-'}
                        </span>
                    ) : (
                        '-'
                    )}
                </>
            ),
        },
        {
            field: 'requestCreatedByLabel',
            headerName: 'Request Created By',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.SALE_ORDER_LIST_DH_APPROVED_DATE,
            align: 'center',
            renderCell: (row: DealerToDealerListResponseTypes) => {
                return <span> {row?.requestCreatedByLabel} </span>
            },
        },
        {
            field: 'items',
            headerName: 'Items / Quantity',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.SALE_ORDER_LIST_ITEM_QUANTITY,
            align: 'center',
            renderCell: (row: DealerToDealerListResponseTypes) => {
                return (
                    <div className="w-full">
                        {row?.documents?.map((item, ind) => {
                            return (
                                <div
                                    key={ind}
                                    className="grid grid-cols-3 border border-slate-400 mb-1 rounded text-center"
                                >
                                    <div className="col-span-2 border-r-[1px] border-slate-400 py-1 px-2">
                                        {item?.productDetails?.groupName}
                                    </div>
                                    <div className="col-span-1 py-1 px-2">
                                        {item?.productDetails?.quantity}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )
            },
        },
        {
            field: 'requestApproved',
            headerName: 'First Status',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.SALE_ORDER_LIST_DH_APPROVED_STATUS,
            align: 'center',
            renderCell: (row: DealerToDealerListResponseTypes) => {
                return (
                    <span>
                        {row?.requestApproved
                            ? 'Done'
                            : row?.requestApproved === null
                            ? 'Pending'
                            : 'Rejected'}{' '}
                    </span>
                )
            },
        },
        {
            field: 'requestApprovedByLabel',
            headerName: 'First Approved By',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.SALE_ORDER_LIST_DH_APPROVED_BY,
            align: 'center',
            renderCell: (row: DealerToDealerListResponseTypes) => {
                return <span> {row?.requestApprovedByLabel} </span>
            },
        },
        {
            field: 'Approved',
            headerName: 'Approval',
            flex: 'flex-[1.0_1.0_0%]',
            name: UserModuleNameTypes.SALE_ORDER_LIST_APPROVAL,
            align: 'center',
            renderCell: (row: DealerToDealerListResponseTypes) => {
                return (
                    <div className="z-0">
                        {!row?.requestApproved ? (
                            <Stack direction="row" spacing={1}>
                                {row?.requestApproved === null ? (
                                    <button
                                        id="btn"
                                        className=" overflow-hidden cursor-pointer z-0"
                                        onClick={() => {
                                            showConfirmationDialog({
                                                title: 'DH Approve',
                                                text: 'Do you want to Approve ?',
                                                showCancelButton: true,
                                                showDenyButton: true,
                                                denyButtonText: 'Reject',
                                                next: (res) => {
                                                    if (res.isConfirmed) {
                                                        return handleFirstComplete(
                                                            row?._id,
                                                            res?.isConfirmed,
                                                            'Approval'
                                                        )
                                                    }
                                                    if (res.isDenied) {
                                                        return handleFirstComplete(
                                                            row?._id,
                                                            !res.isDenied,
                                                            'Rejected'
                                                        )
                                                    }
                                                },
                                            })
                                        }}
                                    >
                                        <Chip
                                            label="First Pending"
                                            color="warning"
                                            variant="outlined"
                                            size="small"
                                            clickable={true}
                                        />
                                    </button>
                                ) : (
                                    <button
                                        id="btn"
                                        disabled={true}
                                        className="cursor-pointer"
                                    >
                                        <Chip
                                            label="First Rejected"
                                            color="error"
                                            variant="outlined"
                                            size="small"
                                            clickable={true}
                                        />
                                    </button>
                                )}
                            </Stack>
                        ) : (
                            <button
                                id="btn"
                                disabled={true}
                                className="cursor-pointer"
                            >
                                <Chip
                                    label="First Approved"
                                    color="success"
                                    variant="outlined"
                                    size="small"
                                    clickable={true}
                                />
                            </button>
                        )}
                    </div>
                )
            },
        },
    ]

    return (
        <SideNavLayout>
            <DealerToDealerOrderListing
                columns={columns}
                rows={items}
                setShowDropdown={setShowDropdown}
            />
        </SideNavLayout>
    )
}

export default DealerToDealerOrderListingWrapper
