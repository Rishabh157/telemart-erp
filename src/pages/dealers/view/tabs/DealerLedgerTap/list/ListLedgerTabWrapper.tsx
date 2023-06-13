import React, { useEffect } from 'react'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { LedgerListResponse } from 'src/models/Ledger.model'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/DealerLedgerSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useGetDealerLedgerQuery } from 'src/services/DealerLedgerServices'
import { RootState, AppDispatch } from 'src/redux/store'
import DealerLedgerListing from './DealerLedgerListing'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'

const ListLedgerTabWrapper = () => {
    const params = useParams()
    const dealerId: any = params.dealerId

    const { userData } = useSelector((state: RootState) => state?.auth)
    const companyId: any = userData?.companyId

    const dealerLedgerState: any = useSelector(
        (state: RootState) => state.dealerLedger
    )
    const { page, rowsPerPage, items, searchValue } = dealerLedgerState

    const dispatch = useDispatch<AppDispatch>()

    const { data, isFetching, isLoading } = useGetDealerLedgerQuery({
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
        dateFilter: {},
        orderBy: 'createdAt',
        orderByValue: -1,
        isPaginationRequired: true,
    })

    const columns: columnTypes[] = [
        {
            field: 'noteType',
            headerName: 'Note Type',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: LedgerListResponse) => (
                <span> {row.noteType} </span>
            ),
        },
        {
            field: 'price',
            headerName: 'Price',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: LedgerListResponse) => {
                return <span> {row.price} </span>
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
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    handleOnAction={() => {
                        // setShowDropdown(!showDropdown)
                        // setCurrentId(row?._id)
                    }}
                >
                    <></>
                </ActionPopup>
            ),
            align: 'end',
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
            <DealerLedgerListing columns={columns} rows={items} />
        </>
    )
}

export default ListLedgerTabWrapper
