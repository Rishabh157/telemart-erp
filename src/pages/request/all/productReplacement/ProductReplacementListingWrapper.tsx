/* eslint-disable @typescript-eslint/no-unused-vars */
/// ==============================================
// Filename:MoneybackListingWrapper.tsx
// Type: List Component
// Last Updated: March 14, 2024
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { Chip, Stack } from '@mui/material'
import { MoneybackListResponse } from 'src/models/Moneyback.model'

// |-- Redux --|
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/ProductReplacementSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import {
    useGetProductReplacementOrderQuery,
    useProductReplacementMangerFirstApprovalMutation,
    useAddProductReplacementAccountApprovalMutation,
} from 'src/services/ProductReplacementServices'
import { showToast } from 'src/utils'
import ProductReplacementListing from './ProductReplacementListing'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import Swal from 'sweetalert2'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import AddProductReplacementCustomerInfoFormWrapper from './AddCustomerInfoForm/AddProductReplacementCustomerInfoFormWrapper'

const ProductReplacementListingWrapper = () => {
    // Hooks
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    // Dispatching State

    const [currentId, setCurrentId] = useState<string>()
    const [customerMobNumber, setCustomerMobNumber] = useState<string>()
    const [isShowCustomerInfoForm, setIsShowCustomerInfoForm] =
        useState<boolean>(false)

    const [showDropdown, setShowDropdown] = useState<boolean>(false)

    const productReplacementState: any = useSelector(
        (state: RootState) => state.productReplacement
    )

    const [managerLevelApproval] =
        useProductReplacementMangerFirstApprovalMutation()
    const [accountApproval] = useAddProductReplacementAccountApprovalMutation()

    const {
        page,
        rowsPerPage,
        searchValue,
        items,
        // totalItems,
        // isTableLoading,
    } = productReplacementState

    const { data, isFetching, isLoading } = useGetProductReplacementOrderQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['complaintNumber'],
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
    }, [isLoading, isFetching, data, dispatch])

    // Manager First Level Approval
    const handleManagerFirstLevelApprovalComplete = (
        _id: string,
        level: 'FIRST' | 'SECOND',
        approve: boolean,
        remark: string
    ) => {
        managerLevelApproval({
            id: _id,
            level,
            approve,
            remark,
        }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast(
                        'success',
                        `First Level Approved is successfully!`
                    )
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', 'Something went wrong')
            }
        })
    }

    // Account Approval
    const handleAccountApproval = (
        _id: string,
        approve: boolean,
        remark: string
    ) => {
        accountApproval({
            id: _id,
            accountApproval: approve,
            accountRemark: remark,
        }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast(
                        'success',
                        `Account Level Approved is successfully!`
                    )
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', 'Something went wrong')
            }
        })
    }

    const columns: columnTypes[] = [
        {
            field: 'orderNumber',
            headerName: 'Order No.',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: MoneybackListResponse) => (
                <span className="text-primary-main "># {row.orderNumber}</span>
            ),
        },
        {
            field: 'complaintNumber',
            headerName: 'Complain No.',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            // renderCell: (row: MoneybackListResponse) => <span></span>,
        },
        {
            field: 'schemeLabel',
            headerName: 'Scheme Name',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: MoneybackListResponse) => (
                <span>{row?.schemeLabel || '-'}</span>
            ),
        },
        {
            field: 'schemePrice',
            headerName: 'Scheme Price',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: MoneybackListResponse) => (
                <span>{row?.schemePrice || '-'}</span>
            ),
        },
        {
            field: 'customerName',
            headerName: 'Customer Name',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: MoneybackListResponse) => (
                <span>{row?.customerName}</span>
            ),
        },
        {
            field: 'Approved',
            headerName: 'Manager Approval',
            flex: 'flex-[1.0_1.0_0%]',
            align: 'center',
            renderCell: (row: MoneybackListResponse) => {
                return (
                    <div className="z-0">
                        {!row?.managerFirstApproval ? (
                            <Stack direction="row" spacing={1}>
                                {row?.managerFirstApproval === null ? (
                                    <button
                                        id="btn"
                                        className="overflow-hidden cursor-pointer z-0"
                                        onClick={() => {
                                            Swal.fire({
                                                icon: 'warning',
                                                confirmButtonColor: '#3085d6',
                                                cancelButtonColor: '#dc3741',
                                                confirmButtonText: 'Yes',
                                                title: 'First Approval',
                                                text: 'Do you want to Approve ?',
                                                input: 'text', // Add input field
                                                inputPlaceholder:
                                                    'Enter remark', // Placeholder for the input field
                                                showCancelButton: true,

                                                showDenyButton: true,
                                                denyButtonText: 'Reject',
                                                reverseButtons: true,
                                                showLoaderOnConfirm: true,
                                                // Show loader when confirming
                                                preDeny: (res) => {
                                                    Swal.showValidationMessage(
                                                        'Please enter a remark'
                                                    )

                                                    if (
                                                        !Swal.getInput()?.value
                                                    ) {
                                                        return res
                                                    } else {
                                                        return Swal.getInput()
                                                            ?.value
                                                    }
                                                },

                                                preConfirm: (reason: any) => {
                                                    // Handle the confirmation and input value
                                                    if (!reason) {
                                                        Swal.showValidationMessage(
                                                            'Please enter a remark'
                                                        )
                                                    }
                                                },
                                                allowOutsideClick: () =>
                                                    !Swal.isLoading(), // Allow clicking outside when not loading
                                            }).then((res: any) => {
                                                if (res.isConfirmed) {
                                                    return handleManagerFirstLevelApprovalComplete(
                                                        row?._id,
                                                        'FIRST',
                                                        res?.isConfirmed,
                                                        res?.value
                                                    )
                                                }
                                                if (res.isDenied) {
                                                    return handleManagerFirstLevelApprovalComplete(
                                                        row?._id,
                                                        'FIRST',
                                                        res?.isConfirmed,
                                                        res?.value
                                                    )
                                                }
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
                                            clickable={false}
                                        />
                                    </button>
                                )}
                            </Stack>
                        ) : (
                            <Stack direction="row" spacing={1}>
                                {row?.managerSecondApproval === null ? (
                                    <button
                                        id="btn"
                                        className="overflow-hidden cursor-pointer z-0"
                                        onClick={() => {
                                            Swal.fire({
                                                icon: 'warning',
                                                confirmButtonColor: '#3085d6',
                                                cancelButtonColor: '#dc3741',
                                                confirmButtonText: 'Yes',
                                                title: 'Second Approval',
                                                text: 'Do you want to Approve ?',
                                                input: 'text', // Add input field
                                                inputPlaceholder:
                                                    'Enter remark', // Placeholder for the input field
                                                showCancelButton: true,
                                                showDenyButton: true,
                                                denyButtonText: 'Reject',
                                                reverseButtons: true,
                                                showLoaderOnConfirm: true, // Show loader when confirming
                                                // Show loader when confirming
                                                preDeny: (res) => {
                                                    Swal.showValidationMessage(
                                                        'Please enter a remark'
                                                    )

                                                    if (
                                                        !Swal.getInput()?.value
                                                    ) {
                                                        return res
                                                    } else {
                                                        return Swal.getInput()
                                                            ?.value
                                                    }
                                                },
                                                preConfirm: (reason: any) => {
                                                    // Handle the confirmation and input value
                                                    if (!reason) {
                                                        Swal.showValidationMessage(
                                                            'Please enter a remark'
                                                        )
                                                    }
                                                },
                                                allowOutsideClick: () =>
                                                    !Swal.isLoading(), // Allow clicking outside when not loading
                                            }).then((res: any) => {
                                                if (res.isConfirmed) {
                                                    return handleManagerFirstLevelApprovalComplete(
                                                        row?._id,
                                                        'SECOND',
                                                        res?.isConfirmed,
                                                        res?.value
                                                    )
                                                }
                                                if (res.isDenied) {
                                                    return handleManagerFirstLevelApprovalComplete(
                                                        row?._id,
                                                        'SECOND',
                                                        res?.isConfirmed,
                                                        res?.value
                                                    )
                                                }
                                            })
                                        }}
                                    >
                                        <Chip
                                            className="z-0"
                                            label="Second Pending "
                                            color="warning"
                                            variant="outlined"
                                            size="small"
                                            clickable={true}
                                        />
                                    </button>
                                ) : row?.managerSecondApproval ? (
                                    <button
                                        id="btn"
                                        disabled={true}
                                        className="cursor-pointer"
                                    >
                                        <Chip
                                            label="Second Approved"
                                            color="success"
                                            variant="outlined"
                                            size="small"
                                            clickable={false}
                                        />
                                    </button>
                                ) : (
                                    <button
                                        id="btn"
                                        disabled={true}
                                        className="cursor-pointer"
                                        onClick={() => {
                                            Swal.fire({
                                                icon: 'warning',
                                                confirmButtonColor: '#3085d6',
                                                cancelButtonColor: '#dc3741',
                                                confirmButtonText: 'Yes',
                                                title: 'Second Approval',
                                                text: 'Do you want to Approve ?',
                                                input: 'text', // Add input field
                                                inputPlaceholder:
                                                    'Enter remark', // Placeholder for the input field
                                                showCancelButton: true,
                                                showDenyButton: true,
                                                denyButtonText: 'Reject',
                                                reverseButtons: true,
                                                showLoaderOnConfirm: true, // Show loader when confirming
                                                // Show loader when confirming
                                                preDeny: (res) => {
                                                    Swal.showValidationMessage(
                                                        'Please enter a remark'
                                                    )

                                                    if (
                                                        !Swal.getInput()?.value
                                                    ) {
                                                        return res
                                                    } else {
                                                        return Swal.getInput()
                                                            ?.value
                                                    }
                                                },
                                                preConfirm: (reason: any) => {
                                                    // Handle the confirmation and input value
                                                    if (!reason) {
                                                        Swal.showValidationMessage(
                                                            'Please enter a remark'
                                                        )
                                                    }
                                                },
                                                allowOutsideClick: () =>
                                                    !Swal.isLoading(), // Allow clicking outside when not loading
                                            }).then((res: any) => {
                                                if (res.isConfirmed) {
                                                    return handleManagerFirstLevelApprovalComplete(
                                                        row?._id,
                                                        'SECOND',
                                                        res?.isConfirmed,
                                                        res?.value
                                                    )
                                                }
                                                if (res.isDenied) {
                                                    return handleManagerFirstLevelApprovalComplete(
                                                        row?._id,
                                                        'SECOND',
                                                        res?.isConfirmed,
                                                        res?.value
                                                    )
                                                }
                                            })
                                        }}
                                    >
                                        <Chip
                                            label="Second Rejected"
                                            color="error"
                                            variant="outlined"
                                            size="small"
                                            clickable={true}
                                        />
                                    </button>
                                )}
                            </Stack>
                        )}
                    </div>
                )
            },
        },
        {
            field: 'Addccinfo',
            headerName: 'CC Information',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: MoneybackListResponse) =>
                row?.managerFirstApproval && row?.ccApproval === null ? (
                    <button
                        className="bg-primary-main px-3 py-1 rounded text-white"
                        onClick={() => {
                            setCustomerMobNumber(row?.customerNumber)
                            setIsShowCustomerInfoForm(true)
                            setCurrentId(row?._id)
                        }}
                    >
                        Add
                    </button>
                ) : (
                    '-'
                ),
        },
        {
            field: 'accountApproval',
            headerName: 'Account Approval',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: MoneybackListResponse) => {
                return (
                    <div className="z-0">
                        {row?.ccApproval === true ? (
                            <Stack direction="row" spacing={1}>
                                {row?.accountApproval === null ? (
                                    <button
                                        id="btn"
                                        className="overflow-hidden cursor-pointer z-0"
                                        onClick={() => {
                                            Swal.fire({
                                                icon: 'warning',
                                                confirmButtonColor: '#3085d6',
                                                cancelButtonColor: '#dc3741',
                                                confirmButtonText: 'Yes',
                                                title: 'Account Approval',
                                                text: 'Do you want to Approve ?',
                                                input: 'text', // Add input field
                                                inputPlaceholder:
                                                    'Enter remark', // Placeholder for the input field
                                                showCancelButton: true,
                                                showDenyButton: true,
                                                denyButtonText: 'Reject',
                                                reverseButtons: true,
                                                showLoaderOnConfirm: true, // Show loader when confirming
                                                // Show loader when confirming
                                                preDeny: (res) => {
                                                    Swal.showValidationMessage(
                                                        'Please enter a remark'
                                                    )

                                                    if (
                                                        !Swal.getInput()?.value
                                                    ) {
                                                        return res
                                                    } else {
                                                        return Swal.getInput()
                                                            ?.value
                                                    }
                                                },
                                                preConfirm: (reason: any) => {
                                                    // Handle the confirmation and input value
                                                    if (!reason) {
                                                        Swal.showValidationMessage(
                                                            'Please enter a remark'
                                                        )
                                                    }
                                                },
                                                allowOutsideClick: () =>
                                                    !Swal.isLoading(), // Allow clicking outside when not loading
                                            }).then((res: any) => {
                                                if (res.isConfirmed) {
                                                    return handleAccountApproval(
                                                        row?._id,
                                                        res?.isConfirmed,
                                                        res?.value
                                                    )
                                                }
                                                if (res.isDenied) {
                                                    return handleAccountApproval(
                                                        row?._id,
                                                        res?.isConfirmed,
                                                        res?.value
                                                    )
                                                }
                                            })
                                        }}
                                    >
                                        <Chip
                                            label="Account Pending"
                                            color="warning"
                                            variant="outlined"
                                            size="small"
                                            clickable={true}
                                        />
                                    </button>
                                ) : row?.accountApproval === true ? (
                                    <button
                                        id="btn"
                                        disabled={true}
                                        className="cursor-pointer"
                                    >
                                        <Chip
                                            label="Account Approved"
                                            color="success"
                                            variant="outlined"
                                            size="small"
                                            clickable={false}
                                        />
                                    </button>
                                ) : (
                                    <button
                                        id="btn"
                                        disabled={true}
                                        className="cursor-pointer"
                                    >
                                        <Chip
                                            label="Account Rejected"
                                            color="error"
                                            variant="outlined"
                                            size="small"
                                            clickable={false}
                                        />
                                    </button>
                                )}
                            </Stack>
                        ) : (
                            ''
                        )}
                    </div>
                )
            },
        },
        // {
        //     field: 'actions',
        //     headerName: 'Actions',
        //     flex: 'flex-[0.5_0.5_0%]',
        //     extraClasses: 'mr-4',
        //     renderCell: (row: MoneybackListResponse) => (
        //         <ActionPopup
        //             isView
        //             handleViewActionButton={() => navigate(`${row?._id}/view`)}
        //             handleOnAction={() => {
        //                 setShowDropdown(!showDropdown)
        //             }}
        //         />
        //     ),
        //     align: 'end',
        // },
    ]

    return (
        <>
            <ProductReplacementListing
                columns={columns}
                rows={items}
                setShowDropdown={setShowDropdown}
            />
            {/* Add Customer Information Form */}
            <DialogLogBox
                isOpen={isShowCustomerInfoForm}
                handleClose={() => {
                    setIsShowCustomerInfoForm(false)
                }}
                component={
                    <AddProductReplacementCustomerInfoFormWrapper
                        moneybackRequestId={currentId}
                        customerMobileNum={customerMobNumber || ''}
                        handleClose={() => setIsShowCustomerInfoForm(false)}
                    />
                }
            />
        </>
    )
}

export default ProductReplacementListingWrapper
