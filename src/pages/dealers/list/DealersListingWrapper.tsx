import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { DealersListResponse } from 'src/models'
import { useGetDealersQuery } from 'src/services/DealerServices'
import DelaersListing from './DealersListing'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { setIsTableLoading, setItems, setTotalItems } from 'src/redux/slices/dealerSlice'
import ATMMenu from 'src/components/UI/atoms/ATMMenu/ATMMenu'

const columns: columnTypes[] = [
    {
        field: "dealerName",
        headerName: "Name",
        flex: 'flex-[1_1_0%]',
        renderCell: (row: DealersListResponse) => (
            <span className='text-primary-main ' > {`${row.firstName} ${row.lastName}`} </span>
        )
    },
    {
        field: "dealerCode",
        headerName: "Dealer Code",
        flex: 'flex-[1_1_0%]',
        renderCell: (row: DealersListResponse) => <span>  {row.dealerCode} </span>
    },
    {
        field: "address",
        headerName: "Address",
        flex: 'flex-[1.5_1.5_0%]',
        renderCell: (row: DealersListResponse) => {
            return (
                <span className='text-primary-main ' > {row.registeredAddress} </span>
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
        renderCell: (row: DealersListResponse) => (
            <ATMMenu
                options={[
                    {
                        label: "Delete",
                        onClick: () => { alert("Delete") }
                    }
                ]}
            />
        ),
        align: 'end'
    },

]

const DealersListingWrapper = () => {

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
        <>
            <DelaersListing
                columns={columns}
                rows={items}
                onRowClick={(row) => navigate(`/dealers/${row._id}/orders`)}
                rowExtraClasses={(row: DealersListResponse) => (row.is_active ? "" : ' opacity-[0.70]')}
                isTableLoading={isTableLoading}

            />
        </>
    )
}

export default DealersListingWrapper
