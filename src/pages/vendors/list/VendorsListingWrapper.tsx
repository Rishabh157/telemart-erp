/// ==============================================
// Filename:VendorListingWrapper.tsx
// Type: List Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { VendorsListResponse } from 'src/models'
import {
    useDeleteVendorMutation,
    useGetPaginationVendorsQuery,
} from 'src/services/VendorServices'
import VendorsListing from './VendorsListing'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'

// |-- Redux --|
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/vendorSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'

const VendorsListingWrapper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [showDropdown, setShowDropdown] = useState(false)
    const vendorState: any = useSelector((state: RootState) => state.vendor)
    const { page, rowsPerPage, searchValue, items } = vendorState

    const { userData } = useSelector((state: RootState) => state?.auth)
    const [currentId, setCurrentId] = useState('')
    const [deleteVendor] = useDeleteVendorMutation()

    const columns: columnTypes[] = [
        
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    isView={isAuthorized(
                        UserModuleNameTypes.ACTION_VENDOR_VIEW
                    )}
                    isEdit={isAuthorized(
                        UserModuleNameTypes.ACTION_VENDOR_EDIT
                    )}
                    isDelete={isAuthorized(
                        UserModuleNameTypes.ACTION_VENDOR_DELETE
                    )}
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleViewActionButton={() => {
                        navigate(`${currentId}/general-information`)
                    }}
                    handleEditActionButton={() => {
                        navigate(`/vendors/edit-vendor/${currentId}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete vendor',
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
            field: 'vendorCode',
            headerName: 'Vendor Code',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.VENDOR_LIST_VENDOR_CODE,
            renderCell: (row: VendorsListResponse) => (
                <span
                    className="text-primary-main cursor-pointer"
                    onClick={() => {
                        navigate(`${row?._id}/general-information`)
                    }}
                >
                    <span> {row.vendorCode} </span>
                </span>
            ),
        },
        {
            field: 'companyName',
            headerName: 'Company Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.VENDOR_LIST_COMPANY_NAME,
            renderCell: (row: VendorsListResponse) => (
                <span> {row.companyName} </span>
            ),
        },
        {
            field: 'companyType',
            headerName: 'Company Type',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.VENDOR_LIST_COMPANY_TYPE,
            renderCell: (row: VendorsListResponse) => (
                <span> {row.companyType?.replaceAll('_', ' ')} </span>
            ),
        },
        {
            field: 'registrationDistrictName',
            headerName: 'District',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.VENDOR_LIST_DISTRICT,
            renderCell: (row: VendorsListResponse) => (
                <span> {row?.registrationDistrictName} </span>
            ),
        },
        {
            field: 'registrationStateName',
            headerName: 'State',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.VENDOR_LIST_STATE,
            renderCell: (row: VendorsListResponse) => (
                <span> {row?.registrationStateName} </span>
            ),
        },
    ]
    const { data, isFetching, isLoading } = useGetPaginationVendorsQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['companyType', 'ownerShipType', 'vendorCode', 'companyName'],
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
        deleteVendor(currentId).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Vendor deleted successfully!')
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
        <SideNavLayout>
            <VendorsListing
                columns={columns}
                rows={items}
                setShowDropdown={setShowDropdown}
            />
        </SideNavLayout>
    )
}

export default VendorsListingWrapper
