// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { Chip, Stack } from '@mui/material'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { MoneybackListResponse } from 'src/models/Moneyback.model'

// |-- Redux --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { RootState } from 'src/redux/store'
import {
    useAddProductReplacementAccountApprovalMutation,
    useGetProductReplacementOrderQuery,
    useProductReplacementMangerFirstApprovalMutation,
} from 'src/services/ProductReplacementServices'
import { showToast } from 'src/utils'
import SwtAlertChipConfirm from 'src/utils/SwtAlertChipConfirm'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import Swal from 'sweetalert2'
import AddProductReplacementCustomerInfoFormWrapper from './AddCustomerInfoForm/AddProductReplacementCustomerInfoFormWrapper'
import ProductReplacementListing from './ProductReplacementListing'
import StatusDialog from './ProductReplacementStatusDialog/StatusDialog'

const ProductReplacementListingWrapper = () => {
    useUnmountCleanup()
    // Hooks
    const navigate = useNavigate()
    // Dispatching State

    const [currentId, setCurrentId] = useState<string>()
    const [customerMobNumber, setCustomerMobNumber] = useState<string>()
    const [isShowCustomerInfoForm, setIsShowCustomerInfoForm] =
        useState<boolean>(false)

    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const [showStatusDialog, setShowStatusDialog] = useState<boolean>(false)
    const [productReplacementData, setProductReplacementData] = useState<any>(
        []
    )

    const productReplacementState: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    const [managerLevelApproval] =
        useProductReplacementMangerFirstApprovalMutation()
    const [accountApproval] = useAddProductReplacementAccountApprovalMutation()

    const { page, rowsPerPage, searchValue } = productReplacementState

    const { items } = useGetCustomListingData({
        useEndPointHook: useGetProductReplacementOrderQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['complaintNumber'],
            page: page,
            filterBy: [],
            dateFilter: {},
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        }),
    })

    // Manager First Level Approval
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
        remark: string,
        orderReferenceNumber: number
    ) => {
        accountApproval({
            id: _id,
            accountApproval: approve,
            accountRemark: remark,
            orderReferenceNumber,
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
    const getCurrentStatus = (row: any) => {
        return row?.managerFirstApproval === null
            ? 'Mang. First Pending'
            : row?.managerFirstApproval === false
            ? 'Mang. First Rejected'
            : row?.ccApproval === false
            ? 'Cc Pending'
            : row?.managerSecondApproval === null
            ? 'Mang. Second Pending'
            : row?.managerSecondApproval === false
            ? 'Mang. Second Rejected'
            : row?.accountApproval === null
            ? 'Account Pending'
            : row?.accountApproval === false
            ? 'Account Rejected'
            : 'Account Aaproved'
    }
    const columns: columnTypes[] = [
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            extraClasses: 'mr-4',
            renderCell: (row: MoneybackListResponse) => (
                <ActionPopup
                    isView={isAuthorized(
                        UserModuleNameTypes.ACTION_PRODUCT_REPLACMENT_LIST_VIEW
                    )}
                    isCustomBtn={isAuthorized(
                        UserModuleNameTypes.ACTION_PRODUCT_REPLACMENT_LIST_LOGS
                    )}
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
            name: UserModuleNameTypes.PRODUCT_REPLACMENT_LIST_ORDER_NUMBER,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: MoneybackListResponse) => (
                <span className="text-primary-main "># {row.orderNumber}</span>
            ),
        },
        {
            field: 'complaintNumber',
            headerName: 'Complain No.',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.PRODUCT_REPLACMENT_LIST_COMPLAIN_NUMBER,
            align: 'start',
            extraClasses: 'min-w-[150px]',
            // renderCell: (row: MoneybackListResponse) => <span></span>,
        },
        {
            field: 'schemeLabel',
            headerName: 'Scheme Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.PRODUCT_REPLACMENT_LIST_SCHEME_NUMBER,
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
            name: UserModuleNameTypes.PRODUCT_REPLACMENT_LIST_SCHEME_PRICE,
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
            name: UserModuleNameTypes.PRODUCT_REPLACMENT_LIST_CUSTOMER_NAME,
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
            name: UserModuleNameTypes.PRODUCT_REPLACMENT_LIST_MANAGER_APPROVAL,
            renderCell: (row: MoneybackListResponse) => {
                return (
                    <div className="z-0">
                        {/* {!row?.managerFirstApproval ? (
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
                        )} */}
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
            field: 'Addccinfo',
            headerName: 'CC Information',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.PRODUCT_REPLACMENT_LIST_CC_INFO,
            align: 'start',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: MoneybackListResponse) =>
                row?.managerFirstApproval && row?.ccApproval === false ? (
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
            name: UserModuleNameTypes.PRODUCT_REPLACMENT_LIST_ACCOUNT_APPROVAL,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: MoneybackListResponse) => {
                return (
                    <div className="z-0">
                        {row?.managerSecondApproval === true ? (
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
                                                        res?.value,
                                                        parseInt(
                                                            row?.orderNumber
                                                        )
                                                    )
                                                }
                                                if (res.isDenied) {
                                                    return handleAccountApproval(
                                                        row?._id,
                                                        res?.isConfirmed,
                                                        res?.value,
                                                        parseInt(
                                                            row?.orderNumber
                                                        )
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
        {
            field: 'customerName',
            headerName: 'Current Status',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            name: UserModuleNameTypes.PRODUCT_REPLACMENT_CURRENT_STATUS,
            renderCell: (row: MoneybackListResponse) => (
                <span
                    className="cursor-pointer bg-slate-50 p-1.5 rounded-md"
                    onClick={() => {
                        setProductReplacementData(row)
                        setShowStatusDialog(true)
                    }}
                >
                    {getCurrentStatus(row)}
                </span>
            ),
        },
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
            {/* status Dialog  */}
            {showStatusDialog && (
                <StatusDialog
                    productReplacementData={productReplacementData}
                    isShow={showStatusDialog}
                    onClose={() => {
                        setShowStatusDialog(false)
                    }}
                />
            )}
        </>
    )
}

export default ProductReplacementListingWrapper
