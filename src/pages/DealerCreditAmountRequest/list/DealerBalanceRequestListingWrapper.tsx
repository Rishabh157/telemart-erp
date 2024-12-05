// |-- Built-in Dependencies --|

// |-- External Dependencies --|
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { DealerToDealerListResponseTypes } from '../../../models/DealerToDealer.model'
// import Swal from 'sweetalert2'
// { SweetAlertIcon, SweetAlertResult }

// |-- Redux --|
import { RootState } from '../../../redux/store'
import useGetCustomListingData from '../../../hooks/useGetCustomListingData'
import useUnmountCleanup from '../../../hooks/useUnmountCleanup'
import { columnTypes } from '../../../components/UI/atoms/ATMTable/ATMTable'
import { ATMDateTimeDisplay } from '../../../components/UI/atoms/ATMDisplay/ATMDisplay'
import { useGetDealerBalanceRequestQuery, useApprovalDealerBalanceRequestMutation } from '../../../services/DealerBalanceRequestService'
import DealerCreditAmountRequestListing from './DealerCreditAmountRequestListing'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'
import { showToast } from 'src/utils'
import SwtAlertChipConfirm from 'src/utils/SwtAlertChipConfirm'
import { Chip } from '@mui/material'
// import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'

interface DealerBalanceRequestListResponse {
    _id: string;
    amount: number;
    referenceNumber: string;
    transferType: any;
    referenceDate: string;
    attachment: string;
    remark: string;
    bankAccount: string;
    dealerId: string;
    accountApproved: boolean;
    accountApprovedById: string | null;
    accountRemark: string;
    voucherType: string;
    companyId: string;
    isDeleted: boolean;
    isActive: boolean;
    isSynced: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    dealerCode: string;
}

const DealerBalanceRequestListingWrapper = () => {

    useUnmountCleanup()

    const dealerToDealerState: any = useSelector((state: RootState) => state.listingPagination)
    const { page, rowsPerPage, searchValue } = dealerToDealerState
    const [updateRequest] = useApprovalDealerBalanceRequestMutation();

    const { items } = useGetCustomListingData<DealerToDealerListResponseTypes>({
        useEndPointHook: useGetDealerBalanceRequestQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['referenceNumber'],
            page: page,
            filterBy: [],
            dateFilter: {},
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        }),
    });


    const handleApproval = (_id: string, value: boolean, message: string) => {
        updateRequest({
            id: _id,
            body: {
                accountApproved: value,
                accountRemark: message
            },
        }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast(
                        'success',
                        `Account ${message} is successfully!`
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
            field: 'isSynced',
            headerName: 'Synced',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.DEALER_BALANCE_REQUEST_LIST_SYNCED,
            renderCell: (row: DealerBalanceRequestListResponse) => (
                <span className={`px-2 py-1 text-xs font-medium rounded-lg ${row?.isSynced ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {row?.isSynced ? 'SYNCED' : 'NOT SYNCED'}
                </span>
            ),
        },
        {
            field: 'amount',
            headerName: 'Amount',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.DEALER_BALANCE_REQUEST_LIST_AMOUNT,
            renderCell: (row: DealerBalanceRequestListResponse) => <span> {row?.amount} </span>,
        },
        {
            field: 'accApproved',
            headerName: 'Acc Second Approval',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1.0_1.0_0%]',
            name: UserModuleNameTypes.DEALER_BALANCE_REQUEST_LIST_APPROVAL,
            align: 'center',
            renderCell: (row: DealerBalanceRequestListResponse) =>
                isAuthorized(UserModuleNameTypes.ACTION_DEALER_BALANCE_REQUEST_ACCOUNT_APPROVAL)
                    ? <div className="z-0">
                        <SwtAlertChipConfirm
                            title="Approval"
                            text="Do you want to Account Approve ?"
                            color={row?.accountApproved === false ? 'warning' : 'success'}
                            chipLabel={row?.accountApproved === false ? 'Acc Pending' : 'Acc Approved'}
                            // disabled={row?.accountApproved === true}
                            input={'text'}
                            inputPlaceholder="remark"
                            showCancelButton
                            // showDenyButton
                            icon="warning"
                            confirmButtonColor="#3085d6"
                            cancelButtonColor="#dc3741"
                            confirmButtonText="Yes"
                            next={(res) => {
                                if (res.isConfirmed || res?.isDenied) {
                                    return handleApproval(
                                        row?._id,
                                        res?.isConfirmed,
                                        res?.value,
                                    )
                                }
                            }}
                        />
                    </div> :
                    <Chip
                        label={row?.accountApproved === true ? "Acc Approved" : "Acc Pending"}
                        color={row?.accountApproved === true ? "success" : "warning"}
                        variant="outlined"
                        size="small"
                        clickable={true}
                        onClick={() => showToast('error', "You don't have permission to approve the request")}
                    />
        },
        {
            field: 'referenceNumber',
            headerName: 'Reference Number',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[0.8_0.8_0%]',
            align: 'center',
            name: UserModuleNameTypes.DEALER_BALANCE_REQUEST_LIST_REFERENCE_NUMBER,
            renderCell: (row: DealerBalanceRequestListResponse) => <span>{row?.referenceNumber || 'N/A'}</span>,
        },
        {
            field: 'transferType',
            headerName: 'Transfer Type',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[0.8_0.8_0%]',
            name: UserModuleNameTypes.DEALER_BALANCE_REQUEST_LIST_TRANSFER_TYPE,
            align: 'center',
        },
        {
            field: 'referenceDate',
            headerName: 'Reference Date',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.DEALER_BALANCE_REQUEST_LIST_REFERENCE_DATE,
            renderCell: (row: DealerBalanceRequestListResponse) => <ATMDateTimeDisplay disableTime createdAt={row?.referenceDate} />,
        },
        {
            field: 'bankAccount',
            headerName: 'Bank Account',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.DEALER_BALANCE_REQUEST_LIST_BANK_ACCOUNT,
        },
        {
            field: 'remark',
            headerName: 'Remark',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.DEALER_BALANCE_REQUEST_LIST_REMARK,
        },
        {
            field: 'createdAt',
            headerName: 'Create Date',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            name: UserModuleNameTypes.DEALER_BALANCE_REQUEST_LIST_CREATE_DATE,
            renderCell: (row: DealerBalanceRequestListResponse) => <ATMDateTimeDisplay createdAt={row?.createdAt} />,
        },
    ]

    return (
        <SideNavLayout>
            <DealerCreditAmountRequestListing
                columns={columns}
                rows={items || []}
            />
        </SideNavLayout>
    )
}

export default DealerBalanceRequestListingWrapper
