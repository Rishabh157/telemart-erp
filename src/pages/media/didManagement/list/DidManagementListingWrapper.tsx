import React, { useEffect } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { DidManagementListResponse } from 'src/models/Media.model'
import DidManagementListing from './DidManagementListing'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
// import { useNavigate } from "react-router-dom";
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/media/didManagementSlice'
import MediaLayout from '../../MediaLayout'
import { useGetPaginationDidQuery } from 'src/services/media/DidManagementServices'

const columns: columnTypes[] = [
    {
        field: 'didNumber',
        headerName: 'DID Number',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: DidManagementListResponse) => (
            <span> {row.didNumber} </span>
        ),
    },
    {
        field: 'schemeLabel',
        headerName: 'Scheme label',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: DidManagementListResponse) => (
            <span> {row.schemeLabel} </span>
        ),
    },
    {
        field: 'channelLabel',
        headerName: 'Channel label',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: DidManagementListResponse) => (
            <span> {row.channelLabel} </span>
        ),
    },
    {
        field: 'actions',
        headerName: 'Actions',
        flex: 'flex-[0.5_0.5_0%]',
        renderCell: (row: any) => (
            <button className="text-slate-600 font-bold  transition-all duration-[600ms] hover:bg-slate-100 p-2 rounded-full">
                <HiDotsHorizontal className="text-xl text-slate-600 font-bold " />
            </button>
        ),
        align: 'end',
    },
]

const DidManagementListingWrapper = () => {
    const didManagementState: any = useSelector(
        (state: RootState) => state.didManagement
    )

    const { page, rowsPerPage, searchValue, items } = didManagementState

    const dispatch = useDispatch<AppDispatch>()
    // const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetPaginationDidQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['didNumber'],
        page: page,
        filterBy: [
            {
                fieldName: '',
                value: [],
            },
        ],
        dateFilter: {},
        orderBy: 'createdAt',
        orderByValue: -1,
        isPaginationRequired: true,
    })

    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setIsTableLoading(false))
            dispatch(setItems(data?.data || []))
            dispatch(setTotalItems(data?.totalItem || 4))
        } else {
            dispatch(setIsTableLoading(true))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching, data])

    return (
        <>
            <MediaLayout>
                <DidManagementListing columns={columns} rows={items} />
            </MediaLayout>
        </>
    )
}

export default DidManagementListingWrapper
