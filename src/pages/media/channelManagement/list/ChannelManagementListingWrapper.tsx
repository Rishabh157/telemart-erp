/// ==============================================
// Filename:ChannelManagementListingWrapper.tsx
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
import { ChannelManagementListResponse } from 'src/models/Channel.model'
import ChannelManagementListing from './ChannelManagementListing'
// import { useNavigate } from "react-router-dom";
import ActionPopup from 'src/components/utilsComponent/ActionPopup'

import MediaLayout from 'src/pages/media/MediaLayout'
import {
    useDeleteChannelMutation,
    useGetPaginationchannelQuery,
} from 'src/services/media/ChannelManagementServices'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
// |-- Redux --|
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/media/channelManagementSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'

const ChannelManagementListingWrapper = () => {
    const channelManagementState: any = useSelector(
        (state: RootState) => state.channelManagement
    )
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const { page, rowsPerPage, searchValue, items } = channelManagementState
    const { userData } = useSelector((state: RootState) => state?.auth)
  
    const [deleteChannel] = useDeleteChannelMutation()
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const columns: columnTypes[] = [
        {
            field: 'channelName',
            headerName: 'Channel Name',
            flex: 'flex-[1_1_0%]',
                     name: UserModuleNameTypes.CHANNEL_MANAGEMENT_LIST_CHANNEL_NAME,

            renderCell: (row: ChannelManagementListResponse) => (
                <span> {row.channelName} </span>
            ),
        },
        {
            field: 'channelGroupLabel',
            headerName: 'Channel Group',
            flex: 'flex-[1_1_0%]',
                     name: UserModuleNameTypes.CHANNEL_MANAGEMENT_LIST_CHANNEL_NAME,

            renderCell: (row: ChannelManagementListResponse) => (
                <span> {row.channelGroupLabel} </span>
            ),
        },

        {
            field: 'contactPerson',
            headerName: 'Contact Person',
            flex: 'flex-[1_1_0%]',
                     name: UserModuleNameTypes.CHANNEL_MANAGEMENT_LIST_CONTACT_PERSON,

            renderCell: (row: ChannelManagementListResponse) => (
                <span> {row.contactPerson} </span>
            ),
        },

        {
            field: 'mobile',
            headerName: 'Mobile',
            flex: 'flex-[1_1_0%]',
                     name: UserModuleNameTypes.CHANNEL_MANAGEMENT_LIST_MOBILE,

            renderCell: (row: ChannelManagementListResponse) => (
                <span> {row.mobile} </span>
            ),
        },

        {
            field: 'email',
            headerName: 'Email',
            flex: 'flex-[1_1_0%]',
                     name: UserModuleNameTypes.CHANNEL_MANAGEMENT_LIST_EMAIL,

            renderCell: (row: ChannelManagementListResponse) => (
                <span> {row.email} </span>
            ),
        },

        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    isEdit={isAuthorized(UserModuleNameTypes.ACTION_CHANNEL_MANAGEMENT_EDIT)}
                    isDelete={isAuthorized(UserModuleNameTypes.ACTION_CHANNEL_MANAGEMENT_DELETE)}
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(`/media/channel/${currentId}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete Channel',
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

    const { data, isFetching, isLoading } = useGetPaginationchannelQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['channelName', 'channelGroupLabel'],
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

    const handleDelete = () => {
        setShowDropdown(false)
        deleteChannel(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Channel  deleted successfully!')
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
            <MediaLayout>
                <div className="h-full">
                    <ChannelManagementListing
                           columns={columns}
                        rows={items}
                        setShowDropdown={setShowDropdown}
                    />
                </div>
            </MediaLayout>
        </>
    )
}

export default ChannelManagementListingWrapper
