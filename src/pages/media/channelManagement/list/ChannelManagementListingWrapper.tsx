import React, { useEffect } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { ChannelManagementListResponse } from 'src/models/Channel.model'
import ChannelManagementListing from './ChannelManagementListing'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
// import { useNavigate } from "react-router-dom";
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/media/channelManagementSlice'
import { useGetPaginationchannelQuery } from 'src/services/media/ChannelManagementServices'
import MediaLayout from 'src/pages/media/MediaLayout'

const columns: columnTypes[] = [
    {
        field: 'channelName',
        headerName: 'Channel Name',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: ChannelManagementListResponse) => (
            <span> {row.channelName} </span>
        ),
    },
    {
        field: 'channelGroupLabel',
        headerName: 'Channel Group',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: ChannelManagementListResponse) => (
            <span> {row.channelGroupLabel} </span>
        ),
    },

    {
        field: 'contactPerson',
        headerName: 'Contact Person',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: ChannelManagementListResponse) => (
            <span> {row.contactPerson} </span>
        ),
    },

    {
        field: 'mobile',
        headerName: 'Mobile',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: ChannelManagementListResponse) => (
            <span> {row.mobile} </span>
        ),
    },

    {
        field: 'email',
        headerName: 'Email',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: ChannelManagementListResponse) => (
            <span> {row.email} </span>
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

const ChannelManagementListingWrapper = () => {
    const channelManagementState: any = useSelector(
        (state: RootState) => state.channelManagement
    )

    const { page, rowsPerPage, searchValue, items } = channelManagementState
    const dispatch = useDispatch<AppDispatch>()
    // const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetPaginationchannelQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['channelName'],
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
                    <ChannelManagementListing columns={columns} rows={items} />
                </div>
            </MediaLayout>
        </>
    )
}

export default ChannelManagementListingWrapper
