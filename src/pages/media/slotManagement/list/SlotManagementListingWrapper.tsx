import React, { useEffect } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { SlotManagementListResponse } from 'src/models/Slot.model'
import SlotManagementListing from './SlotManagementListing'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
// import { useNavigate } from "react-router-dom";
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/media/slotManagementSlice'
import { useGetPaginationSlotQuery } from 'src/services/media/SlotManagementServices'
import MediaLayout from 'src/pages/media/MediaLayout'

const columns: columnTypes[] = [
    {
        field: 'slotName',
        headerName: 'Slot Name',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: SlotManagementListResponse) => (
            <span> {row.slotName} </span>
        ),
    },
    {
        field: 'channelGroup',
        headerName: 'Channel Group',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: SlotManagementListResponse) => (
            <span> {row.channelGroup} </span>
        ),
    },
    {
        field: 'startDateTime',
        headerName: 'StartDateTime',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: SlotManagementListResponse) => (
            <span> {row.startDateTime} </span>
        ),
    },
    {
        field: 'type',
        headerName: 'type',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: SlotManagementListResponse) => (
            <span> {row.type} </span>
        ),
    },
    {
        field: 'startDateTime',
        headerName: 'StartDateTime',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: SlotManagementListResponse) => (
            <span> {row.startDateTime} </span>
        ),
    },
    {
        field: 'startDateTime',
        headerName: 'StartDateTime',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: SlotManagementListResponse) => (
            <span> {row.startDateTime} </span>
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

const SlotManagementListingWrapper = () => {
    const slotManagementState: any = useSelector(
        (state: RootState) => state.slotManagement
    )

    const { page, rowsPerPage, searchValue, items } = slotManagementState
    const dispatch = useDispatch<AppDispatch>()
    // const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetPaginationSlotQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['slotName'],
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
                    <SlotManagementListing columns={columns} rows={items} />
                </div>
            </MediaLayout>
        </>
    )
}

export default SlotManagementListingWrapper
