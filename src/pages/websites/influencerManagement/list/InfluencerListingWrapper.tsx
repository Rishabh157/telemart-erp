/// ==============================================
// Filename:InfluencerListingWrapper.tsx
// Type: List Component
// Last Updated: JULY 05, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import WebsiteLayout from '../../WebsiteLayout'
import { WebsiteListResponse } from 'src/models/website/Website.model'
import {
    useDeletegetWebsiteMutation,
    useGetPaginationWebsiteQuery,
} from 'src/services/websites/WebsiteServices'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'
import InfluencerListing from './InfluencerListing'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/website/websiteSlice'
import { setFilterValue } from 'src/redux/slices/website/websiteBlogSlice'

const InfluencerListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [deleteWebsite] = useDeletegetWebsiteMutation()
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const WebsiteState: any = useSelector((state: RootState) => state.website)

    const { page, rowsPerPage, searchValue, items } = WebsiteState
    const columns: columnTypes[] = [
        {
            field: 'productName',
            headerName: 'Website Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: WebsiteListResponse) => (
                <span> {row.productName} </span>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[1.8_1.8_0%]',
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
                //         <div className="absolute top-8 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10  w-24">

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
                                navigate(`/all-websites/Website/${currentId}`)
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => {
                                navigate('/all-websites/website-blog/add', {
                                    state: {
                                        siteId: currentId,
                                    },
                                })
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            Add Blog
                        </button>
                        <button
                            onClick={() => {
                                dispatch(setFilterValue(currentId))
                                navigate('/all-websites/website-blog', {
                                    state: {
                                        websiteId: currentId,
                                    },
                                })
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            View Blog
                        </button>
                        <button
                            onClick={() => {
                                navigate('/all-websites/website-page/add', {
                                    state: {
                                        siteId: currentId,
                                    },
                                })
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            Add Page
                        </button>

                        <button
                            onClick={() => {
                                showConfirmationDialog({
                                    title: 'Delete Website',
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
                    </>
                </ActionPopup>
            ),
            align: 'end',
        },
    ]

    const { data, isFetching, isLoading } = useGetPaginationWebsiteQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['productName', 'url'],
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

    const handleDelete = () => {
        setShowDropdown(false)
        deleteWebsite(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Website deleted successfully!')
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
                <InfluencerListing
                    columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </WebsiteLayout>
        </>
    )
}

export default InfluencerListingWrapper
