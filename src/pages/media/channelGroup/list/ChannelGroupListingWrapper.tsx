import React, { useEffect } from 'react'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { ChannelGroupListResponse } from 'src/models/ChannelGroup.model'
import ChannelGroupListing from './ChannelGroupListing'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
// import { useNavigate } from "react-router-dom";
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/media/channelGroupSlice'
import { useGetPaginationChannelGroupQuery } from 'src/services/media/ChannelGroupServices'
import MediaLayout from 'src/pages/media/MediaLayout'

const columns: columnTypes[] = [
    {
        field: 'groupName',
        headerName: 'Channel Group Name',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: ChannelGroupListResponse) => (
            <span> {row.groupName} </span>
        ),
    },
]

const ChannelGroupListingWrapper = () => {
    const channelGroupState: any = useSelector(
        (state: RootState) => state.channelGroup
    )

    const { page, rowsPerPage, searchValue, items } = channelGroupState
    const dispatch = useDispatch<AppDispatch>()
    // const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetPaginationChannelGroupQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['groupName'],
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
                    <ChannelGroupListing columns={columns} rows={items} />
                </div>
            </MediaLayout>
        </>
    )
}

export default ChannelGroupListingWrapper
