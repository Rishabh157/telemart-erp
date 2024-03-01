/// ==============================================
// Filename:DealerWarehouseTabWrapper.tsx
// Type: Tab Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { WarehousesListResponse } from 'src/models'
import DealerWarehouseListing from './DealerWarehouseListing'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import {
    useDeleteDealerWarehouseMutation,
    useGetDealerWarehouseQuery,
} from 'src/services/DealerWarehouseService'
import { showToast } from 'src/utils'

// |-- Redux --|
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/DealerWarehouseSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'

// |-- Types --|
type Props = {}

const DealerWarehouseTabWrapper = (props: Props) => {
    const navigate = useNavigate()
    const params = useParams()
    const dealerId: any = params.dealerId
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const [deleteDealerWarehouse] = useDeleteDealerWarehouseMutation()
    const dealerWarehouseState: any = useSelector(
        (state: RootState) => state.dealerWarehouse
    )

    const { userData } = useSelector((state: RootState) => state?.auth)
    const companyId = userData?.companyId

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
                return <span className=" "> {row.wareHouseName} </span>
            },
        },
        {
            field: 'country',
            headerName: 'Country',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: WarehousesListResponse) => (
                <span className=" "> {row.wareHouseCountryName} </span>
            ),
        },
        {
            field: 'state',
            headerName: 'State',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: WarehousesListResponse) => {
                return <span className=" "> {row.registrationStateName} </span>
            },
        },
        {
            field: 'district',
            headerName: 'District',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: WarehousesListResponse) => {
                return (
                    <span className=" "> {row.registrationDistrictName} </span>
                )
            },
        },
        {
            field: 'pincode',
            headerName: 'Pincode',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: WarehousesListResponse) => {
                return (
                    <span className=" "> {row.registrationPincodeName} </span>
                )
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
                    isEdit={isAuthorized(
                        UserModuleNameTypes.ACTION_DEALER_DEALER_WAREHOUSE_EDIT
                    )}
                    isDelete={isAuthorized(
                        UserModuleNameTypes.ACTION_DEALER_DEALER_WAREHOUSE_DELETE
                    )}
                    handleEditActionButton={() => {
                        navigate(
                            `/dealers/${dealerId}/warehouse/${currentId}`,
                            {
                                state: { params },
                            }
                        )
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete Dealer warehouse',
                            text: 'Do you want to delete',
                            showCancelButton: true,
                            next: (res: any) => {
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

    const { page, rowsPerPage, searchValue, items } = dealerWarehouseState
    const dispatch = useDispatch<AppDispatch>()

    const { data, isFetching, isLoading } = useGetDealerWarehouseQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: [
            'wareHouseCode',
            'wareHouseName',
            // 'country',
            // 'email',
            'registrationAddress',
            'billingAddress',
            'contactInformation',
        ],
        page: page,
        filterBy: [
            {
                fieldName: 'dealerId',
                value: dealerId,
            },
            {
                fieldName: 'companyId',
                value: companyId,
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
        const id = currentId
        setShowDropdown(false)
        deleteDealerWarehouse(id).then((res) => {
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
        <div className="px-2 h-full shadow ">
            <DealerWarehouseListing
                columns={columns}
                rows={items}
                setShowDropdown={setShowDropdown}
                AddpathName={`add-warehouse`}
                isShowAddWarehouseButton={items?.length ? false : true}
            />
        </div>
    )
}

export default DealerWarehouseTabWrapper
