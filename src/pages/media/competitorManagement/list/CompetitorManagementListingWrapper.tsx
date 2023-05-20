import React, { useEffect } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
// import { useNavigate } from "react-router-dom";
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/media/competitorManagementSlice'
import MediaLayout from '../../MediaLayout'
import CompetitorManagementListing from './CompetitorManagementListing'
import { CompetitorManagementListResponse } from 'src/models/CompetitorManagement.model'
import { useGetPaginationcompetitorQuery } from 'src/services/media/CompetitorManagementServices'

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
            <button className="text-slate-600 font-bold  transition-all duration-[600ms] hover:bg-slate-100 p-2 rounded-full">
                <HiDotsHorizontal className="text-xl text-slate-600 font-bold " />
            </button>
        ),
        align: 'end',
    },
]

const CompetitorManagementListingWrapper = () => {
    const competitorManagementState: any = useSelector(
        (state: RootState) => state.competitor
    )

    const { page, rowsPerPage, searchValue, items } = competitorManagementState
    console.log('here')
    const dispatch = useDispatch<AppDispatch>()
    // const navigate = useNavigate();
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

    return (
        <>
            <MediaLayout>
                <CompetitorManagementListing columns={columns} rows={items} />
            </MediaLayout>
        </>
    )
}

export default CompetitorManagementListingWrapper
