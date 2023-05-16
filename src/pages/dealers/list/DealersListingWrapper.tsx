import React, { useEffect, useState } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { DealersListResponse } from 'src/models/Dealer.model'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/dealerSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import DealersListing from './DealersListing'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'
import { useNavigate } from 'react-router-dom'
import {
    useDeleteDealerMutation,
    useGetDealersQuery,
} from 'src/services/DealerServices'

const DealersListingWrapper = () => {
    const dealerState: any = useSelector((state: RootState) => state.dealer)
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)

    const navigate = useNavigate()
    const [deletedealer] = useDeleteDealerMutation()

    const { page, rowsPerPage, items, searchValue } = dealerState
    const dispatch = useDispatch<AppDispatch>()

    // const navigate = useNavigate();
    const columns: columnTypes[] = [
        {
            field: 'dealerCode',
            headerName: 'Dealer Code',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: DealersListResponse) => (
                <span> {row.dealerCode} </span>
            ),
        },
        {
            field: 'firmName',
            headerName: 'Firm Name',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: DealersListResponse) => {
                return <span> {row.firmName} </span>
            },
        },
        {
            field: 'firstName',
            headerName: 'First Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: DealersListResponse) => (
                <span> {row.firstName} </span>
            ),
        },
        {
            field: 'lastName',
            headerName: 'Last Name',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: DealersListResponse) => {
                return <span> {row.lastName} </span>
            },
        },
        {
            field: 'mobile',
            headerName: 'Phone',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: DealersListResponse) => {
                return <span> {row.lastName} </span>
            },
        },
        {
            field: 'district',
            headerName: 'District',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: DealersListResponse) => {
                return <span> {row.billingAddressDistrictName} </span>
            },
        },
        {
            field: 'state',
            headerName: 'State',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: DealersListResponse) => {
                return <span> {row.billingAddressStateName} </span>
            },
        },
        {
            field: 'isActive',
            headerName: 'Status',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: DealersListResponse) => {
                return (
                    <span>
                        {' '}
                        {row.isActive ? (
                            <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                        ) : (
                            <span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>
                        )}{' '}
                    </span>
                )
            },
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
                                    navigate(`${currentId}/general-information`)
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                View
                            </button>
                            <button
                                onClick={() => {
                                    navigate(
                                        `/dealers/edit-dealer/${currentId}`
                                    )
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    showConfirmationDialog({
                                        title: 'Delete Attribute',
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

    const { data, isFetching, isLoading } = useGetDealersQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['firstName', 'dealerCode'],
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
    }, [isLoading, isFetching, data, dispatch])

    const handleDelete = () => {
        setShowDropdown(false)
        deletedealer(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'dealer deleted successfully!')
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
            <SideNavLayout>
                <DealersListing
                    columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </SideNavLayout>
        </>
    )
}

export default DealersListingWrapper
