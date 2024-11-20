// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { ChannelCategoryListResponse } from 'src/models/ChannelCategory.model'

import {
    useDeleteChannelCategoryMutation,
    useGetPaginationChannelCategoryQuery,
} from 'src/services/media/ChannelCategoriesServices'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import ChannelCategoryListing from './ChannelCategoryListing'
// |-- Redux --|
import { RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'

const ChannelCategoryListingWrapper = () => {
    useUnmountCleanup()

    // state
    const [currentId, setCurrentId] = useState('')
    const listingPaginationState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue } = listingPaginationState
    const { userData } = useSelector((state: RootState) => state?.auth)

    // initiate method
    const navigate = useNavigate()
    const [deleteChannelCategory] = useDeleteChannelCategoryMutation()

    // pagination api
    const { items } = useGetCustomListingData<any[]>({
        useEndPointHook: useGetPaginationChannelCategoryQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['channelCategory'],
            page: page,
            filterBy: [
                {
                    fieldName: 'companyId',
                    value: userData?.companyId as string,
                },
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

    const columns: columnTypes[] = [
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    isEdit={isAuthorized(
                        UserModuleNameTypes.ACTION_CHANNEL_CATEGORY_EDIT
                    )}
                    isDelete={isAuthorized(
                        UserModuleNameTypes.ACTION_CHANNEL_CATEGORY_DELETE
                    )}
                    handleOnAction={() => {
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(`edit/${row?._id}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete Channel Category',
                            text: 'Do you want to delete Channel Category?',
                            showCancelButton: true,
                            next: (res: any) => {
                                return res.isConfirmed ? handleDelete() : null
                            },
                        })
                    }}
                />
            ),
        },
        {
            field: 'channelCategory',
            headerName: 'Channel Category Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.CATEGORY_LIST_CHANNEL_CATEGORY_NAME,

            renderCell: (row: ChannelCategoryListResponse) => (
                <span> {row?.channelCategory} </span>
            ),
        },
    ]

    const handleDelete = () => {
        deleteChannelCategory(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast(
                        'success',
                        'Channel Category deleted successfully!'
                    )
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
        <div className="h-full">
            <ChannelCategoryListing columns={columns} rows={items} />
        </div>
    )
}

export default ChannelCategoryListingWrapper
