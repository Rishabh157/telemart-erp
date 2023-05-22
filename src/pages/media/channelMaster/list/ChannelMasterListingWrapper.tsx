import React, { useEffect } from 'react'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
// import { useNavigate } from "react-router-dom";
import MediaLayout from 'src/pages/media/MediaLayout'
import { ChannelCategoryListResponse } from 'src/models/ChannelCategory.model'
import { useGetPaginationChannelCategoryQuery } from 'src/services/media/channelcategoryService'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/media/channelCategorySlice'

import { ChannelMasterListResponse } from 'src/models/channelMaster.model'
import ChannelMasterListing from './ChannelMasterListing'

const columns: columnTypes[] = [
    {
        field: 'channelMaster',
        headerName: 'Channel Category Master',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: ChannelMasterListResponse) => (
            <span> {row.channelMaster} </span>
        ),
    },
]

const ChannelMasterListingWrapper = () => {
    const channelCategoryState: any = useSelector(
        (state: RootState) => state.channelCategory
    )
    console.log(channelCategoryState)
    const { page, rowsPerPage, searchValue, items } = channelCategoryState

    const dispatch = useDispatch<AppDispatch>()
    // const navigate = useNavigate();
    const { data, isFetching, isLoading } =
        useGetPaginationChannelCategoryQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['channelCategory'],
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
                    <ChannelMasterListing columns={columns} rows={items} />
                </div>
            </MediaLayout>
        </>
    )
}

export default ChannelMasterListingWrapper
