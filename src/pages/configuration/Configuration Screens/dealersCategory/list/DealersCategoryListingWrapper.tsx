import React, { useEffect, useState } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { DealersCategoryListResponse } from 'src/models/DealersCategory.model'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import DealersCategoryListing from './DealersCategoryListing'
import {
    useDeleteDealerCategoryMutation,
    useGetDealerCategoryQuery,
} from 'src/services/DealerCategoryService'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/dealersCategorySlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'

const DealersCategoryListingWrapper = () => {
    const navigate = useNavigate()
    const [deleteDealersCategory] = useDeleteDealerCategoryMutation()
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const dealersCategoryState: any = useSelector(
        (state: RootState) => state.dealersCategory
    )

    const columns: columnTypes[] = [
        {
            field: 'dealersCategoryName',
            headerName: 'Dealers Category',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: DealersCategoryListResponse) => (
                <span> {row.dealersCategory} </span>
            ),
        },
        {
            field: 'investAmount',
            headerName: 'Invest Amount',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: DealersCategoryListResponse) => (
                <span> {row.investAmount} </span>
            ),
        },
        {
            field: 'numberOfOrders',
            headerName: 'Number Of Orders',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: DealersCategoryListResponse) => (
                <span> {row.numberOfOrders} </span>
            ),
        },
        {
            field: 'deliveryPercentage',
            headerName: 'Delivery Percentage',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: DealersCategoryListResponse) => (
                <span> {row.deliveryPercentage} </span>
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
                                        `/configurations/dealers-category/${currentId}`
                                    )
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    showConfirmationDialog({
                                        title: 'Delete dealers category',
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
    const { page, rowsPerPage, searchValue, items } = dealersCategoryState

    const dispatch = useDispatch<AppDispatch>()
    // // const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetDealerCategoryQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['dealersCategory'],
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
        deleteDealersCategory(currentId).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast(
                        'success',
                        'Deleted successfully!'
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
                <DealersCategoryListing
                    columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </ConfigurationLayout>
        </>
    )
}

export default DealersCategoryListingWrapper
