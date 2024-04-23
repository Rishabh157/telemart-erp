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
import { RootState } from 'src/redux/store'
import {
    useGetMoneybackOrderQuery,
    useMangerFirstApprovalMutation,
} from 'src/services/MoneybackServices'
import { showToast } from 'src/utils'

import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import MoneybackListing from './MoneybackListing'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import SwtAlertChipConfirm from 'src/utils/SwtAlertChipConfirm'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import AddAccountApprovedFormWrapper from './AddAccountApprovedForm/AddAccountApprovedFormWrapper'
import AddCustomerInfoFormWrapper from './AddCustomerInfoForm/AddCustomerInfoFormWrapper'
import StatusDialog from './MoneyBackStatusDialog/statusDialog'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'

const MoneybackListingWrapper = () => {
    useUnmountCleanup()
    // Hooks
    const navigate = useNavigate()
    // Dispatching State

    const [currentId, setCurrentId] = useState<string>()
    const [customerNumber, setCustomerNumber] = useState<string>()
    const [complaintNumber, setComplaintNumber] = useState<string>()
    const [isShowCustomerInfoForm, setIsShowCustomerInfoForm] =
        useState<boolean>(false)
    const [isShowAccountApprovalForm, setIsShowAccountApprovalForm] =
        useState<boolean>(false)

    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const [showStatusDialog, setShowStatusDialog] = useState<boolean>(false)
    const [moneyBackData, setMoneyBackData] = useState<any>([])

    const moneybackState: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    const [managerLevelApproval] = useMangerFirstApprovalMutation()

    const { page, rowsPerPage, searchValue } = moneybackState

    const { items } = useGetCustomListingData<MoneybackListResponse>({
        useEndPointHook: useGetMoneybackOrderQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['complaintNumber', 'orderNumber'],
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
            complaintNumber: parseInt(complaintNumber),
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
            extraClasses: 'min-w-[100px]',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: MoneybackListResponse) => (
                <ActionPopup
                    isView={isAuthorized(
                        UserModuleNameTypes.ACTION_MONEY_BACK_LIST_VIEW
                    )}
                    isCustomBtn={isAuthorized(
                        UserModuleNameTypes.ACTION_MONEY_BACK_LIST_LOGS
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
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.MONEY_BACK_LIST_ORDER_NUMBER,
            renderCell: (row: MoneybackListResponse) => (
                <span className="text-primary-main "># {row.orderNumber}</span>
            ),
        },
        {
            field: 'complaintNumber',
            headerName: 'Complain No.',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            name: UserModuleNameTypes.MONEY_BACK_LIST_COMPLAIN_NUMBER,
            // renderCell: (row: MoneybackListResponse) => <span></span>,
        },
        {
            field: 'schemeLabel',
            headerName: 'Scheme Name',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            name: UserModuleNameTypes.MONEY_BACK_LIST_SCHEME_NAME,
            renderCell: (row: MoneybackListResponse) => (
                <span>{row?.schemeLabel || '-'}</span>
            ),
        },
        {
            field: 'schemePrice',
            headerName: 'Scheme Price',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            name: UserModuleNameTypes.MONEY_BACK_LIST_SCHEME_PRICE,
            renderCell: (row: MoneybackListResponse) => (
                <span>{row?.schemePrice || '-'}</span>
            ),
        },
        {
            field: 'requestCreatedByLabel',
            headerName: 'Request Created By',
            extraClasses: 'min-w-[160px]',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            name: UserModuleNameTypes.MONEY_BACK_LIST_REQUEST_CREATED_BY,
            renderCell: (row: MoneybackListResponse) => (
                <span>{row?.requestCreatedByLabel || '-'}</span>
            ),
        },
        {
            field: 'customerName',
            headerName: 'Customer Name',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            name: UserModuleNameTypes.MONEY_BACK_LIST_CUSTOMER_NAME,
            renderCell: (row: MoneybackListResponse) => (
                <span>{row?.customerName}</span>
            ),
        },

        {
            field: 'Approved',
            headerName: 'Approval',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1.0_1.0_0%]',
            name: UserModuleNameTypes.MONEY_BACK_LIST_APPROVAL,
            align: 'center',
            renderCell: (row: MoneybackListResponse) => {
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
            field: 'Addccinfo',
            headerName: 'CC Info',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            name: UserModuleNameTypes.MONEY_BACK_LIST_CC_INFO,
            hidden: false,
            renderCell: (row: MoneybackListResponse) =>
                row?.managerFirstApproval &&
                !row?.ccApproval && (
                    <button
                        className="bg-primary-main px-3 py-1 rounded text-white"
                        onClick={() => {
                            setIsShowCustomerInfoForm(true)
                            setCustomerNumber(row?.customerNumber)
                            setCurrentId(row?._id)
                            setComplaintNumber(row?.complaintNumber)
                        }}
                    >
                        Add
                    </button>
                ),
        },
        {
            field: 'accountApproval',
            headerName: 'Account Approval',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            name: UserModuleNameTypes.MONEY_BACK_LIST_ACCOUNT_APPROVAL,
            renderCell: (row: MoneybackListResponse) => {
                return (
                    //
                    <div className="z-0">
                        {row?.managerSecondApproval && (
                            <Stack direction="row" spacing={1}>
                                <button
                                    id="btn"
                                    className="overflow-hidden cursor-pointer z-0"
                                    disabled={
                                        row?.accountApproval === null
                                            ? false
                                            : true
                                    }
                                    onClick={() => {
                                        setIsShowAccountApprovalForm(true)
                                        setCurrentId(row?._id)
                                        setComplaintNumber(row?.complaintNumber)
                                    }}
                                >
                                    <Chip
                                        label={
                                            row?.accountApproval === null
                                                ? 'Account Pending'
                                                : row?.accountApproval
                                                    ? 'Account Approved'
                                                    : 'Account Rejected'
                                        }
                                        color={
                                            row?.accountApproval === null
                                                ? 'warning'
                                                : row?.accountApproval
                                                    ? 'success'
                                                    : 'error'
                                        }
                                        variant="outlined"
                                        size="small"
                                        clickable={true}
                                    />
                                </button>
                            </Stack>
                        )}
                    </div>
                )
            },
        },
        {
            field: 'currentStatus',
            headerName: 'Current Status',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            name: UserModuleNameTypes.MONEY_BACK_LIST_CURRENT_STATUS,
            renderCell: (row: MoneybackListResponse) => (
                <span
                    className="cursor-pointer bg-slate-50 p-1.5 rounded-md"
                    onClick={() => {
                        setMoneyBackData(row)
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
                        customerNumber={customerNumber || ''}
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
                        complaintNumber={complaintNumber as string}
                        handleClose={() => setIsShowAccountApprovalForm(false)}
                    />
                }
            />
            {/* status Dialog  */}
            {showStatusDialog && (
                <StatusDialog
                    moneyBackData={moneyBackData}
                    isShow={showStatusDialog}
                    onClose={() => {
                        setShowStatusDialog(false)
                    }}
                />
            )}
        </>
    )
}

export default MoneybackListingWrapper
