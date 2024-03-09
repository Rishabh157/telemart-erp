/// ==============================================
// Filename:ChannelGroupListingWrapper.tsx
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
import { ChannelGroupListResponse } from 'src/models/ChannelGroup.model'

import {
    useDeleteChannelGroupMutation,
    useGetPaginationChannelGroupQuery,
} from 'src/services/media/ChannelGroupServices'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import ChannelGroupListing from './ChannelGroupListing'
// |-- Redux --|
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/media/channelGroupSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'

const ChannelGroupListingWrapper = () => {
    const navigate = useNavigate()

    const channelGroupState: any = useSelector(
        (state: RootState) => state.channelGroup
    )
    const [deleteChannelGroup] = useDeleteChannelGroupMutation()
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const { page, rowsPerPage, searchValue, items } = channelGroupState
    const { userData } = useSelector((state: RootState) => state?.auth)

    const dispatch = useDispatch<AppDispatch>()
    const columns: columnTypes[] = [
        {
            field: 'groupName',
            headerName: 'Channel Group Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.CHANNEL_GROUP_LIST_CHANNEL_GROUP_NAME,

            renderCell: (row: ChannelGroupListResponse) => (
                <span> {row.groupName} </span>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    isEdit={isAuthorized(
                        UserModuleNameTypes.ACTION_CHANNEL_GROUP_EDIT
                    )}
                    isDelete={isAuthorized(
                        UserModuleNameTypes.ACTION_CHANNEL_GROUP_DELETE
                    )}
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(`/media/channel-group/${currentId}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete channel group',
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
    const { data, isFetching, isLoading } = useGetPaginationChannelGroupQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['groupName'],
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
        deleteChannelGroup(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Channel group deleted successfully!')
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
            <ChannelGroupListing
                columns={columns}
                rows={items}
                setShowDropdown={setShowDropdown}
            />
        </div>
    )
}

export default ChannelGroupListingWrapper
