import React, { useEffect, useState } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import DispositiononeListing from './DispositionTwoListing'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'

import { useDeletedispositionTwoMutation, useGetdispositionTwoQuery } from 'src/services/configurations/DispositionTwoServices'
import { setIsTableLoading, setItems, setTotalItems } from 'src/redux/slices/configuration/dispositionTwoSlice'
import { DispositionTwoListResponse } from 'src/models/configurationModel/DisposiionTwo.model'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'
import { useNavigate } from 'react-router-dom'

const DispositionTwoListingWrapper = () => {
    const navigate=useNavigate()
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const [deletedispositionTwo]=useDeletedispositionTwoMutation()

    const columns: columnTypes[] = [
        {
            field: 'dispostionOneLabel',
            headerName: 'Disposition One Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: DispositionTwoListResponse) => (
                <span className="capitalize"> {row.dispostionOneLabel
                } </span>
            ),
        },
        {
            field: 'dispositionName',
            headerName: 'Disposition Two Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: DispositionTwoListResponse) => (
                <span className="capitalize"> {row.dispositionName} </span>
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
                                        `/configurations/disposition-Two/${currentId}`
                                    )
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Edit
                            </button>
                            <button
                                 onClick={() => {
                                     showConfirmationDialog({
                                         title: 'Delete Disposition Two',
                                         text: 'Do you want to delete',
                                         showCancelButton: true,
                                         next: (res) => {
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
    const dispositionTwoState: any = useSelector(
        (state: RootState) => state.dispositionTwo
    )

    const { page, rowsPerPage, items, searchValue } = dispositionTwoState

    const dispatch = useDispatch<AppDispatch>()
    // const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetdispositionTwoQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['dispositionName'],
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
            console.log(data?.data)
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
        deletedispositionTwo(currentId).then((res) => {
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
            <ConfigurationLayout>
                <DispositiononeListing
                    columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </ConfigurationLayout>
        </>
    )
}

export default DispositionTwoListingWrapper
