import React, { useEffect, useState } from 'react'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { useNavigate } from 'react-router-dom'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/website/websiteTagsSlice'
import WebsiteLayout from '../../WebsiteLayout'
import WebsiteTagListing from './WebsiteTagListing'
import { WebsiteTagsListResponse } from 'src/models/website/WebsiteTags.model'
import {
    useDeleteWebsiteTagsMutation,
    useGetPaginationWebsiteTagsQuery,
} from 'src/services/websites/WebsiteTagsServices'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'

const WebsiteTagListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    //const {state} = useLocation()
    //const {websiteId} = state
    const [deleteWebsiteTags] = useDeleteWebsiteTagsMutation()
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const WebsiteTagsState: any = useSelector(
        (state: RootState) => state.websiteTags
    )
    const { userData } = useSelector((state: RootState) => state?.auth)

    const { page, rowsPerPage, searchValue, items } = WebsiteTagsState

    const columns: columnTypes[] = [
        {
            field: 'metaKeyword',
            headerName: 'Meta Keyword',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: WebsiteTagsListResponse) => (
                <span> {row.metaKeyword} </span>
            ),
        },
        {
            field: 'metaOgType',
            headerName: 'Meta OG Type',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: WebsiteTagsListResponse) => (
                <span> {row.metaOgType} </span>
            ),
        },
        {
            field: 'metaTwitterTitle',
            headerName: 'Meta Twitter Title',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: WebsiteTagsListResponse) => (
                <span> {row.metaTwitterTitle} </span>
            ),
        },
        {
            field: 'metaTwitterCard',
            headerName: 'Meta Twitter Card',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: WebsiteTagsListResponse) => (
                <span> {row.metaTwitterCard} </span>
            ),
        },

        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                // <div className="relative">
                //     <button
                //         onClick={(e) => {
                //             e.stopPropagation()
                //             setShowDropdown(!showDropdown)
                //             setCurrentId(row?._id)
                //         }}
                //         className="text-slate-600 font-bold  transition-all duration-[600ms] hover:bg-slate-100 p-2 rounded-full"
                //     >
                //         {' '}
                //         <HiDotsHorizontal className="text-xl text-slate-600 font-bold " />{' '}
                //     </button>
                //     {showDropdown && currentId === row?._id && (
                //         <div className="absolute top-8 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10">

                //         </div>
                //     )}
                // </div>

                <ActionPopup
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                >
                    <>
                        <button
                            onClick={() => {
                                navigate(
                                    `/all-websites/website-tags/edit/${currentId}`
                                )
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => {
                                navigate(
                                    `/all-websites/website-tags/${currentId}`
                                )
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            View
                        </button>
                        <button
                            onClick={() => {
                                showConfirmationDialog({
                                    title: 'Delete Tags',
                                    text: 'Do you want to delete Tags',
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
                    </>
                </ActionPopup>
            ),
            align: 'end',
        },
    ]
    const { data, isFetching, isLoading } = useGetPaginationWebsiteTagsQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['metaKeyword'],
        page: page,
        filterBy: [
            {
                fieldName: '',
                value: [],
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
        deleteWebsiteTags(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Tag deleted successfully!')
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
            <WebsiteLayout>
                <WebsiteTagListing
                    columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </WebsiteLayout>
        </>
    )
}

export default WebsiteTagListingWrapper
