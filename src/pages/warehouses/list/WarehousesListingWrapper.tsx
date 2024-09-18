// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { WarehousesListResponse } from 'src/models/Warehouse.model'
import {
    useDeleteWareHouseMutation,
    useGetPaginationWareHousesQuery,
} from 'src/services/WareHouseService'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import WarehouseListing from './WarehousesListing'

// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import { RootState } from 'src/redux/store'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

const DealersListingWrapper = () => {
    const navigate = useNavigate()
    const [deleteWareHouse] = useDeleteWareHouseMutation()
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const wareHouseState: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    const columns: columnTypes[] = [
        {
            field: 'actions',
            headerName: 'Actions',
            extraClasses: 'min-w-[100px]',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    isView={isAuthorized(
                        UserModuleNameTypes.ACTION_WAREHOUSE_VIEW
                    )}
                    isEdit={isAuthorized(
                        UserModuleNameTypes.ACTION_WAREHOUSE_EDIT
                    )}
                    // isDelete={isAuthorized(
                    //     UserModuleNameTypes.ACTION_WAREHOUSE_DELETE
                    // )}
                    handleViewActionButton={() => {
                        navigate(
                            `/warehouse/view/${currentId}/warehouse-details`
                        )
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
        },
        {
            field: 'wareHouseCode',
            headerName: 'Warehouse Code',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.WAREHOUSE_LIST_WAREHOUSE_CODE,
            renderCell: (row: WarehousesListResponse) => (
                <span
                    className="text-primary-main cursor-pointer"
                    onClick={() => {
                        navigate(
                            `/warehouse/view/${row?._id}/warehouse-details`
                        )
                    }}
                >
                    {row?.wareHouseCode}
                </span>
            ),
        },
        {
            field: 'wareHouseName',
            headerName: 'Warehouse Name',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.WAREHOUSE_LIST_WAREHOUSE_NAME,
            renderCell: (row: WarehousesListResponse) => {
                return <span> {row.wareHouseName} </span>
            },
        },
        {
            field: 'registrationStateName',
            headerName: 'State',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.WAREHOUSE_LIST_STATE,
            renderCell: (row: WarehousesListResponse) => {
                return <span> {row.registrationStateName} </span>
            },
        },
        {
            field: 'registrationDistrictName',
            headerName: 'District',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.WAREHOUSE_LIST_DISTRICT,
            renderCell: (row: WarehousesListResponse) => {
                return <span> {row.registrationDistrictName} </span>
            },
        },
        {
            field: 'registrationPincodeName',
            headerName: 'Pincode',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.WAREHOUSE_LIST_PINCODE,
            renderCell: (row: WarehousesListResponse) => {
                return <span> {row.registrationPincodeName} </span>
            },
        },
    ]

    const { page, rowsPerPage, searchValue } = wareHouseState
    const { userData } = useSelector((state: RootState) => state?.auth)

    const { items } = useGetCustomListingData({
        useEndPointHook: useGetPaginationWareHousesQuery({
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
        }),
    })

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
                        AddpathName="/warehouse/add"
                    />
                </div>
            </SideNavLayout>
        </>
    )
}

export default DealersListingWrapper
