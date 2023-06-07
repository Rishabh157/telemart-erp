import React, { useEffect, useState } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { CartonBoxListResponse } from 'src/models/CartonBox.model'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import CartonBoxListing from './CartonBoxListing'
import {
    useDeleteCartonBoxMutation,
    useGetCartonBoxQuery,
} from 'src/services/CartonBoxService'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/cartonBoxSlice'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { useNavigate } from 'react-router-dom'
import { showToast } from 'src/utils'

const CartonBoxListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [deleteCartonBox] = useDeleteCartonBoxMutation()
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const { userData } = useSelector((state: RootState) => state?.auth)

    const cartonBoxState: any = useSelector(
        (state: RootState) => state.cartonBox
    )
    const columns: columnTypes[] = [
        {
            field: 'boxName',
            headerName: 'Box Name',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: CartonBoxListResponse) => {
                return <span> {row?.boxName} </span>
            },
        },
        {
            field: 'innerItemCount',
            headerName: 'Inner Items Count',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: CartonBoxListResponse) => (
                <span> {row?.innerItemCount} </span>
            ),
        },
        {
            field: 'dimensions',
            headerName: 'Dimensions',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: CartonBoxListResponse) => {
                return (
                    <span>
                        {' '}
                        {row.dimension?.height} * {row.dimension?.width} *{' '}
                        {row.dimension?.depth}{' '}
                    </span>
                )
            },
        },
        {
            field: 'boxWeight',
            headerName: "Box Weight (in gm's)",
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: CartonBoxListResponse) => {
                return <span> {row?.boxWeight} </span>
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
                                    navigate(
                                        `/configurations/carton-box/${currentId}`
                                    )
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    showConfirmationDialog({
                                        title: 'Delete carton box',
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
    const { page, rowsPerPage, items, searchValue } = cartonBoxState
    // const dispatch = useDispatch<AppDispatch>();
    // // const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetCartonBoxQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['boxName', 'innerItemCount'],
        page: page,
        filterBy: [
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
        deleteCartonBox(currentId).then((res) => {
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
                <CartonBoxListing
                    columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </ConfigurationLayout>
        </>
    )
}

export default CartonBoxListingWrapper
