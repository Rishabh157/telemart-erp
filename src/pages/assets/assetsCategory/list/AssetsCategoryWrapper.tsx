// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { AssetsCategoryListResponse } from 'src/models'
import {
    useDeleteAssetsCategoryMutation,
    useGetAssetsCategoryQuery,
} from 'src/services/assets/AssetsCategoryService'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'

import AssetsCategoryListing from './AssetsCategoryListing'
// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import { RootState } from 'src/redux/store'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'

const AssetsCategoryWrapper = () => {
    useUnmountCleanup()
    const navigate = useNavigate()
    const [deleteAssetCategory] = useDeleteAssetsCategoryMutation()
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const { userData } = useSelector((state: RootState) => state?.auth)

    const assetCategoryState: any = useSelector((state: RootState) => state.listingPagination)
    const { page, rowsPerPage, searchValue } = assetCategoryState

    // pagination api
    const { items } = useGetCustomListingData<AssetsCategoryListResponse[]>({
        useEndPointHook: useGetAssetsCategoryQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['assetCategoryName'],
            page: page,
            filterBy: [
                {
                    fieldName: 'companyId',
                    value: userData?.companyId,
                },
            ],
            dateFilter: {},
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        })
    })

    const handleDelete = () => {
        setShowDropdown(false)
        deleteAssetCategory(currentId).then((res) => {
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
                        UserModuleNameTypes.ACTION_ASSETS_CATEGORY_ONE_EDIT
                    )}
                    isDelete={isAuthorized(
                        UserModuleNameTypes.ACTION_ASSETS_CATEGORY_ONE_DELETE
                    )}
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(`/assets/assets-category/${currentId}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete Asset Category',
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
            field: 'assetCategoryName',
            headerName: 'Category Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: AssetsCategoryListResponse) => (
                <span className="capitalize"> {row.assetCategoryName} </span>
            ),
            name: UserModuleNameTypes.ASSETS_CATEGORY_LIST_ASSETS_CATEGORY_NAME,
        },
    ]
    return (
        <>
            <>
                <AssetsCategoryListing
                    columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </>
        </>
    )
}

export default AssetsCategoryWrapper
