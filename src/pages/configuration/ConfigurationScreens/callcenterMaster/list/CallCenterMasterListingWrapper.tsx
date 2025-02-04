// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { CallCenterMasterListResponse } from 'src/models/CallCenterMaster.model'

import {
    useDeleteCallCenterMasterMutation,
    useGetCallCenterMasterQuery,
} from 'src/services/CallCenterMasterServices'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
// |-- Redux --|
import { RootState } from 'src/redux/store'
import CallCenterMasterListing from './CallCenterMasterListing'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'

const CallCenterMasterListingWrapper = () => {
    useUnmountCleanup()
    const callCenterState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const [deleteAttribute] = useDeleteCallCenterMasterMutation()
    const navigate = useNavigate()
    const { page, rowsPerPage, searchValue } = callCenterState
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const { userData } = useSelector((state: RootState) => state?.auth)

    const { items } = useGetCustomListingData<CallCenterMasterListResponse>({
        useEndPointHook: useGetCallCenterMasterQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['callCenterName'],
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
        }),
    })
    const handleDelete = () => {
        setShowDropdown(false)
        deleteAttribute(currentId).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Call center deleted successfully!')
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
                        UserModuleNameTypes.ACTION_CALL_CENTER_ONE_EDIT
                    )}
                    isDelete={isAuthorized(
                        UserModuleNameTypes.ACTION_CALL_CENTER_ONE_DELETE
                    )}
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(
                            `/configurations/callcenter-master/${currentId}`
                        )
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete call center',
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
            field: 'callCenterName',
            headerName: 'Call Center Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.CALL_CENTER_LIST_CALL_CENTER_NAME,

            renderCell: (row: CallCenterMasterListResponse) => (
                <span className="capitalize"> {row.callCenterName} </span>
            ),
        },
    ]
    return (
        <CallCenterMasterListing
            columns={columns}
            rows={items}
            setShowDropdown={setShowDropdown}
        />
    )
}

export default CallCenterMasterListingWrapper
