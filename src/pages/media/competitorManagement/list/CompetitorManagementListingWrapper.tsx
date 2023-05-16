import React, { useEffect } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { DidManagementListResponse } from 'src/models/Media.model'
import DidManagementListing from './CompetitorManagementListing'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
// import { useNavigate } from "react-router-dom";
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/media/didManagementSlice'
import MediaLayout from '../../MediaLayout'
import { useGetPaginationDidQuery } from 'src/services/media/DidManagementServices'
import CompetitorManagementListing from './CompetitorManagementListing'

const columns: columnTypes[] = [
    {
        field: 'productName',
        headerName: 'Product Group Name',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: DidManagementListResponse) => (
            <span> {row.productGroupName} </span>
        ),
    },
    {
        field: 'quantity',
        headerName: 'Quantity',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: DidManagementListResponse) => (
            <span> {row.count} </span>
        ),
    },
    {
        field: 'warehouse',
        headerName: 'Warehouse',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: DidManagementListResponse) => (
            <span> {row.wareHouse} </span>
        ),
    },
    {
        field: 'actions',
        headerName: 'Actions',
        flex: 'flex-[0.5_0.5_0%]',
        renderCell: (row: any) => (
            <button className="text-slate-600 font-bold  transition-all duration-[600ms] hover:bg-slate-100 p-2 rounded-full">
                <HiDotsHorizontal className="text-xl text-slate-600 font-bold " />
            </button>
        ),
        align: 'end',
    },
]

const CompetitorManagementListingWrapper = () => {
    const competitorManagementState: any = useSelector(
        (state: RootState) => state.didManagement
    )

    const { page, rowsPerPage, searchValue, items } = competitorManagementState
    console.log('here')
    const dispatch = useDispatch<AppDispatch>()
    // const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetPaginationDidQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['productGroupName'],
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

    return (
        <>
            <MediaLayout>
                <div className="h-full">
                    <CompetitorManagementListing columns={columns} rows={items} />
                </div>
            </MediaLayout>
        </>
    )
}

export default CompetitorManagementListingWrapper
