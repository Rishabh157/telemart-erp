// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { Chip, Stack } from '@mui/material'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { HouseArrestListResponseType } from 'src/models/HouseArrest.modal'

// |-- Redux --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { RootState } from 'src/redux/store'
import {
    useGetHouseArrestQuery,
    useHouesArrestAccountApprovalMutation,
    useHouseArrestManagerApprovalMutation,
} from 'src/services/HouseArrestServices'
import { showToast } from 'src/utils'
import HouseArrestListing from './HouseArrestListing'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import SwtAlertChipConfirm from 'src/utils/SwtAlertChipConfirm'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import Swal from 'sweetalert2'
import AddCustomerCareApprovedFormWrapper from './AddCustomerCareApprovedForm/AddCustomerCareApprovedFormWrapper'
import StatusDialog from './HouseArrestStatusDialog/StatusDialog'
import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'

const HouseArrestListingWrapper = () => {
    useUnmountCleanup()

    // Hooks
    const navigate = useNavigate()
    // Dispatching State

    const [newOrderDetails, setNewOrderDetails] = useState<any>()
    const [currentId, setCurrentId] = useState<string>()
    const [isShowCustomerInfoForm, setIsShowCustomerInfoForm] =
        useState<boolean>(false)

    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const [showStatusDialog, setShowStatusDialog] = useState<boolean>(false)
    const [houseArrestData, setHouseArrestData] = useState<any>([])

    const houseArrestState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { userData } = useGetLocalStorage()

    const [managerLevelApproval] = useHouseArrestManagerApprovalMutation()
    const [accountApproval] = useHouesArrestAccountApprovalMutation()

    const { page, rowsPerPage, searchValue } = houseArrestState

    // pagination api
    const { items } = useGetCustomListingData<HouseArrestListResponseType[]>({
        useEndPointHook: useGetHouseArrestQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['complaintNumber'],
            page: page,
            filterBy: [
                {
                    fieldName: 'companyId',
                    value: userData?.companyId,
                },
            ],
            dateFilter: {},
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        }),
    })
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
        complaintNumber: number,
        dealerId: string,
        settledAmount: string
    ) => {
        accountApproval({
            id: _id,
            accountApproval: approve,
            accountRemark: remark,
            complaintNumber,
            dealerId,
            creditAmount: settledAmount,
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

    const sweetAlertContent = `
    <div class="overflow-x-auto">
        <table class="table-auto w-full border-collapse border">
            <thead>
                <tr class="bg-gray-200 border">
                    <th class="px-4 py-2 border font-bold text-base w-4/12">Order Details</th>
                    <th class="px-4 py-2 border font-bold text-base w-4/12">New Order Details</th>
                    <th class="px-4 py-2 border font-bold text-base w-4/12">Old Order Details</th>
                </tr>
            </thead>
            <tbody>
                <tr class="border">
                    <td class="px-4 py-2 border text-sm font-bold">Order Number</td>
                    <td class="px-4 py-2 border text-sm">${
                        newOrderDetails?.orderNumber || '-'
                    }</td>
                    <td class="px-4 py-2 border text-sm">${
                        newOrderDetails?.oldOrderNumber || '-'
                    }</td>
                </tr>
                <tr class="border">
                    <td class="px-4 py-2 border text-sm font-bold">Customer Name</td>
                    <td class="px-4 py-2 border text-sm">${
                        newOrderDetails?.customerName || '-'
                    }</td>
                    <td class="px-4 py-2 border text-sm">${
                        newOrderDetails?.oldCustomerName || '-'
                    }</td>
                </tr>
                <tr class="border">
                    <td class="px-4 py-2 border text-sm font-bold">Customer Number</td>
                    <td class="px-4 py-2 border text-sm">${
                        newOrderDetails?.customerNumber || '-'
                    }</td>
                    <td class="px-4 py-2 border text-sm">${
                        newOrderDetails?.oldCustomerNumber || '-'
                    }</td>
                </tr>
                <tr class="border">
                    <td class="px-4 py-2 border text-sm font-bold">Address</td>
                    <td class="px-4 py-2 border text-sm">${
                        newOrderDetails?.address || '-'
                    }</td>
                    <td class="px-4 py-2 border text-sm">${
                        newOrderDetails?.oldCustomerAddress || '-'
                    }</td>
                </tr>
                 
            </tbody>
        </table>
    </div>

    <div class="overflow-x-auto mt-2">
    <table class="table-auto w-full border-collapse border">
        <thead>
            <tr class="bg-gray-200 border">
                <th class="px-4 py-2 border font-bold text-base w-4/12">Barcode</th>
                <th class="px-4 py-2 border font-bold text-base w-4/12">Original Barcode</th>
                <th class="px-4 py-2 border font-bold text-base w-4/12">New Barcode</th>
            </tr>
        </thead>
        <tbody>
            <tr class="border">
                <td class="px-4 py-2 border text-sm font-bold">Order Number</td>
                <td class="px-4 py-2 border text-sm">${
                    newOrderDetails?.orignalBarcode?.join(' , ') || '-'
                }</td>
                <td class="px-4 py-2 border text-sm">${
                    newOrderDetails?.returnItemBarcode?.join(' , ') || '-'
                }</td>
            </tr>
        </tbody>
    </table>
</div>

    `
    const getCurrentStatus = (row: any) => {
        return row?.ccApproval === false
            ? 'Cc Pending'
            : row?.managerFirstApproval === null
            ? 'Mang. First Pending'
            : row?.managerFirstApproval === false
            ? 'Mang. First Rejected'
            : row?.dealerApproval === false
            ? 'Dealer Pending'
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
            renderCell: (row: HouseArrestListResponseType) => (
                <ActionPopup
                    isView={isAuthorized(
                        UserModuleNameTypes.ACTION_HOUSE_ARREST_LIST_VIEW
                    )}
                    isCustomBtn={isAuthorized(
                        UserModuleNameTypes.ACTION_HOUSE_ARREST_LIST_LOGS
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
            extraClasses: 'min-w-[150px]',
            name: UserModuleNameTypes.HOUSE_ARREST_LIST_ORDER_NUMBER,
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
            name: UserModuleNameTypes.HOUSE_ARREST_LIST_COMPLAIN_NUMBER,
            // renderCell: (row: MoneybackListResponse) => <span></span>,
        },
        {
            field: 'mbkNumber',
            headerName: 'MBK No.',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            name: UserModuleNameTypes.HOUSE_ARREST_LIST_MBK_NUMBER,
            // renderCell: (row: MoneybackListResponse) => <span></span>,
        },
        {
            field: 'requestCreatedByLabel',
            headerName: 'Request Created By',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[160px]',
            name: UserModuleNameTypes.HOUSE_ARREST_LIST_REQUEST_CREATED_BY,
        },
        {
            field: 'customerName',
            headerName: 'Customer Name',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[150px]',
            name: UserModuleNameTypes.HOUSE_ARREST_LIST_CUSTOMER_NAME,
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
            name: UserModuleNameTypes.HOUSE_ARREST_LIST_CC_APPROVAL,
            renderCell: (row: HouseArrestListResponseType) => (
                <div className="z-0">
                    <Stack direction="row" spacing={1}>
                        {row?.ccApproval === false ? (
                            <button
                                id="btn"
                                className=" overflow-hidden cursor-pointer z-0"
                                onClick={() => {
                                    setIsShowCustomerInfoForm(true)
                                    setCurrentId(row?._id)
                                    setNewOrderDetails({
                                        orderNumber: row?.orderNumber,
                                        mobileNo: row?.customerNumber,
                                        autoFillingShippingAddress:
                                            row?.address,
                                        customerName: row?.customerName,
                                    })
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
            extraClasses: 'min-w-[160px]',
            align: 'center',
            name: UserModuleNameTypes.HOUSE_ARREST_LIST_MANAGER_APPROVAL,
            renderCell: (row: HouseArrestListResponseType) => {
                return (
                    <div
                        onClick={() => setNewOrderDetails(row)}
                        className="z-0"
                    >
                        <SwtAlertChipConfirm
                            title="Approval"
                            text="Do you want to Approve ?"
                            html={sweetAlertContent}
                            color={
                                row?.ccApproval &&
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
                                row?.ccApproval === false
                                    ? 'First Pending'
                                    : row?.managerFirstApproval === null
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
                                row?.ccApproval === true &&
                                row?.managerFirstApproval === null
                                    ? false
                                    : row?.managerFirstApproval === false
                                    ? true
                                    : row?.dealerApproval === false
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
            extraClasses: 'min-w-[250px]',
            name: UserModuleNameTypes.HOUSE_ARREST_LIST_ACCOUNT_APPROVAL,
            renderCell: (row: HouseArrestListResponseType) => (
                <div className="z-0" onClick={() => setNewOrderDetails(row)}>
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
                                        inputPlaceholder: 'Enter remark', // Placeholder for the input field
                                        showCancelButton: true,
                                        showDenyButton: true,
                                        denyButtonText: 'Reject',
                                        reverseButtons: true,
                                        html: sweetAlertContent,
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
                                                row?.complaintNumber,
                                                row?.dealerId,
                                                row?.settledAmount
                                            )
                                        }
                                        if (res.isDenied) {
                                            return handleAccountApproval(
                                                row?._id,
                                                res?.isConfirmed,
                                                res?.value,
                                                row?.complaintNumber,
                                                row?.dealerId,
                                                row?.settledAmount
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
                                    color="error"
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
        {
            field: 'customerName',
            headerName: 'Current Status',
            flex: 'flex-[1_1_0%]',
            align: 'start',
            extraClasses: 'min-w-[200px]',
            name: UserModuleNameTypes.HOUSE_ARREST_LIST_CURRENT_STATUS,
            renderCell: (row: any) => (
                <span
                    className="cursor-pointer bg-slate-50 p-1.5 rounded-md"
                    onClick={() => {
                        setHouseArrestData(row)
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
            <HouseArrestListing
                columns={columns}
                rows={items}
                setShowDropdown={setShowDropdown}
            />
            {/* Add Customer Information Form */}
            <DialogLogBox
                maxWidth="md"
                isOpen={isShowCustomerInfoForm}
                handleClose={() => {
                    setIsShowCustomerInfoForm(false)
                }}
                component={
                    <AddCustomerCareApprovedFormWrapper
                        complainId={currentId || ''}
                        newOrderDetails={newOrderDetails}
                        handleClose={() => setIsShowCustomerInfoForm(false)}
                    />
                }
            />
            {/* status Dialog  */}
            {showStatusDialog && (
                <StatusDialog
                    houseArrestData={houseArrestData}
                    isShow={showStatusDialog}
                    onClose={() => {
                        setShowStatusDialog(false)
                    }}
                />
            )}
        </>
    )
}

export default HouseArrestListingWrapper
