import React, { useEffect, useState } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { BatchListResponse } from 'src/models/Batch.model'
import BatchListing from './BatchListing'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { useNavigate } from 'react-router-dom'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/BatchSlice'
import { useGetBatchQuery } from 'src/services/BatchService'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import moment from 'moment'
import { setFilterValue } from 'src/redux/slices/orderSlice'

const BatchListingWrapper = () => {
    const batchState: any = useSelector((state: RootState) => state.batch)
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const { page, rowsPerPage, searchValue, items } = batchState
    const { userData } = useSelector((state: RootState) => state?.auth)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const { data, isFetching, isLoading } = useGetBatchQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['batchNo'],
        page: page,
        filterBy: [
            {
                fieldName: 'companyId',
                value: userData?.companyId as string,
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
            field: 'batchNo',
            headerName: 'Batch No',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: BatchListResponse) => (
                <span> {row.batchNo} </span>
            ),
        },
        {
            field: 'orderCount',
            headerName: 'Order Count',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: BatchListResponse) => (
                <span> {row.orderCount} </span>
            ),
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: BatchListResponse) => (
                <span>
                    {' '}
                    {moment(row.createdAt).format('DD/MM/YYYY')} -{' '}
                    {moment(row.createdAt).format('hh:mm:ss')}{' '}
                </span>
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
                        <div className="absolute top-8 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                            <button
                                onClick={() => {
                                    dispatch(setFilterValue([row?.batchNo]))
                                    navigate('/orders')
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                View
                            </button>
                        </div>
                    )}
                </div>
            ),
            align: 'end',
        },
    ]

    return (
        <SideNavLayout>
            <BatchListing
                columns={columns}
                rows={items}
                //setShowDropdown={setShowDropdown}
            />
        </SideNavLayout>
    )
}

export default BatchListingWrapper
