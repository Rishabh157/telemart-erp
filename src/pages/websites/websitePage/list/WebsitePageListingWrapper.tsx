import React, { useEffect, useState } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { WebsitePageListResponse } from 'src/models/website/WebsitePage.model'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/website/websitePageSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import {
    useDeleteWebsitePageMutation,
    useGetPaginationWebsitePageQuery,
} from 'src/services/websites/WebsitePageServices'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import WebsitesLayout from '../../WebsiteLayout'
import WebsitePageListing from './WebsitetPageListing'

const WebsitePageListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [deletePage] = useDeleteWebsitePageMutation()
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const WebsitePageState = useSelector(
        (state: RootState) => state.websitePage
    )
    const { userData } = useSelector((state: RootState) => state?.auth)

    const { page, rowsPerPage, searchValue, items, filterValue } =
        WebsitePageState
    const columns: columnTypes[] = [
        {
            field: 'pagerName',
            headerName: 'Page Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: WebsitePageListResponse) => (
                <span> {row.pageName} </span>
            ),
        },
        {
            field: 'pageUrl',
            headerName: 'Page Url',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: WebsitePageListResponse) => (
                <span> {row.pageUrl} </span>
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
                                    navigate(
                                        `/all-websites/website-Page/${currentId}`
                                    )
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    navigate(
                                        `/all-websites/website-Page/view/${currentId}`
                                    )
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                View
                            </button>
                            <button
                                onClick={() => {
                                    showConfirmationDialog({
                                        title: 'Delete Website-Page',
                                        text: 'Do you want to delete',
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

    const { data, isFetching, isLoading } = useGetPaginationWebsitePageQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['pageName'],
        page: page,
        filterBy: [
            {
                fieldName: 'websiteId',
                value: filterValue,
            },
            {
                fieldName: 'companyId',
                value: userData?.companyId,
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

    const handleDelete = () => {
        setShowDropdown(false)
        deletePage(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Website-Page deleted successfully!')
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
            <WebsitesLayout>
                <WebsitePageListing
                    columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </WebsitesLayout>
        </>
    )
}

export default WebsitePageListingWrapper
