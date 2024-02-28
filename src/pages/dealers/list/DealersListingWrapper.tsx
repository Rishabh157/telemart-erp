/// ==============================================
// Filename:DealerListingWrapper.tsx
// Type: List Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { DealersListResponse } from 'src/models/Dealer.model'
import DealersListing from './DealersListing'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'
import {
    useDeleteDealerMutation,
    useGetDealersQuery,
    useApproveDealerStatusMutation,
    useChangeDealerStatusMutation,
} from 'src/services/DealerServices'

import ActionPopup from 'src/components/utilsComponent/ActionPopup'

// |-- Redux --|
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/dealerSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { Chip } from '@mui/material'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

const DealersListingWrapper = () => {
    const dealerState: any = useSelector((state: RootState) => state.dealer)
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)

    const navigate = useNavigate()
    const [deletedealer] = useDeleteDealerMutation()
    const [approveDealer] = useApproveDealerStatusMutation()
    const [changeStatusActiveDeactive] = useChangeDealerStatusMutation()

    const { page, rowsPerPage, items, searchValue } = dealerState
    const dispatch = useDispatch<AppDispatch>()

    const handleDeactive = (rowId: string) => {
        setShowDropdown(false)
        changeStatusActiveDeactive(rowId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Status changed successfully!')
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

    const handleApproval = (rowId: string) => {
        setShowDropdown(false)
        approveDealer(rowId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Approvaled successfully!')
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

    // const navigate = useNavigate();
    const columns: columnTypes[] = [
        {
            field: 'dealerCode',
            headerName: 'Dealer Code',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.DEALER_LIST_VENDOR_CODE,
            renderCell: (row: DealersListResponse) => (
                <span> {row.dealerCode} </span>
            ),
        },
        {
            field: 'firmName',
            headerName: 'Firm Name',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.DEALER_LIST_FIRM_NAME,
            renderCell: (row: DealersListResponse) => {
                return <span> {row.firmName} </span>
            },
        },
        {
            field: 'firstName',
            headerName: 'First Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.DEALER_LIST_FIRST_NAME,
            renderCell: (row: DealersListResponse) => (
                <span> {row.firstName} </span>
            ),
        },
        {
            field: 'lastName',
            headerName: 'Last Name',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.DEALER_LIST_LAST_NAME,
            renderCell: (row: DealersListResponse) => {
                return <span> {row.lastName} </span>
            },
        },
        {
            field: 'billingAddress',
            headerName: 'Phone',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.DEALER_LIST_PHONE,
            renderCell: (row: any) => {
                return <span> {row.billingAddress.phone} </span>
            },
        },
        {
            field: 'billingAddressDistrictName',
            headerName: 'District',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.DEALER_LIST_DISTRICT,
            renderCell: (row: DealersListResponse) => {
                return <span> {row.billingAddressDistrictName} </span>
            },
        },
        {
            field: 'billingAddressStateName',
            headerName: 'State',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.DEALER_LIST_STATE,
            renderCell: (row: DealersListResponse) => {
                return <span> {row.billingAddressStateName} </span>
            },
        },
        {
            field: 'isApproved',
            headerName: 'Approval',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.DEALER_LIST_APPROVAL,
            renderCell: (row: any) => {
                return (
                    <span className="block w-full text-left px-2 py-1 cursor-pointer">
                        {row.isApproved ? (
                            <Chip
                                // onClick={() => {
                                //     showConfirmationDialog({
                                //         title: 'Disapproved',
                                //         text: `Do you want to ${
                                //             row.isApproved
                                //                 ? 'Disapprove this dealer'
                                //                 : 'Approve this dealer'
                                //         }`,
                                //         showCancelButton: true,
                                //         next: (res) => {
                                //             return res.isConfirmed
                                //                 ? handleApproval(row?._id)
                                //                 : setShowDropdown(false)
                                //         },
                                //     })
                                // }}
                                className="cursor-pointer"
                                label="Approved"
                                color="success"
                                variant="outlined"
                                size="small"
                            />
                        ) : (
                            <Chip
                                onClick={() => {
                                    showConfirmationDialog({
                                        title: 'Approved',
                                        text: `Do you want to ${
                                            row.isApproved
                                                ? 'Disapprove this dealer'
                                                : 'Approval this dealer'
                                        }`,
                                        showCancelButton: true,
                                        next: (res) => {
                                            return res.isConfirmed
                                                ? handleApproval(row?._id)
                                                : setShowDropdown(false)
                                        },
                                    })
                                }}
                                className="cursor-pointer"
                                label="Disapproved"
                                color="error"
                                variant="outlined"
                                size="small"
                            />
                        )}
                    </span>
                )
            },
        },

        {
            field: 'status',
            headerName: 'Status',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.DEALER_LIST_STATUS,
            renderCell: (row: any) => {
                return (
                    <span className="block w-full text-left px-2 py-1 cursor-pointer">
                        {row.isActive ? (
                            <Chip
                                onClick={() => {
                                    showConfirmationDialog({
                                        title: 'Deactive User',
                                        text: `Do you want to ${
                                            row.isActive ? 'Deactive' : 'Active'
                                        }`,
                                        showCancelButton: true,
                                        next: (res) => {
                                            return res.isConfirmed
                                                ? handleDeactive(row?._id)
                                                : setShowDropdown(false)
                                        },
                                    })
                                }}
                                className="cursor-pointer"
                                label="Active"
                                color="success"
                                variant="outlined"
                                size="small"
                            />
                        ) : (
                            <Chip
                                onClick={() => {
                                    showConfirmationDialog({
                                        title: 'Deactive Scheme',
                                        text: `Do you want to ${
                                            row.isActive ? 'Deactive' : 'Active'
                                        }`,
                                        showCancelButton: true,
                                        next: (res) => {
                                            return res.isConfirmed
                                                ? handleDeactive(row?._id)
                                                : setShowDropdown(false)
                                        },
                                    })
                                }}
                                className="cursor-pointer"
                                label="Deactive"
                                color="error"
                                variant="outlined"
                                size="small"
                            />
                        )}
                    </span>
                )
            },
        },

        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                   
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    isView={isAuthorized(UserModuleNameTypes.ACTION_DEALER_VIEW)}
                    isEdit={isAuthorized(UserModuleNameTypes.ACTION_DEALER_EDIT)}
                    isDelete={isAuthorized(UserModuleNameTypes.ACTION_DEALER_DELETE)}
                    handleViewActionButton={() => {
                        navigate(`${currentId}/general-information`)
                    }}
                    handleEditActionButton={() => {
                        navigate(`/dealers/edit-dealer/${currentId}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete Attribute',
                            text: 'Do you want to delete',
                            showCancelButton: true,
                            next: (res: any) => {
                                return res.isConfirmed
                                    ? handleDelete()
                                    : setShowDropdown(false)
                            },
                        })
                    }}
                />
            ),
            align: 'end',
        },
    ]

    const { data, isFetching, isLoading } = useGetDealersQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['firstName', 'firmName', 'dealerCode'],
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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching, data, dispatch])

    const handleDelete = () => {
        setShowDropdown(false)
        deletedealer(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'dealer deleted successfully!')
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

    return (
        <>
            <SideNavLayout>
                <DealersListing
                    columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </SideNavLayout>
        </>
    )
}

export default DealersListingWrapper
