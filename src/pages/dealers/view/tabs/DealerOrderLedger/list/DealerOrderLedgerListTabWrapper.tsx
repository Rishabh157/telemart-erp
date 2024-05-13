// |-- Built-in Dependencies --|

// |-- External Dependencies --|
import { format } from 'date-fns'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { LedgerListResponse } from 'src/models/Ledger.model'
import DealerOrderLedgerListing from './DealerOrderLedgerListing'
// import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { useGetDealerOrderLedgerQuery } from 'src/services/DealerOrderLedgerService'
import { ledgerNoteType } from 'src/utils'

// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import { RootState } from 'src/redux/store'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'

const DealerOrderLedgerTabWrapper = () => {
    useUnmountCleanup()

    const params = useParams()
    const dealerId: any = params.dealerId
    const { userData } = useSelector((state: RootState) => state?.auth)
    const companyId: any = userData?.companyId

    const dealerOrderLedgerState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue, filterBy } =
        dealerOrderLedgerState

    // pagination api
    const { items } = useGetCustomListingData<LedgerListResponse[]>({
        useEndPointHook: useGetDealerOrderLedgerQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['noteType'],
            page: page,
            filterBy: [
                {
                    fieldName: 'dealerId',
                    value: dealerId,
                },
                {
                    fieldName: 'companyId',
                    value: companyId,
                },
            ],
            dateFilter: filterBy,
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        })
    })

    const columns: columnTypes[] = [
        {
            field: 'createdAt',
            headerName: 'Date',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: LedgerListResponse) => {
                return (
                    <span>
                        {format(new Date(row.createdAt), 'yyyy-MM-dd HH:mm')}
                    </span>
                )
            },
        },
        {
            field: 'remark',
            headerName: 'Remark',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: LedgerListResponse) => {
                return <span> {row.remark} </span>
            },
        },
        {
            field: 'creditAmount',
            headerName: 'Credit Amount',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: LedgerListResponse) => (
                <span> {row.creditAmount} </span>
            ),
        },
        {
            field: 'debitAmount',
            headerName: 'Debit Amount',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: LedgerListResponse) => (
                <span> {row.debitAmount} </span>
            ),
        },
        {
            field: 'balance',
            headerName: 'Balance',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: LedgerListResponse) => (
                <span> {row.balance} </span>
            ),
        },
        {
            field: 'noteType',
            headerName: 'Note Type',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: LedgerListResponse) => (
                <span>{ledgerNoteType[row.noteType]} </span>
            ),
        },
    ]

    return (
        <>
            <DealerOrderLedgerListing columns={columns} rows={items} />
        </>
    )
}

export default DealerOrderLedgerTabWrapper
