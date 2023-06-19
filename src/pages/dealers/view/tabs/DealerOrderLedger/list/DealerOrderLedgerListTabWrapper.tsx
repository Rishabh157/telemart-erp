import React, { useEffect } from 'react'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { LedgerListResponse } from 'src/models/Ledger.model'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/dealerOrderLedgerSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState, AppDispatch } from 'src/redux/store'
import DealerOrderLedgerListing from './DealerOrderLedgerListing'
// import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { format } from 'date-fns'
import { useGetDealerOrderLedgerQuery } from 'src/services/DealerOrderLedgerService'
import { ledgerNoteType } from 'src/utils'

const DealerOrderLedgerTabWrapper = () => {
    const params = useParams()
    const dealerId: any = params.dealerId
    const { userData } = useSelector((state: RootState) => state?.auth)
    const companyId: any = userData?.companyId

    const dealerOrderLedgerState: any = useSelector(
        (state: RootState) => state.dealerOrderLedger
    )
    const { page, rowsPerPage, items, searchValue, filterBy } =
        dealerOrderLedgerState
    const dispatch = useDispatch<AppDispatch>()

    const { data, isFetching, isLoading } = useGetDealerOrderLedgerQuery({
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

    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setIsTableLoading(false))
            dispatch(setItems(data?.data || []))
            dispatch(setTotalItems(data?.totalItem || 4))
        } else {
            dispatch(setIsTableLoading(true))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching, data, dispatch])

    return (
        <>
            <DealerOrderLedgerListing columns={columns} rows={items} />
        </>
    )
}

export default DealerOrderLedgerTabWrapper
