// |-- External Dependencies --|
import { format } from 'date-fns'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { LedgerListResponse } from 'src/models/Ledger.model'
import { useGetVendorLedgerQuery } from 'src/services/VendorLedgerServices'
import { ledgerNoteType } from 'src/utils'
import VendorLedgerListing from './VendorLedgerListing'

// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { RootState } from 'src/redux/store'

const VendorListLedgerTabWrapper = () => {
    useUnmountCleanup()
    const params = useParams()
    const vendorId: any = params.vendorId
    const { userData } = useSelector((state: RootState) => state?.auth)
    const companyId: any = userData?.companyId

    const vendorLedgerState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue, filterBy } = vendorLedgerState
    const { items } = useGetCustomListingData<LedgerListResponse>({
        useEndPointHook: useGetVendorLedgerQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['noteType'],
            page: page,
            filterBy: [
                {
                    fieldName: 'vendorId',
                    value: vendorId,
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
        }),
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
                <span> {ledgerNoteType[row.noteType]} </span>
            ),
        },
    ]

    return <VendorLedgerListing columns={columns} rows={items} />
}

export default VendorListLedgerTabWrapper
