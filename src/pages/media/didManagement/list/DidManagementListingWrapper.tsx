import React, { useEffect, useState } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { DidManagementListResponse } from 'src/models/Media.model'
import DidManagementListing from './DidManagementListing'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/media/didManagementSlice'
import MediaLayout from '../../MediaLayout'
import {
    useDeleteDidMutation,
    useGetPaginationDidQuery,
} from 'src/services/media/DidManagementServices'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { useNavigate } from 'react-router-dom'
import { showToast } from 'src/utils'

const DidManagementListingWrapper = () => {
    const navigate = useNavigate()
    const didManagementState: any = useSelector(
        (state: RootState) => state.didManagement
    )
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const [deleteDid] = useDeleteDidMutation()
    const { page, rowsPerPage, searchValue, items } = didManagementState
    const { userData } = useSelector((state: RootState) => state?.auth)
    const dispatch = useDispatch<AppDispatch>()

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
            headerName: 'Scheme Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: DidManagementListResponse) => (
                <span> {row.schemeLabel} </span>
            ),
        },
        {
            field: 'channelLabel',
            headerName: 'Channel Name',
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
                                    navigate(`/media/did/${currentId}`)
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    showConfirmationDialog({
                                        title: 'Delete DID',
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

    const { data, isFetching, isLoading } = useGetPaginationDidQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['didNumber', 'schemeLabel', 'channelLabel'],
        page: page,
        filterBy: [
            {
                fieldName: 'companyId',
                value: userData?.companyId as string,
            },
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
        deleteDid(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'DID deleted successfully!')
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
                <DidManagementListing
                    columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </MediaLayout>
        </>
    )
}

export default DidManagementListingWrapper
