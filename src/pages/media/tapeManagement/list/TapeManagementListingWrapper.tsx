import React, { useEffect } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import TapeManagementListing from './TapeManagementListing'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
// import { useNavigate } from "react-router-dom";

import MediaLayout from '../../MediaLayout'
import { useGetPaginationTapeQuery } from 'src/services/media/TapeManagementServices'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/media/tapeManagementSlice'
import { TapeManagementListResponse } from 'src/models/tapeManagement.model'

const columns: columnTypes[] = [
    {
        field: 'tapeName',
        headerName: 'Tabe Name',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: TapeManagementListResponse) => (
            <span> {row.tapeName} </span>
        ),
    },
    {
        field: 'tapeType',
        headerName: 'Tape Type',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: TapeManagementListResponse) => (
            <span> {row.tapeType} </span>
        ),
    },
    {
        field: 'schemeLabel',
        headerName: 'Scheme Label',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: TapeManagementListResponse) => (
            <span> {row.schemeLabel} </span>
        ),
    },
    {
        field: 'languageLabel',
        headerName: 'Language Label',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: TapeManagementListResponse) => (
            <span> {row.languageLabel} </span>
        ),
    },
    {
        field: 'remarks',
        headerName: 'Remarks',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: TapeManagementListResponse) => (
            <span> {row.remarks} </span>
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

const TapeManagementListingWrapper = () => {
    const tapeManagementState: any = useSelector(
        (state: RootState) => state.tapeManagement
    )

    const { page, rowsPerPage, searchValue, items } = tapeManagementState

    const dispatch = useDispatch<AppDispatch>()
    // const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetPaginationTapeQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['productGroupName'],
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
                <div className="h-full">
                    <TapeManagementListing columns={columns} rows={items} />
                </div>
            </MediaLayout>
        </>
    )
}

export default TapeManagementListingWrapper
