/// ==============================================
// Filename:BatchListingWrapper.tsx
// Type: List Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { BatchListResponse } from 'src/models/Batch.model'
import BatchListing from './BatchListing'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { useGetBatchQuery } from 'src/services/BatchService'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'


// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/BatchSlice'
import { setFilterValue } from 'src/redux/slices/orderSlice'


const BatchListingWrapper = () => {
    const batchState: any = useSelector((state: RootState) => state.batch)
    const [showDropdown, setShowDropdown] = useState(false)
    // const [currentId, setCurrentId] = useState('')
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
                <ActionPopup
                    handleOnAction={() => {
                        // e.stopPropagation()
                        setShowDropdown(!showDropdown)
                        // setCurrentId(row?._id)
                    }}
                    isView
                    handleViewActionButton={() => {
                        dispatch(setFilterValue([row?.batchNo]))
                        navigate('/orders')
                    }}
                />
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
