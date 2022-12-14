import React, { useEffect } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { VendorsListResponse } from 'src/models'
import { setIsTableLoading, setItems, setTotalItems } from 'src/redux/slices/vendorSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { useGetVendorsQuery } from 'src/services/VendorServices'
import VendorsListing from './VendorsListing'

const columns: columnTypes[] = [
    {
        field: "vendorName",
        headerName: "Name",
        flex: 'flex-[1_1_0%]',
        renderCell: (row: VendorsListResponse) => (
            <span className='text-primary-main ' > {row.vendorName} </span>
        )
    },
    {
        field: "vendorCode",
        headerName: "Vendor Code",
        flex: 'flex-[1_1_0%]',
        renderCell: (row: VendorsListResponse) => <span>  {row.vendorCode} </span>
    },
    {
        field: "email",
        headerName: "Email",
        flex: 'flex-[1.5_1.5_0%]',
        renderCell: (row: VendorsListResponse) => {
            return (
                <span className='text-primary-main ' > {row.email} </span>
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
            <button className='text-slate-600 font-bold  transition-all duration-[600ms] hover:bg-slate-100 p-2 rounded-full' > <HiDotsHorizontal className='text-xl text-slate-600 font-bold ' /> </button>
        ),
        align: 'end'
    },

]

const VendorsListingWrapper = () => {


    const vendorState: any = useSelector((state: RootState) => state.vendor)

    const {
        items,
        isTableLoading,
        page,
        rowsPerPage,
    } = vendorState

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const { data, isFetching, isLoading } = useGetVendorsQuery(
        {
            limit: rowsPerPage,
            searchValue: "",
            params: [
                "dealerName",
                "dealerCode",
                "mobile"
            ],
            page: page,
            filterBy: [
                {
                    fieldName: "",
                    value: []
                }
            ],
            dateFilter: {
                start_date: "",
                end_date: "",
                dateFilterKey: ""
            },
            orderBy: "createdAt",
            orderByValue: -1,
            isPaginationRequired: true

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
        <>
            <VendorsListing
                columns={columns}
                rows={items}
                onRowClick={(row: VendorsListResponse) => navigate(`/vendors/${row._id}/orders`)}
                rowExtraClasses={(row: VendorsListResponse) => (row.is_active ? "" : ' opacity-[0.70]')}
                isTableLoading={isTableLoading}
            />
        </>
    )
}

export default VendorsListingWrapper