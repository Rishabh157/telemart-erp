import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from "react-router-dom";
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { WarehousesListResponse } from 'src/models/Warehouse.model'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/warehouseSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import WarehouseListing from './WarehousesListing'
import {
    useDeleteWareHouseMutation,
    useGetPaginationWareHousesQuery,
} from 'src/services/WareHoouseService'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { useNavigate } from 'react-router-dom'
import { showToast } from 'src/utils'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'

const DealersListingWrapper = () => {
    const navigate = useNavigate()
    const [deleteWareHouse] = useDeleteWareHouseMutation()
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const wareHouseState: any = useSelector(
        (state: RootState) => state.warehouse
    )

    const columns: columnTypes[] = [
        {
            field: 'warehouseCode',
            headerName: 'Warehouse Code',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: WarehousesListResponse) => (
                <span> {row.wareHouseCode} </span>
            ),
        },
        {
            field: 'warehouseName',
            headerName: 'Warehouse Name',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: WarehousesListResponse) => {
                return <span> {row.wareHouseName} </span>
            },
        },
        {
            field: 'country',
            headerName: 'Country',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: WarehousesListResponse) => (
                <span> {row.wareHouseCountryName} </span>
            ),
        },
        {
            field: 'state',
            headerName: 'State',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: WarehousesListResponse) => {
                return <span> {row.registrationStateName} </span>
            },
        },
        {
            field: 'district',
            headerName: 'District',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: WarehousesListResponse) => {
                return <span> {row.registrationDistrictName} </span>
            },
        },
        {
            field: 'pincode',
            headerName: 'Pincode',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: WarehousesListResponse) => {
                return <span> {row.registrationPincodeName} </span>
            },
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                >
                    <>
                        <button
                            onClick={() => {
                                navigate(`/warehouse/view/${currentId}`)
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            View
                        </button>
                        <button
                            onClick={() => {
                                navigate(`/warehouse/${currentId}`)
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => {
                                showConfirmationDialog({
                                    title: 'Delete warehouse',
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
                    </>
                </ActionPopup>
            ),
            align: 'end',
        },
    ]

    const { page, rowsPerPage, searchValue, items } = wareHouseState
    const { userData } = useSelector((state: RootState) => state?.auth)

    const dispatch = useDispatch<AppDispatch>()
    // const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetPaginationWareHousesQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['wareHouseName', 'country'],
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

    const handleDelete = () => {
        setShowDropdown(false)
        deleteWareHouse(currentId).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Warehouse deleted successfully!')
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
            <SideNavLayout>
                <div className="px-4 h-[calc(100vh-55px)]">
                    <WarehouseListing
                        columns={columns}
                        rows={items}
                        setShowDropdown={setShowDropdown}
                    />
                </div>
            </SideNavLayout>
        </>
    )
}

export default DealersListingWrapper
