import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { WarehousesListResponse } from 'src/models'
import { useGetDealersQuery } from 'src/services/DealerServices'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { setIsTableLoading, setItems, setTotalItems } from 'src/redux/slices/dealerSlice'
import ATMMenu from 'src/components/UI/atoms/ATMMenu/ATMMenu'
import WarehousesListing from './WarehousesListing'

const columns: columnTypes[] = [
    {
        field: "name",
        headerName: "Name",
        flex: 'flex-[1_1_0%]',
        renderCell: (row: WarehousesListResponse) => (
            <span className='text-primary-main ' > {`${row.name}`} </span>
        )
    },
    {
        field: "type",
        headerName: "Type",
        flex: 'flex-[1_1_0%]',
        renderCell: (row: WarehousesListResponse) => <span>  {row.type} </span>
    },
    {
        field: "company",
        headerName: "Company Name",
        flex: 'flex-[1.5_1.5_0%]',
        renderCell: (row: WarehousesListResponse) => {
            return (
                <span className='text-primary-main ' > {row.comapny} </span>
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
        renderCell: (row: WarehousesListResponse) => (
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

const WarehousesListingWrapper = () => {

    const warehouse: any = useSelector((state: RootState) => state.warehouse)

    const {
        items,
        isTableLoading,
        page,
        rowsPerPage,
    } = warehouse

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
            <WarehousesListing
                columns={columns}
                rows={items}
                onRowClick={(row) => {}}
                rowExtraClasses={(row: WarehousesListResponse) => (row.is_active ? "" : ' opacity-[0.70]')}
                isTableLoading={isTableLoading}

            />
        </>
    )
}

export default WarehousesListingWrapper
