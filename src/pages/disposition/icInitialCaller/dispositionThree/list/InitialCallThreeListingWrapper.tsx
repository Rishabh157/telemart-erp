import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import InitialCallThreeListing from './InitialCallThreeListing'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/configuration/initialCallerThreeSlice'
import {
    useDeleteInitialCallerThreeMutation,
    useGetInitialCallerThreeQuery,
} from 'src/services/configurations/InitialCallerThreeServices'
import { useNavigate } from 'react-router-dom'
import { InitialCallerThreeListResponse } from 'src/models/configurationModel/InitialCallerThree.model'
import { HiDotsHorizontal } from 'react-icons/hi'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import DispositionLayout from 'src/pages/disposition/DispositionLayout'

const InitialCallThreeListingWrapper = () => {
    const navigate = useNavigate()
    const [deleteIniticallthree] = useDeleteInitialCallerThreeMutation()
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const initialCallThreeState: any = useSelector(
        (state: RootState) => state.initialCallerThree
    )

    const { page, rowsPerPage, searchValue, items } = initialCallThreeState

    const dispatch = useDispatch<AppDispatch>()
    // const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetInitialCallerThreeQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['initailCallName'],
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
            field: 'initialCallName',
            headerName: 'Initialcall-Three',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: InitialCallerThreeListResponse) => (
                <span> {row.initialCallName} </span>
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
                                    navigate(`${row?._id}`)
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    showConfirmationDialog({
                                        title: 'Delete InitialCaller-Three',
                                        text: 'Do you want to delete InitialCaller-Three?',
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
        deleteIniticallthree(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast(
                        'success',
                        'Initiacall-Three deleted successfully!'
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
                {' '}
                <InitialCallThreeListing
                    columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </DispositionLayout>
        </>
    )
}

export default InitialCallThreeListingWrapper
