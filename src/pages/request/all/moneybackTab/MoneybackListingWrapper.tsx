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
} from 'src/redux/slices/MoneybackSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import {
    useGetMoneybackOrderQuery,
    useMangerFirstApprovalMutation,
} from 'src/services/MoneybackServices'
import { showToast } from 'src/utils'
// import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
// Dispatching imports
// import { IoRemoveCircle } from 'react-icons/io5'
// import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
// import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
// import moment from 'moment'
import MoneybackListing from './MoneybackListing'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import Swal from 'sweetalert2'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import AddCustomerInfoFormWrapper from './AddCustomerInfoForm/AddCustomerInfoFormWrapper'
import AddAccountApprovedFormWrapper from './AddAccountApprovedForm/AddAccountApprovedFormWrapper'

const MoneybackListingWrapper = () => {
    // Hooks
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    // Dispatching State

    const [currentId, setCurrentId] = useState<string>()
    const [isShowCustomerInfoForm, setIsShowCustomerInfoForm] =
        useState<boolean>(false)
    const [isShowAccountApprovalForm, setIsShowAccountApprovalForm] =
        useState<boolean>(false)

    const [showDropdown, setShowDropdown] = useState<boolean>(false)

    const moneybackState: any = useSelector(
        (state: RootState) => state.moneyback
    )

    const [managerLevelApproval] = useMangerFirstApprovalMutation()

    const {
        page,
        rowsPerPage,
        searchValue,
        items,
        // totalItems,
        // isTableLoading,
    } = moneybackState

    const { data, isFetching, isLoading } = useGetMoneybackOrderQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['complaintNumber', 'orderNumber'],
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
            headerName: 'Approval',
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
            headerName: 'CC Info',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            hidden: false,
            renderCell: (row: MoneybackListResponse) =>
                row?.managerFirstApproval &&
                !row?.ccApproval && (
                    <button
                        className="bg-primary-main px-3 py-1 rounded text-white"
                        onClick={() => {
                            setIsShowCustomerInfoForm(true)
                            setCurrentId(row?._id)
                        }}
                    >
                        Add
                    </button>
                ),
        },
        {
            field: 'accountApproval',
            headerName: 'Account Approval',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: MoneybackListResponse) => {
                return (
                    //
                    <div className="z-0">
                        {row?.managerSecondApproval ? (
                            <Stack direction="row" spacing={1}>
                                {row?.accountApproval === null ? (
                                    <button
                                        id="btn"
                                        className="overflow-hidden cursor-pointer z-0"
                                        onClick={() => {
                                            setIsShowAccountApprovalForm(true)
                                            setCurrentId(row?._id)
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
                                ) : row?.accountApproval === false ? (
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
                                ) : (
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
                                )}
                            </Stack>
                        ) : (
                            <></>
                            // <button
                            //     id="btn"
                            //     disabled={true}
                            //     className="cursor-pointer"
                            // >
                            //     <Chip
                            //         label="Account Approved"
                            //         color="success"
                            //         variant="outlined"
                            //         size="small"
                            //         clickable={false}
                            //     />
                            // </button>
                        )}
                    </div>
                )
            },
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            extraClasses: 'mr-4',
            renderCell: (row: MoneybackListResponse) => (
                <ActionPopup
                    isView
                    handleViewActionButton={() => navigate(`${row?._id}/view`)}
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                    }}
                />
            ),
            align: 'end',
        },
    ]

    return (
        <>
            <MoneybackListing
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
                    <AddCustomerInfoFormWrapper
                        moneybackRequestId={currentId}
                        handleClose={() => setIsShowCustomerInfoForm(false)}
                    />
                }
            />

            {/* Add Account Approval Form */}
            <DialogLogBox
                maxWidth="md"
                isOpen={isShowAccountApprovalForm}
                handleClose={() => {
                    setIsShowAccountApprovalForm(false)
                }}
                component={
                    <AddAccountApprovedFormWrapper
                        moneybackRequestId={currentId}
                        handleClose={() => setIsShowAccountApprovalForm(false)}
                    />
                }
            />
        </>
    )
}

export default MoneybackListingWrapper
