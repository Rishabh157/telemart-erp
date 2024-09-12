// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
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
import { RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { VendorListFilterFormValues } from './VendorListingFilter/VendorListingFilterWrapper'

const VendorsListingWrapper = () => {
    useUnmountCleanup()

    // state
    const [currentId, setCurrentId] = useState('')
    const listingPaginationState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue } = listingPaginationState
    const { userData } = useSelector((state: RootState) => state?.auth)



    // listing filters states
    const [filter, setFilter] =
        React.useState<VendorListFilterFormValues>({
            stateId: { fieldName: '', label: '', value: '' },
            districtId: {
                fieldName: '',
                label: '',
                value: '',
            },
            companyType: { fieldName: '', label: '', value: '' },
        })

    // initiate method
    const navigate = useNavigate()

    const [deleteVendor] = useDeleteVendorMutation()

    // pagination api
    const { items } = useGetCustomListingData<any[]>({
        useEndPointHook: useGetPaginationVendorsQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: [
                'companyType',
                'ownerShipType',
                'vendorCode',
                'companyName',
            ],
            page: page,
            filterBy: [
                {
                    fieldName: 'companyId',
                    value: userData?.companyId as string,
                },
                {
                    fieldName: 'stateId',
                    value: filter?.stateId?.value,
                },
                {
                    fieldName: 'districtId',
                    value: filter?.districtId?.value,
                },
                {
                    fieldName: 'companyType',
                    value: filter?.companyType?.value,
                },
            ],
            dateFilter: {},
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        }),
    })

    const columns: columnTypes[] = [
        {
            field: 'actions',
            headerName: 'Actions',
            extraClasses: 'min-w-[100px]',
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
                                return res.isConfirmed ? handleDelete() : null
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
            extraClasses: 'min-w-[170px]',
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
            extraClasses: 'min-w-[170px]',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.VENDOR_LIST_COMPANY_NAME,
            renderCell: (row: VendorsListResponse) => (
                <span> {row.companyName} </span>
            ),
        },
        {
            field: 'companyType',
            headerName: 'Company Type',
            extraClasses: 'min-w-[180px]',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.VENDOR_LIST_COMPANY_TYPE,
            renderCell: (row: VendorsListResponse) => (
                <span> {row.companyType?.replaceAll('_', ' ')} </span>
            ),
        },
        {
            field: 'registrationDistrictName',
            headerName: 'District',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.VENDOR_LIST_DISTRICT,
            renderCell: (row: VendorsListResponse) => (
                <span> {row?.registrationDistrictName} </span>
            ),
        },
        {
            field: 'registrationStateName',
            headerName: 'State',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.VENDOR_LIST_STATE,
            renderCell: (row: VendorsListResponse) => (
                <span> {row?.registrationStateName} </span>
            ),
        },
    ]

    const handleDelete = () => {
        deleteVendor(currentId).then((res: any) => {
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
                filter={filter}
                setFilter={setFilter}
            />
        </SideNavLayout>
    )
}

export default VendorsListingWrapper
