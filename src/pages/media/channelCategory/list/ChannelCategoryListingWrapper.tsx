/// ==============================================
// Filename:ChannelCategoryListingWrapper.tsx
// Type: List Component
// Last Updated: JULY 03, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
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
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/media/channelCategorySlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'

const ChannelCategoryListingWrapper = () => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const channelCategoryState: any = useSelector(
        (state: RootState) => state.channelCategory
    )

    const { page, rowsPerPage, searchValue, items } = channelCategoryState
    const { userData } = useSelector((state: RootState) => state?.auth)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [deleteChannelCategory] = useDeleteChannelCategoryMutation()

    const { data, isFetching, isLoading } =
        useGetPaginationChannelCategoryQuery({
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
                        setShowDropdown(!showDropdown)
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
        {
            field: 'channelCategory',
            headerName: 'Channel Category Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.CATEGORY_LIST_CHANNEL_CATEGORY_NAME,

            renderCell: (row: ChannelCategoryListResponse) => (
                <span> {row.channelCategory} </span>
            ),
        },
    ]

    const handleDelete = () => {
        setShowDropdown(false)
        //alert(currentId)
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
            <ChannelCategoryListing
                columns={columns}
                rows={items}
                setShowDropdown={setShowDropdown}
            />
        </div>
    )
}

export default ChannelCategoryListingWrapper
