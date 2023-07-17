/// ==============================================
// Filename:WarehouseListingWrapper.tsx
// Type: List Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { useNavigate } from "react-router-dom";

// |-- Internal Dependencies --|
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { WarehousesListResponse } from 'src/models/Warehouse.model'
import WarehouseListing from './WarehousesListing'
import {
    useDeleteWareHouseMutation,
    useGetPaginationWareHousesQuery,
} from 'src/services/WareHouseService'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { getAllowedAuthorizedColumns } from 'src/userAccess/getAuthorizedModules'
import {
    UserModuleActionTypes,
    UserModuleNameTypes,
} from 'src/models/userAccess/UserAccess.model'

// |-- Redux --|
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/warehouseSlice'
import { AppDispatch, RootState } from 'src/redux/store'

const DealersListingWrapper = () => {
    const navigate = useNavigate()
    const [deleteWareHouse] = useDeleteWareHouseMutation()
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const wareHouseState: any = useSelector(
        (state: RootState) => state.warehouse
    )
    const { checkUserAccess } = useSelector(
        (state: RootState) => state.userAccess
    )

    const columns: columnTypes[] = [
        {
            field: 'wareHouseCode',
            headerName: 'Warehouse Code',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: WarehousesListResponse) => (
                <span> {row.wareHouseCode} </span>
            ),
        },
        {
            field: 'wareHouseName',
            headerName: 'Warehouse Name',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: WarehousesListResponse) => {
                return <span> {row.wareHouseName} </span>
            },
        },
        {
            field: 'wareHouseCountryName',
            headerName: 'Country',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: WarehousesListResponse) => (
                <span> {row.wareHouseCountryName} </span>
            ),
        },
        {
            field: 'registrationStateName',
            headerName: 'State',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: WarehousesListResponse) => {
                return <span> {row.registrationStateName} </span>
            },
        },
        {
            field: 'registrationDistrictName',
            headerName: 'District',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: WarehousesListResponse) => {
                return <span> {row.registrationDistrictName} </span>
            },
        },
        {
            field: 'registrationPincodeName',
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
                    moduleName={UserModuleNameTypes.wareHouse}
                    isView
                    isEdit
                    isDelete
                    handleViewActionButton={() => {
                        navigate(`/warehouse/view/${currentId}/inventories`)
                    }}
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(`/warehouse/${currentId}`)
                    }}
                    handleDeleteActionButton={() => {
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
                />
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
                        columns={getAllowedAuthorizedColumns(
                            checkUserAccess,
                            columns,
                            UserModuleNameTypes.wareHouse,
                            UserModuleActionTypes.List
                        )}
                        rows={items}
                        setShowDropdown={setShowDropdown}
                        AddpathName="/warehouse/add"
                    />
                </div>
            </SideNavLayout>
        </>
    )
}

export default DealersListingWrapper
