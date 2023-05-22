import React, { useEffect, useState } from 'react'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { useNavigate } from 'react-router-dom'
import { showToast } from 'src/utils'
import MediaLayout from 'src/pages/media/MediaLayout'
import { ChannelCategoryListResponse } from 'src/models/ChannelCategory.model'
import {
    useDeleteChannelCategoryMutation,
    useGetPaginationChannelCategoryQuery,
} from 'src/services/media/ChannelCategoryService'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/media/channelCategorySlice'
import ChannelCategoryListing from './ChannelCategoryListing'
import { HiDotsHorizontal } from 'react-icons/hi'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'

const ChannelCategoryListingWrapper = () => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const channelCategoryState: any = useSelector(
        (state: RootState) => state.channelCategory
    )
    //console.log(channelCategoryState)
    const { page, rowsPerPage, searchValue, items } = channelCategoryState

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [deleteChannelCategory] = useDeleteChannelCategoryMutation()

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

    const columns: columnTypes[] = [
        {
            field: 'channelCategory',
            headerName: 'Channel Category Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: ChannelCategoryListResponse) => (
                <span> {row.channelCategory} </span>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <div className="relative">
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            setShowDropdown(!showDropdown)
                            setCurrentId(row?._id)
                        }}
                        className="text-slate-600 font-bold  transition-all duration-[600ms] hover:bg-slate-100 p-2 rounded-full"
                    >
                        {' '}
                        <HiDotsHorizontal className="text-xl text-slate-600 font-bold " />{' '}
                    </button>
                    {showDropdown && currentId === row?._id && (
                        <div className="absolute top-8 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            <button
                                onClick={() => {
                                    navigate(`edit/${row?._id}`)
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Edit {row?._id}
                            </button>
                            <button
                                onClick={() => {
                                    showConfirmationDialog({
                                        title: 'Delete Channel Category',
                                        text: 'Do you want to delete Channel Category?',
                                        showCancelButton: true,
                                        next: (res: any) => {
                                            return res.isConfirmed
                                                ? handleDelete()
                                                : setShowDropdown(false)
                                        },
                                    })
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            ),
            align: 'end',
        },
    ]

    const handleDelete = () => {
        setShowDropdown(false)
        alert(currentId)
        deleteChannelCategory(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Sale Order deleted successfully!')
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast(
                    'error',
                    'Something went wrong, Please try again later'
                )
            }
        })
    }

    return (
        <>
            <MediaLayout>
                <div className="h-full">
                    <ChannelCategoryListing columns={columns} rows={items} />
                </div>
            </MediaLayout>
        </>
    )
}

export default ChannelCategoryListingWrapper
