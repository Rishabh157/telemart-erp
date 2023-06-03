import React, { useEffect, useState } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { useNavigate } from 'react-router-dom'

import {
    useDeletegetWebsiteMutation,
   
} from 'src/services/websites/WebsiteServices'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import CallListing from './CallListing'
import { setIsTableLoading, setItems, setTotalItems } from 'src/redux/slices/media/inboundCallerSlice'
import { InbooundCallerListResponse } from 'src/models/configurationModel/InboundCaller.model'
import { useGetPaginationInboundCallerQuery } from 'src/services/media/InboundCallerServices'



const CallListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [deleteWebsite] = useDeletegetWebsiteMutation()
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const inboundCallerState: any = useSelector((state: RootState) => state.inboundCaller)


    const { page, rowsPerPage, searchValue, items } = inboundCallerState
    const columns: columnTypes[] = [
        // {
        //     field: 'didNo',
        //     headerName: 'DID No',
        //     flex: 'flex-[1_1_0%]',
        //     renderCell: (row: InbooundCallerListResponse) => (
        //         <span> {row.didNo} </span>
        //     ),
        // },
        // {
        //     field: 'generalInformation.incomingCallerNo',
        //     headerName: 'Incoming Caller No',
        //     flex: 'flex-[1_1_0%]',
        //     renderCell: (row: InbooundCallerListResponse) => (
        //         <span> {row.incomingCallerNo} </span>
        //     ),
        // },
        // {
        //     field: 'dispositionTwoLabel',
        //     headerName: 'Disposition Two',
        //     flex: 'flex-[1_1_0%]',
        //     renderCell: (row: InbooundCallerListResponse) => (
        //         <span> {row.dispositionTwoLabel?row.dispositionTwoLabel:'NA'}</span>
        //     ),
        // },
        // {
        //     field: 'dispositionThreeLabel',
        //     headerName: 'Disposition Three Label',
        //     flex: 'flex-[1_1_0%]',
        //     renderCell: (row: InbooundCallerListResponse) => (
        //         <span> {row.dispositionThreeLabel?row.dispositionThreeLabel:"NA"} </span>
        //     ),
        // },
        // {
        //     field: 'schemeLabel',
        //     headerName: 'Scheme',
        //     flex: 'flex-[1_1_0%]',
        //     renderCell: (row: InbooundCallerListResponse) => (
        //         <span> {row.schemeLabel} </span>
        //     ),
        // },
        // {
        //     field: 'channelId',
        //     headerName: 'Channel',
        //     flex: 'flex-[1_1_0%]',
        //     renderCell: (row: InbooundCallerListResponse) => (
        //         <span> {row.channelId} </span>
        //     ),
        // },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[1.8_1.8_0%]',
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
                        <div className="absolute top-8 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10  w-24">
                            <button
                                onClick={() => {
                                    navigate(
                                        `/all-websites/Website/${currentId}`
                                    )
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
                            {/* <button
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
                            </button> */}
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
                        </div>
                    )}
                </div>
            ),
            align: 'end',
        },
    ]

    const { data, isFetching, isLoading } = useGetPaginationInboundCallerQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['didNo'],
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
                    showToast('success', 'Deleted successfully!')
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
            <ConfigurationLayout>
                <CallListing
                    columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </ConfigurationLayout>
        </>
    )
}

export default CallListingWrapper

