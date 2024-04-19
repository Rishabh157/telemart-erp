// |-- External Dependencies --|
import { format } from 'date-fns'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { LedgerListResponse } from 'src/models/Ledger.model'
import { useGetDealerLedgerQuery } from 'src/services/DealerLedgerServices'
import DealerLedgerListing from './DealerLedgerListing'
// import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { ledgerNoteType } from 'src/utils'

// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { RootState } from 'src/redux/store'

const DealerListLedgerTabWrapper = () => {
    useUnmountCleanup()
    const params = useParams()
    const dealerId: any = params.dealerId
    const { userData } = useSelector((state: RootState) => state?.auth)
    const companyId: any = userData?.companyId

    const dealerLedgerState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue, filterBy } =
        dealerLedgerState

    // pagination api
    const { items } = useGetCustomListingData<LedgerListResponse[]>({
        useEndPointHook: useGetDealerLedgerQuery({
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
            field: 'debitAmount',
            headerName: 'Debit Amount',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: LedgerListResponse) => (
                <span> {row.debitAmount} </span>
            ),
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
            field: 'taxAmount',
            headerName: 'Tax Amount',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: LedgerListResponse) => (
                <span>{row.taxAmount} </span>
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
                <span> {ledgerNoteType[row.noteType]} </span>
            ),
        },
    ]
    return (
        <>
            <DealerLedgerListing columns={columns} rows={items} />
        </>
    )
}

export default DealerListLedgerTabWrapper
