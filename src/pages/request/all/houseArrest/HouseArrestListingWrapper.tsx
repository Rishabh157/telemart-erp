// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { Chip, Stack } from '@mui/material'
import { HouseArrestListResponseType } from 'src/models/HouseArrest.modal'

// |-- Redux --|
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/houseArrestSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import {
    useGetHouseArrestQuery,
    useHouseArrestManagerApprovalMutation,
    useHouesArrestAccountApprovalMutation,
} from 'src/services/HouseArrestServices'
import { showToast } from 'src/utils'
import HouseArrestListing from './HouseArrestListing'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
// import Swal from 'sweetalert2'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import AddCustomerCareApprovedFormWrapper from './AddCustomerCareApprovedForm/AddCustomerCareApprovedFormWrapper'
import SwtAlertChipConfirm from 'src/utils/SwtAlertChipConfirm'
import Swal from 'sweetalert2'

const HouseArrestListingWrapper = () => {
    // Hooks
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    // Dispatching State

    const [currentId, setCurrentId] = useState<string>()
    const [isShowCustomerInfoForm, setIsShowCustomerInfoForm] =
        useState<boolean>(false)

    const [showDropdown, setShowDropdown] = useState<boolean>(false)

    const houseArrestState: any = useSelector(
        (state: RootState) => state.houseArrest
    )

    const [managerLevelApproval] = useHouseArrestManagerApprovalMutation()
    const [accountApproval] = useHouesArrestAccountApprovalMutation()

    const {
        page,
        rowsPerPage,
        searchValue,
        items,
        // totalItems,
        // isTableLoading,
    } = houseArrestState

    const { data, isFetching, isLoading } = useGetHouseArrestQuery({
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

    // Manager Level Approval
    const handleManagerFirstLevelApprovalComplete = (
        _id: string,
        level: 'FIRST' | 'SECOND',
        approve: boolean,
        remark: string,
        complaintNumber: string
    ) => {
        managerLevelApproval({
            id: _id,
            level,
            approve,
            remark,
            complaintNumber,
        }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', `Approved is successfully!`)
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
        remark: string,
        complaintNumber: number
    ) => {
        accountApproval({
            id: _id,
            accountApproval: approve,
            accountRemark: remark,
            complaintNumber,
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
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            extraClasses: 'mr-4',
            renderCell: (row: HouseArrestListResponseType) => (
                <ActionPopup
                    isView
                    isCustomBtn
                    customBtnText="Logs"
                    handleViewActionButton={() => navigate(`${row?._id}/view`)}
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                    }}
                    handleCustomActionButton={() =>
                        navigate(`${row?._id}/logs`)
                    }
                />
            ),
        },
        {
            field: 'orderNumber',
            headerName: 'Order No.',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: HouseArrestListResponseType) => (
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
            field: 'mbkNumber',
            headerName: 'MBK No.',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            // renderCell: (row: MoneybackListResponse) => <span></span>,
        },
        {
            field: 'requestCreatedByLabel',
            headerName: 'Request Created By',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
        },
        {
            field: 'customerName',
            headerName: 'Customer Name',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: HouseArrestListResponseType) => (
                <span>{row?.customerName}</span>
            ),
        },
        {
            field: 'ccApproval',
            headerName: 'CC Approval',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: HouseArrestListResponseType) => (
                <div className="z-0">
                    <Stack direction="row" spacing={1}>
                        {row?.ccApproval === null ? (
                            <button
                                id="btn"
                                className=" overflow-hidden cursor-pointer z-0"
                                onClick={() => {
                                    setIsShowCustomerInfoForm(true)
                                    setCurrentId(row?._id)
                                }}
                            >
                                <Chip
                                    label="CC Pending"
                                    color="warning"
                                    variant="outlined"
                                    size="small"
                                    clickable={true}
                                />
                            </button>
                        ) : row?.ccApproval === false ? (
                            <button
                                id="btn"
                                disabled={true}
                                className="cursor-pointer"
                            >
                                <Chip
                                    label="CC Rejected"
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
                                    label="CC Approved"
                                    color="success"
                                    variant="outlined"
                                    size="small"
                                    clickable={false}
                                />
                            </button>
                        )}
                    </Stack>
                </div>
            ),
        },
        {
            field: 'managerFirstApproval',
            headerName: 'Manager Approval',
            flex: 'flex-[1.0_1.0_0%]',
            align: 'center',
            renderCell: (row: HouseArrestListResponseType) => {
                return (
                    <div className="z-0">
                        <SwtAlertChipConfirm
                            title="Approval"
                            text="Do you want to Approve ?"
                            color={
                                row?.managerFirstApproval === null
                                    ? 'warning'
                                    : row?.managerFirstApproval === false
                                    ? 'error'
                                    : row?.managerSecondApproval
                                    ? 'success'
                                    : row?.managerSecondApproval === null
                                    ? 'warning'
                                    : 'error'
                            }
                            chipLabel={
                                row?.managerFirstApproval === null
                                    ? 'First Pending'
                                    : row?.managerFirstApproval === false
                                    ? 'First Rejected'
                                    : row?.managerSecondApproval
                                    ? 'Second Approved'
                                    : row?.managerSecondApproval === null
                                    ? 'Second Pending'
                                    : 'Second Rejected'
                            }
                            disabled={
                                row?.managerFirstApproval === null
                                    ? false
                                    : row?.managerFirstApproval === false
                                    ? true
                                    : row?.ccApproval === false
                                    ? true
                                    : row?.managerSecondApproval === null
                                    ? false
                                    : true
                            }
                            input={'text'}
                            inputPlaceholder="remark"
                            showCancelButton
                            showDenyButton
                            icon="warning"
                            confirmButtonColor="#3085d6"
                            cancelButtonColor="#dc3741"
                            confirmButtonText="Yes"
                            next={(res) => {
                                if (res.isConfirmed || res?.isDenied) {
                                    if (!row?.managerFirstApproval) {
                                        return handleManagerFirstLevelApprovalComplete(
                                            row?._id,
                                            'FIRST',
                                            res?.isConfirmed,
                                            res?.value,
                                            row?.complaintNumber
                                        )
                                    }
                                    if (row?.managerSecondApproval === null) {
                                        return handleManagerFirstLevelApprovalComplete(
                                            row?._id,
                                            'SECOND',
                                            res?.isConfirmed,
                                            res?.value,
                                            row?.complaintNumber
                                        )
                                    }
                                }
                            }}
                        />
                    </div>
                )
            },
        },
        {
            field: 'accApproval',
            headerName: 'Account Approval',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: HouseArrestListResponseType) => (
                <div className="z-0">
                    <Stack direction="row" spacing={1}>
                        {row?.managerSecondApproval === null ? (
                            <button
                                id="btn"
                                disabled={true}
                                className="cursor-pointer"
                            >
                                <Chip
                                    label="Manager Second Pending"
                                    color="warning"
                                    variant="outlined"
                                    size="small"
                                    clickable={false}
                                />
                            </button>
                        ) : row?.managerSecondApproval === false ? (
                            <button
                                id="btn"
                                disabled={true}
                                className="cursor-pointer"
                            >
                                <Chip
                                    label="Manager Second Reject"
                                    color="error"
                                    variant="outlined"
                                    size="small"
                                    clickable={false}
                                />
                            </button>
                        ) : row?.managerSecondApproval === true &&
                          row?.accountApproval === null ? (
                            <button
                                id="btn"
                                className=" overflow-hidden cursor-pointer z-0"
                                onClick={() => {
                                    Swal.fire({
                                        icon: 'warning',
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#dc3741',
                                        confirmButtonText: 'Yes',
                                        title: 'Second Approval',
                                        text: 'Do you want to Approve ?',
                                        input: 'text', // Add input field
                                        inputPlaceholder: 'Enter remark', // Placeholder for the input field
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

                                            if (!Swal.getInput()?.value) {
                                                return res
                                            } else {
                                                return Swal.getInput()?.value
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
                                                res?.value,
                                                row?.complaintNumber
                                            )
                                        }
                                        if (res.isDenied) {
                                            return handleAccountApproval(
                                                row?._id,
                                                res?.isConfirmed,
                                                res?.value,
                                                row?.complaintNumber
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
                        ) : row?.accountApproval === false ? (
                            <button
                                id="btn"
                                disabled={true}
                                className="cursor-pointer"
                            >
                                <Chip
                                    label="Account Rejected"
                                    color="success"
                                    variant="outlined"
                                    size="small"
                                    clickable={false}
                                />
                            </button>
                        ) : (
                            row?.accountApproval === true && (
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
                            )
                        )}
                    </Stack>
                </div>
            ),
        },
    ]

    return (
        <>
            <HouseArrestListing
                columns={columns}
                rows={items}
                setShowDropdown={setShowDropdown}
            />
            {/* Add Customer Information Form */}
            <DialogLogBox
                maxWidth="sm"
                isOpen={isShowCustomerInfoForm}
                handleClose={() => {
                    setIsShowCustomerInfoForm(false)
                }}
                component={
                    <AddCustomerCareApprovedFormWrapper
                        complainId={currentId || ''}
                        handleClose={() => setIsShowCustomerInfoForm(false)}
                    />
                }
            />
        </>
    )
}

export default HouseArrestListingWrapper
