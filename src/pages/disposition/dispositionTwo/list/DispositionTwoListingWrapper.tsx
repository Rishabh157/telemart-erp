import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import {
    setItems,
    setIsTableLoading,
    setTotalItems,
} from 'src/redux/slices/configuration/dispositionTwoSlice'
import {
    useDeletedispositionTwoMutation,
    useGetdispositionTwoQuery,
} from 'src/services/configurations/DispositionTwoServices'
import { DispositionTwoListResponse } from 'src/models/configurationModel/DispositionTwo.model'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'
import { HiDotsHorizontal } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import DispositionTwoListing from './DispositionTwoListing'
import DispositionLayout from 'src/pages/disposition/DispositionLayout'

const DispositionTwoListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const { items }: any = useSelector(
        (state: RootState) => state.dispositionTwo
    )

    const [deleteDispositonTwo] = useDeletedispositionTwoMutation()

    const { searchValue, filterValue }: any = useSelector(
        (state: RootState) => state.dispositionTwo
    )
    const dispositionTwoState: any = useSelector(
        (state: RootState) => state.dispositionTwo
    )

    const { page, rowsPerPage } = dispositionTwoState

    const { data, isFetching, isLoading } = useGetdispositionTwoQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['dispositionName', 'dispositionOneId'],
        page: page,
        filterBy: [
            {
                fieldName: 'dispositionOneId',
                value: filterValue ? filterValue : [],
            },
        ],
        dateFilter: {},
        orderBy: 'createdAt',
        orderByValue: -1,
    })

    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setIsTableLoading(false))
            dispatch(setItems(data?.data || []))
            dispatch(setTotalItems(data?.totalItem || 4))
        } else {
            dispatch(setIsTableLoading(true))
        }
    }, [dispatch, data, isFetching, isLoading])

    const columns: columnTypes[] = [
        {
            field: 'dispositionName',
            headerName: 'Disposition Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: DispositionTwoListResponse) => (
                <span> {row.dispositionName} </span>
            ),
        },
        {
            field: 'dispostionOneLabel',
            headerName: 'Dispositionone Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: DispositionTwoListResponse) => (
                <span> {row.dispostionOneLabel} </span>
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
                        <HiDotsHorizontal className="text-xl text-slate-600 font-bold " />
                    </button>
                    {showDropdown && currentId === row?._id && (
                        <div className="absolute top-8 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            <button
                                onClick={() => {
                                    navigate(`edit/${row?._id}`)
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    showConfirmationDialog({
                                        title: 'Delete Disposition-Two',
                                        text: 'Do you want to delete Disposition-Two?',
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
        deleteDispositonTwo(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast(
                        'success',
                        'Disposition Two deleted successfully!'
                    )
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
            <DispositionLayout>
                <div className="h-full">
                    <DispositionTwoListing
                        columns={columns}
                        rows={items}
                        setShowDropdown={setShowDropdown}
                    />
                </div>
            </DispositionLayout>
        </>
    )
}

export default DispositionTwoListingWrapper
