// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { useNavigate } from 'react-router-dom'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { DidManagementListResponse } from 'src/models/Media.model'

import {
    useDeleteDidMutation,
    useGetPaginationDidQuery,
} from 'src/services/media/DidManagementServices'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'

import DidManagementListing from './DidManagementListing'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { getDIDTypeOptions } from 'src/utils/constants/customeTypes'

const DidManagementListingWrapper = () => {
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
    const [deleteDid] = useDeleteDidMutation()

    // pagination api
    const { items } = useGetCustomListingData<any[]>({
        useEndPointHook: useGetPaginationDidQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['didNumber', 'schemeLabel', 'channelLabel'],
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

    const columns: columnTypes[] = [
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    isEdit={isAuthorized(
                        UserModuleNameTypes.ACTION_DID_MANAGEMENT_EDIT
                    )}
                    // isDelete={isAuthorized(
                    //     UserModuleNameTypes.ACTION_DID_MANAGEMENT_DELETE
                    // )}
                    handleOnAction={() => {
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(`/media/did/${currentId}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete DID',
                            text: 'Do you want to delete',
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
            field: 'didNumber',
            headerName: 'DID Number',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.DID_MANAGEMENT_LIST_DID_NUMBER,
        },
        {
            field: 'didType',
            headerName: 'DID Type',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.DID_MANAGEMENT_LIST_DID_TYPE,
            renderCell: (row: DidManagementListResponse) => (
                <span>
                    {getDIDTypeOptions().find(
                        (ele) => ele?.value === row.didType
                    )?.label || '-'}
                </span>
            ),
        },
        {
            field: 'schemeLabel',
            headerName: 'Scheme Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.DID_MANAGEMENT_LIST_DID_SCHEMA_NAME,
        },
        {
            field: 'channelLabel',
            headerName: 'Channel Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.DID_MANAGEMENT_LIST_CHANNEL_NAME,
        },
        {
            field: 'slotLabel',
            headerName: 'Slot Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.DID_MANAGEMENT_LIST_SLOT_NAME,
        },
    ]

    const handleDelete = () => {
        deleteDid(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'DID deleted successfully!')
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

    return <DidManagementListing columns={columns} rows={items} />
}

export default DidManagementListingWrapper
