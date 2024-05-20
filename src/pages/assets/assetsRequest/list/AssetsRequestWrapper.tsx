// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { AssetsRequestListResponse } from 'src/models'
import {
    useDeleteAssetsRequestMutation,
    useGetAssetsRequestQuery,
} from 'src/services/assets/AssetsRequestServcies'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'

import AssetsRequestListing from './AssetsRequestListing'
// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import { RootState } from 'src/redux/store'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'

const AssetsRequestWrapper = () => {
    useUnmountCleanup()
    const navigate = useNavigate()
    const assetsRequest = useSelector(
        (state: RootState) => state.listingPagination
    )
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const [deleteAsset] = useDeleteAssetsRequestMutation()

    const { page, rowsPerPage, searchValue } = assetsRequest

    // pagination api
    const { items } = useGetCustomListingData<AssetsRequestListResponse[]>({
        useEndPointHook: useGetAssetsRequestQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['assetName'],
            page: page,
            filterBy: [
                {
                    fieldName: '',
                    value: [],
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
        deleteAsset(currentId).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Deleted successfully!')
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

    const columns: columnTypes[] = [
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    isEdit={isAuthorized(
                        UserModuleNameTypes.ACTION_ASSETS_REQUEST_ONE_EDIT
                    )}
                    isDelete={isAuthorized(
                        UserModuleNameTypes.ACTION_ASSETS_REQUEST_ONE_DELETE
                    )}
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(`/assets/assets-request/${currentId}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete Asset',
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
            field: 'assetName',
            headerName: 'Asset Name',
            flex: 'flex-[1.8_1.8_0%]',
            renderCell: (row: AssetsRequestListResponse) => (
                <span>{row?.assetName}</span>
            ),
            name: UserModuleNameTypes.ASSETS_REQUEST_LIST_ASSETS_REQUEST_NAME,
        },
        {
            field: 'assetcategorieLabel',
            headerName: 'Asset Category',
            flex: 'flex-[1.8_1.8_0%]',
            name: UserModuleNameTypes.ASSETS_REQUEST_LIST_CATEGORY,
            renderCell: (row: AssetsRequestListResponse) => (
                <span>{row?.assetcategorieLabel}</span>
            ),
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            flex: 'flex-[1.8_1.8_0%]',
            name: UserModuleNameTypes.ASSETS_REQUEST_LIST_QUANTITY,
            renderCell: (row: AssetsRequestListResponse) => (
                <span>{row?.quantity}</span>
            ),
        },
        {
            field: 'price',
            headerName: 'Price',
            flex: 'flex-[1.8_1.8_0%]',
            name: UserModuleNameTypes.ASSETS_REQUEST_LIST_PRICE,
            renderCell: (row: AssetsRequestListResponse) => (
                <span>{row?.price}</span>
            ),
        },
    ]

    return (
        <>
            <>
                <AssetsRequestListing
                    columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </>
        </>
    )
}

export default AssetsRequestWrapper
