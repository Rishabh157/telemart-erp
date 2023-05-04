import React, { useEffect } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { useNavigate } from 'react-router-dom'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import {  UsersListResponse } from 'src/models'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { useGetDealersQuery } from 'src/services/DealerServices'
import { setIsTableLoading, setItems, setTotalItems } from 'src/redux/slices/dealerSlice'
import UsersListing from './UsersListing'

const columns: columnTypes[] = [
    {
        field: "dealerName",
        headerName: "Name",
        flex: 'flex-[1_1_0%]',
        renderCell: (row: any) => (
            <span className='text-primary-main ' > {row.dealerName} </span>
        )
    },
    {
        field: "dealerCode",
        headerName: "Dealer Code",
        flex: 'flex-[1_1_0%]',
        renderCell: (row: any) => <span>  {row.dealerCode} </span>
    },
    {
        field: "district",
        headerName: "District",
        flex: 'flex-[1.5_1.5_0%]',
        renderCell: (row: any) => {
            return (
                <span className='text-primary-main ' > {row.district} </span>
            )
        }
    },
    {
        field: "mobile",
        headerName: "Mobile no.",
        flex: 'flex-[1_1_0%]'
    },
    {
        field: "actions",
        headerName: "Actions",
        flex: 'flex-[0.5_0.5_0%]',
        renderCell: (row: any) => (
            <button onClick={(e) => e.stopPropagation()} className='text-slate-600 font-bold  transition-all duration-[600ms] hover:bg-slate-100 p-2 rounded-full' > <HiDotsHorizontal className='text-xl text-slate-600 font-bold ' /> </button>
        ),
        align: 'end'
    },

]

const UsersListingWrapper = () => {

    const dealerState: any = useSelector((state: RootState) => state.dealer)

    const {
        items,
        isTableLoading,
        page,
        rowsPerPage,
    } = dealerState

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const { data, isFetching, isLoading } = useGetDealersQuery(
        {
            "limit": rowsPerPage,
            "searchValue": "",
            "params": [
                "dealerName",
                "dealerCode",
                "mobile"
            ],
            "page": page,
            "filterBy": [
                {
                    "fieldName": "",
                    "value": []
                }
            ],
            "dateFilter": {
                "start_date": "",
                "end_date": "",
                "dateFilterKey": ""
            },
            "orderBy": "createdAt",
            "orderByValue": -1,
            "isPaginationRequired": true

        }
    )

    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setIsTableLoading(false))
            dispatch(setItems(data || []))
            dispatch(setTotalItems(data?.totalItems || 4))
        } else {
            dispatch(setIsTableLoading(true))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching, data])

    return (
        <SideNavLayout>
            <UsersListing
                columns={columns}
                rows={items}
                onRowClick={(row) => navigate(`/dealers/${row._id}/orders`)}
                rowExtraClasses={(row: UsersListResponse) => (row.is_active ? "" : ' opacity-[0.70]')}
                isTableLoading={isTableLoading}

            />
        </SideNavLayout>
    )
}

export default UsersListingWrapper

