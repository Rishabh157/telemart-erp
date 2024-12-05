// |-- Built-in Dependencies --|

// |-- External Dependencies --|
import { Chip } from '@mui/material'
import { useSelector } from 'react-redux'
// |-- Internal Dependencies --|
import { DealerToDealerListResponseTypes } from '../../../models/DealerToDealer.model'

// |-- Redux --|
import { RootState } from '../../../redux/store'
import useGetCustomListingData from '../../../hooks/useGetCustomListingData'
import useUnmountCleanup from '../../../hooks/useUnmountCleanup'
import { columnTypes } from '../../../components/UI/atoms/ATMTable/ATMTable'
import { ATMDateTimeDisplay } from '../../../components/UI/atoms/ATMDisplay/ATMDisplay'
import { useGetDealerCreditRequestQuery } from '../../../services/DealerCreditAmountRequestService'
import DealerCreditAmountRequestListing from './DealerCreditAmountRequestListing'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'

interface DealerCreditAmountRequestListResponse {
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
}

const DealerCreditAmountRequestListingWrapper = () => {

    useUnmountCleanup()

    const dealerToDealerState: any = useSelector((state: RootState) => state.listingPagination)
    const { page, rowsPerPage, searchValue } = dealerToDealerState

    const { items } = useGetCustomListingData<DealerToDealerListResponseTypes>({
        useEndPointHook: useGetDealerCreditRequestQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['referenceNumber'],
            page: page,
            filterBy: [],
            // myRequestId: userData?.userId as string,
            dateFilter: {},
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        }),
    });

    const columns: columnTypes[] = [
        {
            field: 'amount',
            headerName: 'Amount',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            renderCell: (row: DealerCreditAmountRequestListResponse) => (
                <span> {row?.amount} </span>
            ),
        },
        {
            field: 'accApproved',
            headerName: 'Acc Second Approval',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1.0_1.0_0%]',
            align: 'center',
            renderCell: (row: DealerCreditAmountRequestListResponse) => {
                return (
                    <div className="z-0">
                        {row?.accountApproved === false ? (
                            <Chip
                                label="Acc Pending"
                                color="warning"
                                variant="outlined"
                                size="small"
                                clickable={true}
                            />
                        ) : (
                            <Chip
                                label={row?.accountApproved === true ? "Acc Approved" : "Acc Rejected"}
                                color={row?.accountApproved === true ? "success" : "error"}
                                variant="outlined"
                                size="small"
                                clickable={false}
                            />
                        )}
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
        //     renderCell: (row: DealerCreditAmountRequestListResponse) => {
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
            renderCell: (row: DealerCreditAmountRequestListResponse) => <ATMDateTimeDisplay disableTime createdAt={row?.referenceDate} />,
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
            renderCell: (row: DealerCreditAmountRequestListResponse) => <ATMDateTimeDisplay createdAt={row?.createdAt} />,
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

export default DealerCreditAmountRequestListingWrapper
