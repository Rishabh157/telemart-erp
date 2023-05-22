import React, { useEffect, useState } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { useNavigate } from 'react-router-dom'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/media/competitorManagementSlice'
import MediaLayout from '../../MediaLayout'
import CompetitorManagementListing from './CompetitorManagementListing'
import { CompetitorManagementListResponse } from 'src/models/CompetitorManagement.model'
import { useGetPaginationcompetitorQuery } from 'src/services/media/CompetitorManagementServices'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'

const CompetitorManagementListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const competitorManagementState: any = useSelector(
        (state: RootState) => state.competitor
    )

    const { page, rowsPerPage, searchValue, items } = competitorManagementState
    const columns: columnTypes[] = [
        {
            field: 'productName',
            headerName: 'Product Group Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: CompetitorManagementListResponse) => (
                <span> {row.competitorName} </span>
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
                                    navigate(`/media/competitor/${currentId}`)
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    showConfirmationDialog({
                                        title: 'Delete Competitior',
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

    const { data, isFetching, isLoading } = useGetPaginationcompetitorQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['competitorName'],
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

    const handleDelete = () => {}
    return (
        <>
            <MediaLayout>
                <CompetitorManagementListing columns={columns} rows={items} />
            </MediaLayout>
        </>
    )
}

export default CompetitorManagementListingWrapper
