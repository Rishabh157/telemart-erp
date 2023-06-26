/// ==============================================
// Filename:DealerWarehouseTabWrapper.tsx
// Type: Tab Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { HiDotsHorizontal } from 'react-icons/hi'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { WarehousesListResponse } from 'src/models'
import WarehouseListing from 'src/pages/warehouses/list/WarehousesListing'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import {
    useDeleteWareHouseMutation,
    useGetPaginationWareHousesQuery,
} from 'src/services/WareHoouseService'
import { showToast } from 'src/utils'


// |-- Redux --|
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/warehouseSlice'
import { AppDispatch, RootState } from 'src/redux/store'


// |-- Types --|
type Props = {}

const DealerWarehouseTabWrapper = (props: Props) => {
    const navigate = useNavigate()
    const params = useParams()
    const dealerId: any = params.dealerId
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
                return (
                    <span className="text-primary-main ">
                        {' '}
                        {row.wareHouseName}{' '}
                    </span>
                )
            },
        },
        {
            field: 'country',
            headerName: 'Country',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: WarehousesListResponse) => (
                <span className="text-primary-main ">
                    {' '}
                    {row.wareHouseCountryName}{' '}
                </span>
            ),
        },
        {
            field: 'state',
            headerName: 'State',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: WarehousesListResponse) => {
                return (
                    <span className="text-primary-main ">
                        {' '}
                        {row.registrationCountryName}{' '}
                    </span>
                )
            },
        },
        {
            field: 'district',
            headerName: 'District',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: WarehousesListResponse) => {
                return (
                    <span className="text-primary-main ">
                        {' '}
                        {row.registrationDistrictName}{' '}
                    </span>
                )
            },
        },
        {
            field: 'pincode',
            headerName: 'Pincode',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: WarehousesListResponse) => {
                return (
                    <span className="text-primary-main ">
                        {' '}
                        {row.registrationPincodeName}{' '}
                    </span>
                )
            },
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
                        <div className="absolute top-8 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            <button
                                onClick={() => {
                                    navigate(`/warehouse/${currentId}`, {
                                        state: { params },
                                    })
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
                                        next: (res: any) => {
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
                        </div>
                    )}
                </div>
            ),
            align: 'end',
        },
    ]

    const { page, rowsPerPage, searchValue, items } = wareHouseState
    const dispatch = useDispatch<AppDispatch>()

    const { data, isFetching, isLoading } = useGetPaginationWareHousesQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['wareHouseName', 'country'],
        page: page,
        filterBy: [
            {
                fieldName: 'dealerId',
                value: dealerId,
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
        <div className="px-2 h-full shadow rounded border ">
            <WarehouseListing
                columns={columns}
                rows={items}
                setShowDropdown={setShowDropdown}
                AddpathName={`add-warehouse`}
            />
        </div>
    )
}

export default DealerWarehouseTabWrapper
