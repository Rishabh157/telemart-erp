// |-- Built-in Dependencies --|

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
// |-- Internal Dependencies --|
import { RootState } from 'src/redux/store'
// |-- Redux --|
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { useGetDealerBalanceRequestQuery } from 'src/services/DealerBalanceRequestService'
import DealerBalanceRequestTabListing from './DealerBalanceRequestTabListing'
import { ATMDateTimeDisplay } from 'src/components/UI/atoms/ATMDisplay/ATMDisplay'
import { useParams } from 'react-router-dom'
import SwtAlertChipConfirm from 'src/utils/SwtAlertChipConfirm'

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
    createdAt: string;
    updatedAt: string;
    __v: number;
    dealerCode: string;
    isSynced: boolean;
}

const DealerBalanceRequestTabListingWrapper = () => {

    useUnmountCleanup()
    const params = useParams()
    const dealerId: any = params.dealerId

    const dealerToDealerState: any = useSelector((state: RootState) => state.listingPagination)
    const { page, rowsPerPage, searchValue } = dealerToDealerState

    const { items } = useGetCustomListingData<DealerBalanceRequestListResponse>({
        useEndPointHook: useGetDealerBalanceRequestQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['referenceNumber'],
            page: page,
            filterBy: [
                {
                    fieldName: 'dealerId',
                    value: dealerId,
                },
            ],
            dateFilter: {},
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        }),
    });

    const columns: columnTypes[] = [
        {
            field: 'isSynced',
            headerName: 'Synced',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1_1_0%]',
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
            renderCell: (row: DealerBalanceRequestListResponse) => <span> {row?.amount} </span>,
        },
        {
            field: 'accApproved',
            headerName: 'Acc Second Approval',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1.0_1.0_0%]',
            // name: UserModuleNameTypes.SALE_ORDER_LIST_ACC_APPROVAL,
            align: 'center',
            renderCell: (row: DealerBalanceRequestListResponse) => {
                return (
                    <div className="z-0">
                        <SwtAlertChipConfirm
                            title="Approval"
                            text="Do you want to Account Approve ?"
                            color={row?.accountApproved === false ? 'warning' : 'success'}
                            chipLabel={row?.accountApproved === false ? 'Acc Pending' : 'Acc Approved'}
                            disabled={row?.accountApproved === true}
                            input={'text'}
                            inputPlaceholder="remark"
                            showCancelButton
                            // showDenyButton
                            icon="warning"
                            confirmButtonColor="#3085d6"
                            cancelButtonColor="#dc3741"
                            confirmButtonText="Yes"
                            next={(res) => {
                                // if (isAuthorized(UserModuleNameTypes.ACTION_DEALER_CREDIT_AMOUNT_REQUEST_ACCOUNT_APPROVAL)) {
                                //     if (res.isConfirmed || res?.isDenied) {
                                //         return handleApproval(
                                //             row?._id,
                                //             res?.isConfirmed,
                                //             res?.value,
                                //         )
                                //     }
                                // } else {
                                //     showToast('error', "You don't have permission to approve the request")
                                // }
                            }}
                        />
                    </div>
                )
            },
        },
        // {
        //     field: 'accApprovedActionBy',
        //     headerName: 'Acc Approved By',
        //     extraClasses: 'min-w-[150px]',
        //     flex: 'flex-[0.5_0.5_0%]',
        //     align: 'center',
        //     renderCell: (row: DealerBalanceRequestListResponse) => {
        //         return <div>
        //             <div className="font-medium">
        //                 {row?.accApprovedActionBy}
        //             </div>
        //             <div className="text-[12px] text-slate-500 font-medium">
        //                 {row?.accApprovedAt}
        //             </div>
        //         </div>
        //     },
        // },
        {
            field: 'referenceNumber',
            headerName: 'Reference Number',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[0.8_0.8_0%]',
            align: 'center',
        },
        {
            field: 'transferType',
            headerName: 'Transfer Type',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[0.8_0.8_0%]',
            align: 'center',
        },
        {
            field: 'referenceDate',
            headerName: 'Reference Date',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: DealerBalanceRequestListResponse) => <ATMDateTimeDisplay disableTime createdAt={row?.referenceDate} />,
        },
        {
            field: 'bankAccount',
            headerName: 'Bank Account',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1_1_0%]',
        },
        {
            field: 'remark',
            headerName: 'Remark',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1_1_0%]',
        },
        {
            field: 'createdAt',
            headerName: 'Create Date',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px]',
            renderCell: (row: DealerBalanceRequestListResponse) => <ATMDateTimeDisplay createdAt={row?.createdAt} />,
        },
    ]

    return (
        <DealerBalanceRequestTabListing
            columns={columns}
            rows={items || []}
        />
    )
}

export default DealerBalanceRequestTabListingWrapper
